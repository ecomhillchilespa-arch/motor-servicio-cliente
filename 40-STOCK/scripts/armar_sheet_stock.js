// Generador de las pestañas de stock en el Sheet «Alegres Mexico» (lo corre un Code node de n8n).
// STOCK = vista (selector de producto, métricas arriba, un día por fila) · STOCK datos = lo escribe n8n
// STOCK registro = lo anota Karla (dato de Jie/Kevin + nota) · STOCK encargos = encargos y acciones.
// Entrada: meta = respuesta de GET spreadsheet (properties.locale, sheets.properties). Salida: { crear, data, fmt }.
function armarStock(meta, DATOS) {
  const loc = (meta.properties && meta.properties.locale) || 'en_US';
  const puntoDecimal = /^(en|es_MX|es_419|es_US|ja|zh|ko|th|he|iw|hi)/.test(loc);
  const conv = f => {                       // ',' → ';' fuera de comillas si la planilla usa coma decimal
    if (puntoDecimal) return f;
    let out = '', q = false;
    for (const ch of f) { if (ch === '"') q = !q; out += (!q && ch === ',') ? ';' : ch; }
    return out;
  };
  const existentes = (meta.sheets || []).map(s => s.properties.title);
  const ID = { 'STOCK': 910001, 'STOCK registro': 910005, 'STOCK encargos': 910003, 'STOCK datos': 910004 };
  const choque = Object.keys(ID).filter(t => existentes.includes(t));
  if (choque.length) throw new Error('Ya existen estas pestañas, no toco nada: ' + choque.join(', '));
  const idsUsados = (meta.sheets || []).map(s => s.properties.sheetId);
  if (Object.values(ID).some(i => idsUsados.includes(i))) throw new Error('sheetId 91000x ya usado');

  const ser = s => { const [y, m, d] = s.split('-').map(Number); return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 864e5); };
  const hex = h => ({ red: parseInt(h.slice(0, 2), 16) / 255, green: parseInt(h.slice(2, 4), 16) / 255, blue: parseInt(h.slice(4, 6), 16) / 255 });
  const COL = { dia: '0033BF', venta: '338C4C', ventaC: 'E0F2E0', stock: '197F99', stockC: 'E0F2F7', nota: '595959', notaC: 'F7F2E0',
    pedido: '8A6D12', pedidoC: 'F7F0DC', label: 'EFEFEF', input: 'FFF9D8', titulo: '72590C', hoy: '9BE7A5', rojo: 'F4A6A6', finde: '6E8BE0', gris: '888888' };

  // ---------- rangos ----------
  const D0 = 2, R0 = 3, E0 = 5;                         // primera fila de datos en cada pestaña
  const d = c => `'STOCK datos'!$${c}$${D0}:$${c}$3000`;
  const r = c => `'STOCK registro'!$${c}$${R0}:$${c}$1000`;
  const e = c => `'STOCK encargos'!$${c}$${E0}:$${c}$500`;
  const F0 = 16, NDIAS = 61, FL = F0 + NDIAS - 1;      // 1-nov → 31-dic
  const T = c => `$${c}$${F0}:$${c}$${FL}`;
  const ST = x => `=IF($A$5<>"Stock","—",${x})`;

  const crear = [], data = [], fmt = [];
  const add = (title, idx, rows, cols, frozenR, frozenC, color) => crear.push({ addSheet: { properties: { sheetId: ID[title], title, index: idx,
    tabColor: hex(color), gridProperties: { rowCount: rows, columnCount: cols, frozenRowCount: frozenR, frozenColumnCount: frozenC, hideGridlines: true } } } });
  add('STOCK', 0, FL + 10, 11, 15, 1, COL.stock);
  add('STOCK registro', 1, 1000, 8, 2, 1, COL.input === 'FFF9D8' ? 'E0B400' : COL.input);
  add('STOCK encargos', 2, 500, 10, 4, 1, COL.pedido);
  add('STOCK datos', 3, 3000, 4, 1, 0, COL.gris);

  // ---------- STOCK (vista) ----------
  const V = Array.from({ length: FL }, () => Array(10).fill(''));
  const put = (a1, v) => { const m = a1.match(/^([A-J])(\d+)$/); V[+m[2] - 1][m[1].charCodeAt(0) - 65] = v; };
  put('A1', 'STOCK EN BODEGA DE JIE · Alegres México');
  put('A2', 'Producto'); put('A3', 'AlbaMed');
  put('A4', 'Modo'); put('A5', '=IF($A$3="AlbaMed","Stock","Dropshipping")');
  put('A6', 'Último día real'); put('A7', `=IFERROR(1/(1/MAXIFS(${d('A')},${d('B')},$A$3)),"")`);
  put('A8', 'Hoy'); put('A9', '=TODAY()');
  // caja 1: venta y despacho (label B:C, valor D)
  put('B2', 'VENTA Y DESPACHO');
  const c1 = [
    ['Venta por día · últimos 7 días', `=IFERROR(SUMIFS(${d('C')},${d('B')},$A$3,${d('A')},">"&($A$7-7),${d('A')},"<="&$A$7)/7,"")`],
    ['Venta por día · últimos 3 días', `=IFERROR(SUMIFS(${d('C')},${d('B')},$A$3,${d('A')},">"&($A$7-3),${d('A')},"<="&$A$7)/3,"")`],
    ['Venta por día que se usa', '=IF(N(D4)>N(D3)*115/100,D4,D3)'],
    ['Vendidas sin despachar', `=SUM(${T('D')})`],
    ['Despachado de lo vendido hace 6–12 días', `=IFERROR(SUMIFS(${d('D')},${d('B')},$A$3,${d('A')},">="&($A$7-12),${d('A')},"<="&($A$7-6))/SUMIFS(${d('C')},${d('B')},$A$3,${d('A')},">="&($A$7-12),${d('A')},"<="&($A$7-6)),"")`],
    ['Días que no salió (bajo 80 % a los 6 días)', `=COUNTIFS(${T('A')},"<="&($A$7-6),${T('E')},"<"&8/10)`],
    ['Vendidas el último día real', `=SUMIFS(${d('C')},${d('B')},$A$3,${d('A')},$A$7)`],
  ];
  c1.forEach(([l, f], i) => { put('B' + (3 + i), l); put('D' + (3 + i), f); });
  // caja 2: stock (label E:F, valor G)
  put('E2', 'STOCK');
  const c2 = [
    ['Stock en vivo (hoy)', ST(`IFERROR(INDEX(${T('G')},MATCH($A$9,${T('A')},0)),"")`)],
    ['Entrante con fecha', ST(`SUMIFS(${e('G')},${e('B')},"Férulas",${e('E')},"=",${e('D')},"<>")`)],
    ['Próxima llegada', ST(`IFERROR(1/(1/MINIFS(${e('D')},${e('B')},"Férulas",${e('E')},"=",${e('D')},"<>")),"")`)],
    ['Entrante sin fecha', ST(`SUMIFS(${e('G')},${e('B')},"Férulas",${e('E')},"=",${e('D')},"=")`)],
    ['El stock queda bajo cero el', ST(`IFERROR(1/(1/MINIFS(${T('A')},${T('G')},"<0",${T('A')},">="&$A$9)),"")`)],
    ['Lo que hay + lo que viene alcanza (días)', ST('IF(OR(G3="",N(D5)=0),"",(G3+G4+G6)/D5)')],
    ['Último dato de Jie', ST(`IFERROR(1/(1/MAX(MAXIFS(${r('A')},${r('B')},$A$3,${r('C')},"<>"),MAXIFS(${r('A')},${r('B')},$A$3,${r('D')},"<>"))),"")`)],
  ];
  c2.forEach(([l, f], i) => { put('E' + (3 + i), l); put('G' + (3 + i), f); });
  // caja 3: pedido y empaque (label I, valor J); J8:J12 son supuestos (amarillo)
  put('I2', 'PEDIDO Y EMPAQUE');
  const ult = c => `IFERROR(INDEX(FILTER(${r(c)},${r(c)}<>"",${r('B')}="AlbaMed"),COUNTA(FILTER(${r(c)},${r(c)}<>"",${r('B')}="AlbaMed"))),"")`;
  const falta = (c, que) => ST(`IF(${ult(c)}="","Falta el dato",MAX(0,G4+G6+J4-${ult(c)}-SUMIFS(${e('G')},${e('B')},"${que}",${e('E')},"=")))`);
  const c3 = [
    ['Pedir a más tardar el', ST('IF(G7="","—",MAX($A$9,G7-J8-J9))')],
    ['Cuánto pedir (férulas)', ST('IF(G3+G4+G6>=D5*(J8+J9+J10),0,MAX(J11,CEILING(D5*(J8+J9+J10)-(G3+G4+G6),100)))')],
    ['Plata para comprarlas (USD)', ST('J4*J12')],
    ['Bolsas que faltan', falta('E', 'Bolsas')],
    ['Manuales que faltan', falta('F', 'Manuales')],
    ['Días que tarda la fábrica', 10],
    ['Días extra hasta la bodega', 3],
    ['Cada cuántos días se pide', 7],
    ['Mínimo por pedido (férulas)', 200],
    ['Costo por férula (USD)', 3.75],
  ];
  c3.forEach(([l, f], i) => { put('I' + (3 + i), l); put('J' + (3 + i), f); });
  // tabla diaria
  put('B14', 'VENTA Y DESPACHO'); put('F14', 'STOCK'); put('I14', 'NOTA');
  ['Fecha', 'Vendidas', 'Despachadas', 'Sin despachar', '% despachado', 'Entrante', 'Stock en vivo', 'Stock según Jie', 'Nota (del registro)']
    .forEach((h, i) => { V[14][i] = h; });
  const reg = x => `COUNTIFS(${r('A')},$A${x},${r('B')},$A$3,${r('C')},"<>")`;
  for (let i = 0; i < NDIAS; i++) {
    const x = F0 + i, row = V[x - 1];
    row[0] = i === 0 ? ser('2026-11-01') : `=A${x - 1}+1`;
    row[1] = `=IF($A${x}<=$A$7,SUMIFS(${d('C')},${d('A')},$A${x},${d('B')},$A$3),IF($A$5="Stock",$D$5,""))`;
    row[2] = `=IF($A${x}<=$A$7,SUMIFS(${d('D')},${d('A')},$A${x},${d('B')},$A$3),"")`;
    row[3] = `=IF($A${x}<=$A$7,B${x}-C${x},"")`;
    row[4] = `=IF(AND($A${x}<=$A$7,N(B${x})>0),C${x}/B${x},"")`;
    row[5] = `=IF($A$5<>"Stock","",SUMIFS(${e('F')},${e('B')},"Férulas",${e('E')},$A${x})+SUMIFS(${e('G')},${e('B')},"Férulas",${e('E')},"=",${e('D')},$A${x}))`;
    row[7] = `=IF($A$5<>"Stock","",IF(COUNTIFS(${r('A')},$A${x},${r('B')},$A$3,${r('D')},"<>")>0,-SUMIFS(${r('D')},${r('A')},$A${x},${r('B')},$A$3),IF(${reg(x)}>0,SUMIFS(${r('C')},${r('A')},$A${x},${r('B')},$A$3)-SUM($D$${F0}:D${x}),"")))`;
    row[6] = i === 0 ? `=IF($A$5<>"Stock","",IF(H${x}<>"",H${x},""))`
                     : `=IF($A$5<>"Stock","",IF(H${x}<>"",H${x},IF(G${x - 1}="","",G${x - 1}+F${x}-B${x})))`;
    row[8] = `=IFERROR(TEXTJOIN(" · ",TRUE,FILTER(${r('G')},${r('A')}=$A${x},${r('B')}=$A$3)),"")`;
  }
  const cv = rows => rows.map(rw => rw.map(v => (typeof v === 'string' && v.startsWith('=')) ? conv(v) : v));
  data.push({ range: "'STOCK'!A1", majorDimension: 'ROWS', values: cv(V) });

  // ---------- STOCK datos ----------
  data.push({ range: "'STOCK datos'!A1", majorDimension: 'ROWS', values: [['Fecha', 'Producto', 'Vendidas', 'Despachadas (de esas)']]
    .concat(DATOS.map(x => [ser(x.fecha), x.producto, x.vendidas, x.despachadas])) });

  // ---------- STOCK registro ----------
  const REG = [
    ['2026-11-10', 'AlbaMed', '', '', '', '', 'Jie dijo que llegaron 400 a su bodega; Kevin dice (17-nov) que esas 400 no salieron por falta de bolsas.'],
    ['2026-11-15', 'AlbaMed', '', 500, '', '', 'Jie 16-nov: «out of stock», «short by 500 units». Nuestros pedidos decían 960 sin despachar a esa fecha.'],
    ['2026-11-17', 'AlbaMed', '', 1327, 600, 600, 'Kevin 22:10–22:28: manda hoy las 1.400 con bolsa de marca; después le quedan 600 bolsas y 600 manuales. Bolsas nuevas: 8–10 días corridos (5.000 bolsas 1.030 USD, 5.000 manuales 251 USD). No tiene bolsa azul sin logo. Jie 22:37: «once we receive these 1,400 units, we will have 73 left» → hoy le faltan 1.327.'],
  ];
  data.push({ range: "'STOCK registro'!A1", majorDimension: 'ROWS', values: [
    ['REGISTRO · lo anota Karla: lo que dice Jie (o Kevin). Una fila por dato, la más nueva abajo. La pestaña STOCK lo lee solo.'],
    ['Fecha', 'Producto', 'En bodega (Jie)', 'Le faltan (Jie)', 'Bolsas que quedan', 'Manuales que quedan', 'Nota'],
  ].concat(REG.map(x => [ser(x[0])].concat(x.slice(1)))) });

  // ---------- STOCK encargos ----------
  const ENC = [
    ['2026-09-10', 'Férulas', 100, '', '', 100, 'Martin → Kevin', 'Jie', 'Kevin: 3,70 c/u (100 u), con estuche y cepillo. Kevin el 14-sep: «your agent has paid for it». Llegó, fecha exacta sin dato.'],
    ['2026-09-10', 'Bolsas', 1000, '', '', 1000, 'Martin → Kevin', 'Jie', '1.000 bolsas por 250 USD (pagó Jie, Kevin 14-sep). Se acabaron el 4-nov.'],
    ['2026-09-10', 'Manuales', 1000, '', '', 1000, 'Martin → Kevin', 'Jie', '1.000 manuales por 50 USD (pagó Jie, Kevin 14-sep). Se acabaron el 4-nov.'],
    ['2026-09-28', 'Acción', '', '', '', '', 'Jie', '', 'Propone un pedido más grande: feriado nacional chino, la fábrica para al menos 5 días.'],
    ['2026-09-29', 'Férulas', 200, '', '2026-09-30', 200, 'Jie → Kevin', 'Jie', 'Kevin: «jie ordered 200 pcs right?» → «yes, dear». Despacha el 30-sep.'],
    ['2026-10-09', 'Acción', '', '', '', '', 'Jie', '', '«we have run out of the 200 QuietLab Pro units we ordered previously»'],
    ['2026-10-13', 'Acción', '', '', '', '', 'Jie', '', '«123 items left in stock»'],
    ['2026-11-04', 'Férulas', 200, '', '2026-11-04', 200, 'Jie → Kevin', 'Jie', 'Kevin despacha 200 y avisa que se acabaron las bolsas y los manuales.'],
    ['2026-11-08', 'Férulas', 1000, '2026-11-19', '', '', 'Jie → Kevin', 'Jie', 'Jie 9-nov: «I already made a reservation yesterday». Kevin 17-nov 22:10: salen hoy con las 400 del 10-nov, con bolsa de marca. Jie 17-nov: «Everything will be shipped out by the day after tomorrow at the latest» → llegan ~19-nov, salen a clientas a más tardar el 20-nov.'],
    ['2026-11-10', 'Férulas', 400, '2026-11-19', '', '', 'Jie → Kevin', 'Jie', 'Kevin 17-nov: «400 items were ordered, but there were no packaging bags». Salen hoy con las 1.000.'],
    ['2026-11-15', 'Acción', '', '', '', '', 'Jie', '', 'Sin stock; compra más cuando llegue el pago semanal.'],
    ['2026-11-16', 'Acción', '', '', '', '', 'Martin → Jie', '', 'Pago de 5.000 USD; plan 8.000 / 8.000 / 9.500 / 10.000+ por semana. Jie avisa stock cada 2 días.'],
    ['2026-11-17', 'Acción', '', '', '', '', 'Jie', '', '«Sorry, we are restocking xu. You have had too many orders recently.»'],
    ['2026-11-17', 'Bolsas', '', '', '2026-11-17', '', 'Kevin', 'Jie', 'Kevin: «the packaging bags have been completed». Cantidad sin dato.'],
    ['2026-11-17', 'Acción', '', '', '', '', 'Martin → Kevin', '', 'Se le pide cotizar 5.000 bolsas y 5.000 manuales. Kevin 22:10: no tiene bolsa azul sin logo; manda hoy las 1.400 con bolsa de marca.'],
    ['2026-11-17', 'Férulas', 600, '', '', '', 'Jie → Kevin', '', 'Con las últimas 600 bolsas y 600 manuales nuestros. Jie 23:15: «we’ll be placing our orders today in line with this plan». Llegada: sin fecha.'],
    ['2026-11-17', 'Férulas', 1500, '', '', '', 'Jie → Kevin', '', 'Con bolsa QuietLab (hecha para otro cliente, instrucciones en inglés): a esas clientas, manual en español en PDF. Llegada: sin fecha.'],
    ['2026-11-17', 'Bolsas', 5000, '2026-11-27', '', '', 'Jie → Kevin', '', 'Kevin: 1.030 USD las 5.000, 8–10 días corridos (26–28 nov). Para tener en stock en la fábrica.'],
    ['2026-11-17', 'Manuales', 5000, '2026-11-27', '', '', 'Jie → Kevin', '', 'Kevin: 251 USD los 5.000, junto con las bolsas.'],
  ];
  const encRows = ENC.map((x, i) => { const rr = E0 + i;
    return [ser(x[0]), x[1], x[2], x[3] ? ser(x[3]) : '', x[4] ? ser(x[4]) : '', x[5], conv(`=IF(C${rr}="","",C${rr}-N(F${rr}))`), x[6], x[7], x[8]]; });
  for (let rr = E0 + ENC.length; rr < E0 + ENC.length + 30; rr++) encRows.push(['', '', '', '', '', '', conv(`=IF(C${rr}="","",C${rr}-N(F${rr}))`), '', '', '']);
  data.push({ range: "'STOCK encargos'!A1", majorDimension: 'ROWS', values: [
    ['ENCARGOS Y ACCIONES · lo anota Karla. Cada encargo con su fecha de llegada estimada; cuando llega, se anota la fecha y la cantidad.'],
    [], [],
    ['Fecha', 'Qué', 'Cantidad encargada', 'Llega (estimado)', 'Llegó (fecha)', 'Cantidad que llegó', 'Falta que llegue', 'Quién → a quién', 'Pagó', 'Qué dijo'],
  ].concat(encRows) });

  // ---------- formato ----------
  const g = (sid, r0, r1, c0, c1) => ({ sheetId: sid, startRowIndex: r0, endRowIndex: r1, startColumnIndex: c0, endColumnIndex: c1 });
  const cell = (range, f, fields) => fmt.push({ repeatCell: { range, cell: { userEnteredFormat: f }, fields: 'userEnteredFormat(' + fields + ')' } });
  const paint = (range, bg, fg, bold, extra) => cell(range, Object.assign({ backgroundColor: hex(bg), textFormat: { bold: !!bold, foregroundColor: hex(fg || '000000'), fontFamily: 'Arial', fontSize: 10 } }, extra || {}),
    'backgroundColor,textFormat' + (extra ? ',' + Object.keys(extra).join(',') : ''));
  const num = (range, type, pattern) => cell(range, { numberFormat: { type, pattern } }, 'numberFormat');
  const merge = range => fmt.push({ mergeCells: { range, mergeType: 'MERGE_ALL' } });
  const width = (sid, c0, c1, px) => fmt.push({ updateDimensionProperties: { range: { sheetId: sid, dimension: 'COLUMNS', startIndex: c0, endIndex: c1 }, properties: { pixelSize: px }, fields: 'pixelSize' } });
  const cf = (ranges, formula, f, index) => fmt.push({ addConditionalFormatRule: { index, rule: { ranges, booleanRule: { condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: conv(formula) }] }, format: f } } } });
  const note = (sid, row, col, text) => fmt.push({ updateCells: { range: g(sid, row, row + 1, col, col + 1), rows: [{ values: [{ note: text }] }], fields: 'note' } });
  const center = { horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE', wrapStrategy: 'WRAP' };
  const S = ID['STOCK'];
  const INT = '#,##0', NEG = '#,##0;[Red]-#,##0', DIA = 'ddd dd-mmm', FECHA = 'dd-mmm';

  paint(g(S, 0, FL, 0, 10), 'FFFFFF', '000000', false);
  cell(g(S, 0, 1, 0, 1), { textFormat: { bold: true, fontSize: 13, foregroundColor: hex(COL.titulo), fontFamily: 'Arial' } }, 'textFormat');
  paint(g(S, 1, 2, 0, 1), COL.label, '000000', true); paint(g(S, 3, 4, 0, 1), COL.label, '000000', true);
  paint(g(S, 5, 6, 0, 1), COL.label, '000000', true); paint(g(S, 7, 8, 0, 1), COL.label, '000000', true);
  paint(g(S, 2, 3, 0, 1), COL.input, '000000', true, { horizontalAlignment: 'CENTER' });
  cell(g(S, 2, 3, 0, 1), { textFormat: { bold: true, fontSize: 12, fontFamily: 'Arial' } }, 'textFormat');
  paint(g(S, 4, 5, 0, 1), 'FFFFFF', '000000', true, { horizontalAlignment: 'CENTER' });
  paint(g(S, 6, 7, 0, 1), 'FFFFFF', '000000', true, { horizontalAlignment: 'CENTER' }); num(g(S, 6, 7, 0, 1), 'DATE', FECHA);
  paint(g(S, 8, 9, 0, 1), 'FFFFFF', '000000', true, { horizontalAlignment: 'CENTER' }); num(g(S, 8, 9, 0, 1), 'DATE', FECHA);
  fmt.push({ setDataValidation: { range: g(S, 2, 3, 0, 1), rule: { condition: { type: 'ONE_OF_LIST', values: [{ userEnteredValue: 'AlbaMed' }, { userEnteredValue: 'VisionPure' }] }, showCustomUi: true, strict: true } } });
  // cajas
  const caja = (c0, c1, cv0, nrows, h, light) => {
    merge(g(S, 1, 2, c0, cv0 + 1)); paint(g(S, 1, 2, c0, cv0 + 1), h, 'FFFFFF', true, center);
    for (let i = 0; i < nrows; i++) if (c1 - c0 > 1) merge(g(S, 2 + i, 3 + i, c0, c1));
    paint(g(S, 2, 2 + nrows, c0, c1), light, '000000', false, { horizontalAlignment: 'LEFT', verticalAlignment: 'MIDDLE' });
    paint(g(S, 2, 2 + nrows, cv0, cv0 + 1), 'FFFFFF', '000000', true, { horizontalAlignment: 'RIGHT', verticalAlignment: 'MIDDLE' });
    fmt.push({ updateBorders: { range: g(S, 1, 2 + nrows, c0, cv0 + 1), top: { style: 'SOLID', color: hex(h) }, bottom: { style: 'SOLID', color: hex(h) },
      left: { style: 'SOLID', color: hex(h) }, right: { style: 'SOLID', color: hex(h) }, innerHorizontal: { style: 'SOLID', color: hex('DDDDDD') } } });
  };
  caja(1, 3, 3, 7, COL.venta, COL.ventaC); caja(4, 6, 6, 7, COL.stock, COL.stockC); caja(8, 9, 9, 10, COL.pedido, COL.pedidoC);
  paint(g(S, 7, 12, 9, 10), COL.input, '000000', true, { horizontalAlignment: 'RIGHT' });
  num(g(S, 2, 5, 3, 4), 'NUMBER', '#,##0'); num(g(S, 5, 6, 3, 4), 'NUMBER', INT); num(g(S, 6, 7, 3, 4), 'PERCENT', '0%'); num(g(S, 7, 9, 3, 4), 'NUMBER', INT);
  num(g(S, 2, 4, 6, 7), 'NUMBER', NEG); num(g(S, 4, 5, 6, 7), 'DATE', FECHA); num(g(S, 5, 6, 6, 7), 'NUMBER', INT); num(g(S, 6, 7, 6, 7), 'DATE', FECHA);
  num(g(S, 7, 8, 6, 7), 'NUMBER', '0.0;[Red]-0.0'); num(g(S, 8, 9, 6, 7), 'DATE', FECHA);
  num(g(S, 2, 3, 9, 10), 'DATE', FECHA); num(g(S, 3, 4, 9, 10), 'NUMBER', INT); num(g(S, 4, 5, 9, 10), 'CURRENCY', '"$"#,##0'); num(g(S, 5, 7, 9, 10), 'NUMBER', INT);
  num(g(S, 7, 11, 9, 10), 'NUMBER', INT); num(g(S, 11, 12, 9, 10), 'CURRENCY', '"$"#,##0.00');
  // tabla
  const H0 = 13, B0 = 15;   // fila de secciones (0-based) y primera de días
  merge(g(S, H0, H0 + 1, 1, 5)); merge(g(S, H0, H0 + 1, 5, 8));
  paint(g(S, H0, H0 + 2, 0, 1), COL.dia, 'FFFFFF', true, center);
  paint(g(S, H0, H0 + 2, 1, 5), COL.venta, 'FFFFFF', true, center);
  paint(g(S, H0, H0 + 2, 5, 8), COL.stock, 'FFFFFF', true, center);
  paint(g(S, H0, H0 + 2, 8, 9), COL.nota, 'FFFFFF', true, center);
  paint(g(S, B0, FL, 0, 1), COL.dia, 'FFFFFF', true, { horizontalAlignment: 'CENTER' }); num(g(S, B0, FL, 0, 1), 'DATE', DIA);
  paint(g(S, B0, FL, 1, 5), COL.ventaC, '000000', false, { horizontalAlignment: 'RIGHT' });
  paint(g(S, B0, FL, 5, 8), COL.stockC, '000000', false, { horizontalAlignment: 'RIGHT' });
  paint(g(S, B0, FL, 8, 9), COL.notaC, '404040', false, { horizontalAlignment: 'LEFT', wrapStrategy: 'CLIP' });
  num(g(S, B0, FL, 1, 4), 'NUMBER', INT); num(g(S, B0, FL, 4, 5), 'PERCENT', '0%');
  num(g(S, B0, FL, 5, 6), 'NUMBER', '#,##0;-#,##0;""'); num(g(S, B0, FL, 6, 8), 'NUMBER', NEG);
  fmt.push({ updateBorders: { range: g(S, H0, FL, 0, 9), top: { style: 'SOLID', color: hex('BFBFBF') }, bottom: { style: 'SOLID', color: hex('BFBFBF') },
    left: { style: 'SOLID', color: hex('BFBFBF') }, right: { style: 'SOLID', color: hex('BFBFBF') }, innerHorizontal: { style: 'SOLID', color: hex('D9D9D9') }, innerVertical: { style: 'SOLID', color: hex('D9D9D9') } } });
  width(S, 0, 1, 110); width(S, 1, 9, 92); width(S, 8, 9, 330); width(S, 9, 10, 95);
  fmt.push({ updateDimensionProperties: { range: { sheetId: S, dimension: 'ROWS', startIndex: H0 + 1, endIndex: H0 + 2 }, properties: { pixelSize: 34 }, fields: 'pixelSize' } });
  const tabla = [g(S, B0, FL, 0, 9)];
  const red = { backgroundColor: hex(COL.rojo), textFormat: { bold: true, foregroundColor: hex('9C0006') } };
  cf(tabla, `=$A${F0}=TODAY()`, { backgroundColor: hex(COL.hoy), textFormat: { bold: true } }, 0);
  cf([g(S, B0, FL, 6, 7)], `=AND(ISNUMBER(G${F0}),G${F0}<0,$A${F0}<=$A$7)`, red, 1);
  cf([g(S, B0, FL, 4, 5)], `=AND(ISNUMBER(E${F0}),$A${F0}<=$A$7-6,E${F0}<8/10)`, red, 2);
  cf([g(S, B0, FL, 0, 1)], `=WEEKDAY($A${F0},2)>5`, { backgroundColor: hex(COL.finde) }, 3);
  cf([g(S, B0, FL, 1, 9)], `=AND(ISNUMBER($A$7),$A${F0}>$A$7)`, { textFormat: { italic: true, foregroundColor: hex(COL.gris) } }, 4);
  cf([g(S, 6, 7, 3, 4)], '=AND(ISNUMBER(D7),D7<8/10)', red, 5);
  cf([g(S, 2, 3, 6, 7)], '=AND(ISNUMBER(G3),G3<0)', red, 6);
  cf([g(S, 2, 3, 9, 10)], '=AND(ISNUMBER(J3),J3<=$A$9)', red, 7);
  note(S, 14, 1, 'Hasta el último día real: unidades vendidas (Shopify). Después: la venta por día que se usa (D5), en cursiva gris.');
  note(S, 14, 2, 'De las unidades vendidas ese día, cuántas ya escaneó el courier. El escaneo llega unos 5 días después de la compra; lo normal es que a los 6 días haya salido casi todo.');
  note(S, 14, 5, 'Férulas que llegan ese día: lo que llegó (pestaña encargos, «Llegó») o lo que se espera («Llega (estimado)»).');
  note(S, 14, 6, 'Stock del día anterior + entrante − vendidas. Negativo = unidades que faltan para lo ya vendido. Si ese día hay dato de Jie, parte de ese dato.');
  note(S, 14, 7, 'Sale de la pestaña registro. «Le faltan X» → −X. «En bodega X» → X menos lo vendido sin despachar hasta ese día.');
  note(S, 2, 0, 'Elige el producto. AlbaMed = stock en la bodega de Jie. VisionPure = dropshipping (solo venta y despacho).');
  note(S, 3, 9, 'Lo que falta para cubrir los días de fábrica + los días extra + hasta el pedido siguiente. Redondeado a 100, nunca menos que el mínimo.');
  note(S, 5, 9, 'Bolsas que pide lo que viene + el pedido nuevo, menos las que quedan (último dato del registro) y las encargadas que no llegan.');

  // registro
  const R = ID['STOCK registro'];
  cell(g(R, 0, 1, 0, 1), { textFormat: { bold: true, fontSize: 11, foregroundColor: hex(COL.titulo), fontFamily: 'Arial' } }, 'textFormat');
  paint(g(R, 1, 2, 0, 7), COL.nota, 'FFFFFF', true, center);
  paint(g(R, 2, 300, 0, 7), COL.input, '000000', false, { verticalAlignment: 'TOP' });
  num(g(R, 2, 300, 0, 1), 'DATE', FECHA); num(g(R, 2, 300, 2, 6), 'NUMBER', INT);
  cell(g(R, 2, 300, 6, 7), { wrapStrategy: 'WRAP' }, 'wrapStrategy');
  fmt.push({ setDataValidation: { range: g(R, 2, 1000, 1, 2), rule: { condition: { type: 'ONE_OF_LIST', values: [{ userEnteredValue: 'AlbaMed' }, { userEnteredValue: 'VisionPure' }] }, showCustomUi: true, strict: true } } });
  fmt.push({ updateBorders: { range: g(R, 1, 300, 0, 7), innerHorizontal: { style: 'SOLID', color: hex('E5DFC0') }, innerVertical: { style: 'SOLID', color: hex('E5DFC0') }, bottom: { style: 'SOLID', color: hex('E5DFC0') } } });
  width(R, 0, 1, 95); width(R, 1, 6, 115); width(R, 6, 7, 520);
  note(R, 1, 2, 'Si Jie dice cuántas tiene en su bodega.'); note(R, 1, 3, 'Si Jie dice cuántas le faltan para despachar lo vendido.');
  note(R, 1, 4, 'Bolsas de AlbaMed que quedan (en la bodega o en la fábrica), según quien informe.');

  // encargos
  const EN = ID['STOCK encargos'];
  cell(g(EN, 0, 1, 0, 1), { textFormat: { bold: true, fontSize: 11, foregroundColor: hex(COL.titulo), fontFamily: 'Arial' } }, 'textFormat');
  paint(g(EN, 3, 4, 0, 10), COL.pedido, 'FFFFFF', true, center);
  paint(g(EN, 4, E0 + ENC.length + 29, 0, 10), COL.input, '000000', false, { verticalAlignment: 'TOP' });
  paint(g(EN, 4, E0 + ENC.length + 29, 6, 7), 'FFFFFF', '000000', true, { verticalAlignment: 'TOP', horizontalAlignment: 'RIGHT' });
  num(g(EN, 4, 500, 0, 1), 'DATE', FECHA); num(g(EN, 4, 500, 3, 5), 'DATE', FECHA); num(g(EN, 4, 500, 2, 3), 'NUMBER', INT); num(g(EN, 4, 500, 5, 7), 'NUMBER', INT);
  cell(g(EN, 4, 500, 9, 10), { wrapStrategy: 'WRAP', textFormat: { fontSize: 10, foregroundColor: hex('404040'), fontFamily: 'Arial' } }, 'wrapStrategy,textFormat');
  fmt.push({ setDataValidation: { range: g(EN, 4, 500, 1, 2), rule: { condition: { type: 'ONE_OF_LIST', values: ['Férulas', 'Bolsas', 'Manuales', 'VisionPure', 'Acción'].map(v => ({ userEnteredValue: v })) }, showCustomUi: true, strict: true } } });
  fmt.push({ updateBorders: { range: g(EN, 3, E0 + ENC.length + 29, 0, 10), innerHorizontal: { style: 'SOLID', color: hex('E5DFC0') }, innerVertical: { style: 'SOLID', color: hex('E5DFC0') }, bottom: { style: 'SOLID', color: hex('E5DFC0') } } });
  width(EN, 0, 1, 80); width(EN, 1, 2, 85); width(EN, 2, 7, 95); width(EN, 7, 9, 110); width(EN, 9, 10, 520);
  cf([g(EN, 4, 500, 0, 10)], '=$B5="Acción"', { textFormat: { italic: true, foregroundColor: hex('595959') } }, 0);

  // datos
  const DT = ID['STOCK datos'];
  paint(g(DT, 0, 1, 0, 4), COL.gris, 'FFFFFF', true, center);
  num(g(DT, 1, 3000, 0, 1), 'DATE', 'yyyy-mm-dd');
  width(DT, 0, 4, 120);
  note(DT, 0, 0, 'Lo escribe n8n desde Shopify y el tracking. No se edita a mano.');
  return { crear, data, fmt, locale: loc, separador: puntoDecimal ? ',' : ';' };
}
if (typeof module !== 'undefined') module.exports = { armarStock };
