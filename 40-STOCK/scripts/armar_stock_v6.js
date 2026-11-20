// STOCK v6 (18-nov): estilo del Media Buying Master. Solo números y alertas por color (Martin: «que no queden respuestas»).
// El Año Nuevo Chino salió del Sheet: va como recordatorio en Slack.
// Reemplaza la pestaña STOCK. No toca STOCK registro / encargos / datos / supuestos.
// Filas: 1 título · 2 selector · 4-12 cajas (STOCK HOY · PEDIDO Y EMPAQUE · PAGOS A JIE) · 14 grupos · 15 columnas · 16-185 días.
function armarStockV6(meta) {
  const loc = (meta.properties && meta.properties.locale) || 'en_US';
  const puntoDecimal = /^(en|es_MX|es_419|es_US|ja|zh|ko|th|he|iw|hi)/.test(loc);
  const conv = f => { if (puntoDecimal) return f; let o = '', q = false; for (const ch of f) { if (ch === '"') q = !q; o += (!q && ch === ',') ? ';' : ch; } return o; };
  const hojas = (meta.sheets || []).map(s => s.properties);
  const vieja = hojas.find(h => h.title === 'STOCK');
  const S = 910031;
  if (hojas.find(h => h.sheetId === S)) throw new Error('sheetId 910031 ya usado');
  if (!hojas.find(h => h.title === 'STOCK supuestos')) throw new Error('Falta la pestaña STOCK supuestos');
  const hex = h => ({ red: parseInt(h.slice(0, 2), 16) / 255, green: parseInt(h.slice(2, 4), 16) / 255, blue: parseInt(h.slice(4, 6), 16) / 255 });
  // paleta del Media Buying Master
  const C = { azul: '0033BF', azulFuturo: '7F99DF', azulFinde: '3D63D1', verde: '338C4C', verdeC: 'E0F2E0', teal: '1A8099', tealC: 'E0F2F7',
    nota: '595959', notaC: 'F7F2E0', oro: 'B07D10', oroC: 'FFF4D6', rojo: 'C0392B', rojoC: 'FCE4E4', titulo: '72590C', gris: 'EFEFEF',
    amarillo: 'FFF9D8', hoy: 'B8E6B3', texto: '000000', textoGris: '808080' };

  const d = c => `'STOCK datos'!$${c}$2:$${c}$3000`;
  const r = c => `'STOCK registro'!$${c}$3:$${c}$1000`;
  const e = c => `'STOCK encargos'!$${c}$5:$${c}$500`;
  const p = n => `'STOCK supuestos'!$B$${n}`;
  const H = 15, F0 = 16, N = 170, FL = F0 + N - 1;        // cabecera de columnas, primera y última fila de días (1-based)
  const rng = c => `$${c}$${F0}:$${c}$${FL}`;
  const L = n => `$L$${n}`;

  const crear = [], data = [], fmt = [];
  if (vieja) crear.push({ deleteSheet: { sheetId: vieja.sheetId } });
  crear.push({ addSheet: { properties: { sheetId: S, title: 'STOCK', index: 0, tabColor: hex(C.azul),
    gridProperties: { rowCount: FL + 5, columnCount: 13, frozenRowCount: H, frozenColumnCount: 0 } } } });

  const V = Array.from({ length: FL }, () => Array(12).fill(''));
  const put = (a1, v) => { const m = a1.match(/^([A-L])(\d+)$/); V[+m[2] - 1][m[1].charCodeAt(0) - 65] = v; };
  put('A1', 'STOCK EN BODEGA DE JIE · Alegres México');
  put('J1', '="Hoy "&TEXT(TODAY(),"ddd d mmm")');
  put('A2', 'Producto'); put('B2', 'AlbaMed'); put('D2', '← AlbaMed = stock · VisionPure = dropshipping');

  // ayudantes (columna L, oculta)
  const Lf = {
    1: '=IF($B$2="AlbaMed","Stock","Dropshipping")',
    2: `=IFERROR(1/(1/MAXIFS(${d('A')},${d('B')},$B$2)),"")`,
    3: `=IFERROR(SUMIFS(${d('C')},${d('B')},$B$2,${d('A')},">"&(${L(2)}-7),${d('A')},"<="&${L(2)})/7,0)`,
    4: `=IFERROR(SUMIFS(${d('C')},${d('B')},$B$2,${d('A')},">"&(${L(2)}-3),${d('A')},"<="&${L(2)})/3,0)`,
    5: `=IF(${L(4)}>${L(3)}*(1+${p(7)}),${L(4)},${L(3)})`,
    6: `=IFERROR(INDEX(${rng('G')},MATCH(TODAY(),${rng('A')},0)),0)`,
    7: `=SUMIFS(${e('G')},${e('B')},"Férulas",${e('E')},"=",${e('D')},"<>")`,
    8: `=IFERROR(1/(1/MINIFS(${e('D')},${e('B')},"Férulas",${e('E')},"=",${e('D')},"<>")),"")`,
    9: `=SUMIFS(${e('G')},${e('B')},"Férulas",${e('E')},"=",${e('D')},"=")`,
    10: `=N(${L(6)})+${L(7)}+${L(9)}`,
    11: `=IF(${L(5)}=0,"",MAX(0,${L(10)}/${L(5)}))`,
    12: `=IF(${L(11)}="","",TODAY()+${L(11)})`,
    15: `=IFERROR(INDEX(FILTER(${r('E')},${r('E')}<>"",${r('B')}="AlbaMed"),COUNTA(FILTER(${r('E')},${r('E')}<>"",${r('B')}="AlbaMed"))),0)`,
    16: `=SUMIFS(${e('G')},${e('B')},"Bolsas",${e('E')},"=")`,
    17: `=IFERROR(INDEX(FILTER(${r('F')},${r('F')}<>"",${r('B')}="AlbaMed"),COUNTA(FILTER(${r('F')},${r('F')}<>"",${r('B')}="AlbaMed"))),0)`,
    18: `=SUMIFS(${e('G')},${e('B')},"Manuales",${e('E')},"=")`,
    19: `=IFERROR(SUMIFS(${d('D')},${d('B')},$B$2,${d('A')},">="&(${L(2)}-12),${d('A')},"<="&(${L(2)}-6))/SUMIFS(${d('C')},${d('B')},$B$2,${d('A')},">="&(${L(2)}-12),${d('A')},"<="&(${L(2)}-6)),"")`,
    20: `=IFERROR(1/(1/MAX(MAXIFS(${r('A')},${r('B')},$B$2,${r('C')},"<>"),MAXIFS(${r('A')},${r('B')},$B$2,${r('D')},"<>"))),"")`,
    25: `=IFERROR(TEXTJOIN(" + ",TRUE,ARRAYFORMULA(TEXT(FILTER(${e('G')},${e('B')}="Férulas",${e('E')}="",${e('D')}="",N(${e('G')})>0),"#,##0"))),"")`,
    26: `=COUNTIFS(${e('D')},"<"&TODAY(),${e('E')},"=",${e('D')},"<>",${e('G')},">0")`,
    27: `=MAXIFS(${d('A')},${d('B')},"AlbaMed")`,
    28: `=IFERROR(SUMIFS(${d('C')},${d('B')},"AlbaMed",${d('A')},">"&(${L(27)}-7),${d('A')},"<="&${L(27)})/7,0)`,
    29: `=SUMIFS(${d('C')},${d('B')},"AlbaMed")-SUMIFS(${d('D')},${d('B')},"AlbaMed")`,
    30: `=MAXIFS(${d('A')},${d('B')},"VisionPure")`,
    31: `=IFERROR(SUMIFS(${d('C')},${d('B')},"VisionPure",${d('A')},">"&(${L(30)}-7),${d('A')},"<="&${L(30)})/7,0)`,
    32: `=SUMIFS(${d('C')},${d('B')},"VisionPure")-SUMIFS(${d('D')},${d('B')},"VisionPure")`,
    33: `=${p(2)}+${p(3)}`,
    34: `=${p(2)}+${p(3)}+${p(4)}`,
    35: `=IF(${L(5)}=0,"",(${L(15)}+${L(16)})/${L(5)})`,
    36: `=IF(${L(5)}=0,"",(${L(17)}+${L(18)})/${L(5)})`,
  };
  for (const [k, f] of Object.entries(Lf)) put('L' + k, f);
  const NS = x => `=IF(${L(1)}<>"Stock","—",${x})`;
  // caja 1 · STOCK HOY (etiqueta A:C, valor D)
  put('A4', 'STOCK HOY');
  const caja1 = [
    ['Venta por día', `=ROUND(${L(5)},0)`],
    ['Pedidos esperando stock', NS(`MAX(0,-N(${L(6)}))`)],
    ['En bodega, libre', NS(`MAX(0,N(${L(6)}))`)],
    [`="En camino"&IF(${L(8)}="",""," · llega "&TEXT(${L(8)},"d mmm"))`, NS(L(7))],
    [`="Encargado sin fecha"&IF(${L(25)}="",""," ("&${L(25)}&")")`, NS(L(9))],
    ['Cobertura (días)', NS(`IF(${L(11)}="","",ROUND(${L(11)},0))`)],
    ['Despachado de hace 6–12 días', `=${L(19)}`],
    ['Días sin dato de Jie', NS(`IF(${L(20)}="","",TODAY()-${L(20)})`)],
  ];
  caja1.forEach(([l, v], i) => { put('A' + (5 + i), l); put('D' + (5 + i), v); });
  // caja 2 · PEDIDO Y EMPAQUE (etiqueta E:G, valor H)
  put('E4', 'ENCARGOS Y EMPAQUE');  // 18-nov: fuera «pedir el / cuánto / costo»: encargar lo decide Jie y cobra al despachar
  const caja2 = [
    ['Encargos con llegada vencida', NS(L(26))],
    ['Bolsas: stock + encargadas', NS(`${L(15)}+${L(16)}`)],
    ['Bolsas alcanzan (días)', NS(`IF(${L(35)}="","",ROUND(${L(35)},0))`)],
    ['Manuales: stock + encargados', NS(`${L(17)}+${L(18)}`)],
    ['Manuales alcanzan (días)', NS(`IF(${L(36)}="","",ROUND(${L(36)},0))`)],
  ];
  caja2.forEach(([l, v], i) => { put('E' + (5 + i), l); put('H' + (5 + i), v); });
  // caja 3 · PAGOS A JIE, los dos productos (etiqueta I, valor J)
  put('I4', 'PAGOS A JIE (AlbaMed + VisionPure, USD)');
  const caja3 = [
    ['AlbaMed · lo que se vende en una semana', `=${L(28)}*7*${p(14)}`],
    ['VisionPure · lo que se vende en una semana', `=${L(31)}*7*${p(15)}`],
    ['Total por semana', '=J5+J6'],
    ['AlbaMed · vendido sin despachar (se cobra al salir)', `=${L(29)}*${p(14)}`],
    ['VisionPure · vendido sin despachar', `=${L(32)}*${p(15)}`],
    ['Total que viene por lo atrasado', '=J8+J9'],
    ['Precio promedio por unidad · AlbaMed', `=${p(14)}`],
    ['Precio promedio por unidad · VisionPure', `=${p(15)}`],
  ];
  caja3.forEach(([l, v], i) => { put('I' + (5 + i), l); put('J' + (5 + i), v); });
  // tabla
  put('A14', 'DÍA'); put('B14', 'VENTA Y DESPACHO'); put('F14', 'STOCK'); put('I14', 'NOTAS (de la pestaña STOCK registro)');
  ['Fecha', 'Vendidas', 'Despachadas', 'Sin despachar', '% despachado', 'Entrante', 'Stock en vivo', 'Stock según Jie', 'Nota']
    .forEach((h, i) => { V[H - 1][i] = h; });
  for (let i = 0; i < N; i++) {
    const x = F0 + i, off = 14 - i, row = V[x - 1], A = `$A${x}`;
    row[0] = `=IF(TODAY()+(${off})<DATE(2026,11,1),"",TODAY()+(${off}))`;
    row[1] = `=IF(${A}="","",IF(${A}<=${L(2)},SUMIFS(${d('C')},${d('A')},${A},${d('B')},$B$2),IF(${L(1)}="Stock",ROUND(${L(5)},0),"")))`;
    row[2] = `=IF(OR(${A}="",${A}>${L(2)}),"",SUMIFS(${d('D')},${d('A')},${A},${d('B')},$B$2))`;
    row[3] = `=IF(C${x}="","",B${x}-C${x})`;
    row[4] = `=IF(OR(C${x}="",N(B${x})=0),"",C${x}/B${x})`;
    row[5] = `=IF(OR(${A}="",${L(1)}<>"Stock"),"",SUMIFS(${e('F')},${e('B')},"Férulas",${e('E')},${A})+SUMIFS(${e('G')},${e('B')},"Férulas",${e('E')},"=",${e('D')},${A}))`;
    row[7] = `=IF(OR(${A}="",${L(1)}<>"Stock"),"",IF(COUNTIFS(${r('A')},${A},${r('B')},$B$2,${r('D')},"<>")>0,-SUMIFS(${r('D')},${r('A')},${A},${r('B')},$B$2),IF(COUNTIFS(${r('A')},${A},${r('B')},$B$2,${r('C')},"<>")>0,SUMIFS(${r('C')},${r('A')},${A},${r('B')},$B$2)-SUMIFS(${rng('D')},${rng('A')},"<="&${A}),"")))`;
    row[6] = `=IF(OR(${A}="",${L(1)}<>"Stock"),"",IF(H${x}<>"",H${x},IF(G${x + 1}="","",G${x + 1}+N(F${x})-N(B${x}))))`;
    row[8] = `=IF(${A}="","",IFERROR(TEXTJOIN(" · ",TRUE,FILTER(${r('G')},${r('A')}=${A},${r('B')}=$B$2)),""))`;
  }
  data.push({ range: "'STOCK supuestos'!A14:B15", majorDimension: 'ROWS', values: [['Precio promedio que cobra Jie por unidad · AlbaMed (USD, aprox: 1 u 7,2 · 2 u 12,5)', 6.5], ['Precio promedio que cobra Jie por unidad · VisionPure (USD, aprox: 1 u 4,9 · 2 u 7,6 · 3 u 9,9 · 5 u 11,4)', 3.3]] });
  data.push({ range: "'STOCK'!A1", majorDimension: 'ROWS', values: V.map(rw => rw.map(v => (typeof v === 'string' && v.startsWith('=')) ? conv(v) : v)) });

  // ---------- formato (como el generador del Media Buying Master) ----------
  const g = (r0, r1, c0, c1) => ({ sheetId: S, startRowIndex: r0, endRowIndex: r1, startColumnIndex: c0, endColumnIndex: c1 });
  const cell = (range, f, fields) => fmt.push({ repeatCell: { range, cell: { userEnteredFormat: f }, fields: 'userEnteredFormat(' + fields + ')' } });
  const tf = (size, color, bold, italic) => ({ fontFamily: 'Arial', fontSize: size, foregroundColor: hex(color), bold: !!bold, italic: !!italic });
  const fill = (range, bg, fg, bold, size, extra) => cell(range, Object.assign({ backgroundColor: hex(bg), textFormat: tf(size || 9, fg || C.texto, bold),
    horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE', wrapStrategy: 'WRAP' }, extra || {}),
    'backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy' + (extra ? ',' + Object.keys(extra).join(',') : ''));
  const num = (range, type, pattern) => cell(range, { numberFormat: { type, pattern } }, 'numberFormat');
  const merge = range => fmt.push({ mergeCells: { range, mergeType: 'MERGE_ALL' } });
  const width = (c0, c1, px) => fmt.push({ updateDimensionProperties: { range: { sheetId: S, dimension: 'COLUMNS', startIndex: c0, endIndex: c1 }, properties: { pixelSize: px }, fields: 'pixelSize' } });
  const height = (r0, r1, px) => fmt.push({ updateDimensionProperties: { range: { sheetId: S, dimension: 'ROWS', startIndex: r0, endIndex: r1 }, properties: { pixelSize: px }, fields: 'pixelSize' } });
  let k = 0;
  const cf = (range, formula, format) => fmt.push({ addConditionalFormatRule: { index: k++, rule: { ranges: [range],
    booleanRule: { condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: conv(formula) }] }, format } } } });
  const line = c => ({ style: 'SOLID', color: hex(c) });

  cell(g(0, FL, 0, 12), { textFormat: tf(9, C.texto), verticalAlignment: 'MIDDLE' }, 'textFormat,verticalAlignment');
  // título y selector
  cell(g(0, 1, 0, 1), { textFormat: tf(11, C.titulo, true) }, 'textFormat');
  cell(g(0, 1, 9, 10), { textFormat: tf(9, C.textoGris, false, true), horizontalAlignment: 'RIGHT' }, 'textFormat,horizontalAlignment');
  fill(g(1, 2, 0, 1), C.gris, C.texto, true, 10);
  merge(g(1, 2, 1, 3)); fill(g(1, 2, 1, 3), C.amarillo, C.texto, true, 11);
  cell(g(1, 2, 3, 4), { textFormat: tf(8, '666666', false, true), horizontalAlignment: 'LEFT', wrapStrategy: 'OVERFLOW_CELL' }, 'textFormat,horizontalAlignment,wrapStrategy');
  fmt.push({ setDataValidation: { range: g(1, 2, 1, 3), rule: { condition: { type: 'ONE_OF_LIST', values: [{ userEnteredValue: 'AlbaMed' }, { userEnteredValue: 'VisionPure' }] }, showCustomUi: true, strict: true } } });
  height(2, 3, 8);
  // cajas (8 filas cada una: filas 5-12)
  const cajas = [[0, 3, 3, C.teal, C.tealC], [4, 7, 7, C.oro, C.oroC], [8, 9, 9, C.verde, C.verdeC]];
  for (const [c0, c1, cv, fuerte, tinte] of cajas) {
    merge(g(3, 4, c0, cv + 1)); fill(g(3, 4, c0, cv + 1), fuerte, 'FFFFFF', true, 10, { horizontalAlignment: 'LEFT', padding: { left: 6 } });
    for (let i = 0; i < 8; i++) if (c1 - c0 > 1) merge(g(4 + i, 5 + i, c0, c1));
    cell(g(4, 12, c0, c1), { backgroundColor: hex(tinte), textFormat: tf(9, C.texto, true, true), horizontalAlignment: 'LEFT', padding: { left: 6 }, wrapStrategy: 'CLIP' },
      'backgroundColor,textFormat,horizontalAlignment,padding,wrapStrategy');
    cell(g(4, 12, cv, cv + 1), { backgroundColor: hex('FFFFFF'), textFormat: tf(10, C.texto, true), horizontalAlignment: 'RIGHT', padding: { right: 6 } },
      'backgroundColor,textFormat,horizontalAlignment,padding');
    fmt.push({ updateBorders: { range: g(3, 12, c0, cv + 1), top: line(fuerte), bottom: line(fuerte), left: line(fuerte), right: line(fuerte), innerHorizontal: line('E5E5E5') } });
  }
  num(g(4, 12, 3, 4), 'NUMBER', '#,##0'); num(g(10, 11, 3, 4), 'PERCENT', '0%');
  num(g(4, 12, 7, 8), 'NUMBER', '#,##0');
  num(g(4, 12, 9, 10), 'CURRENCY', '"$"#,##0'); num(g(10, 12, 9, 10), 'CURRENCY', '"$"#,##0.00');
  cell(g(6, 7, 9, 10), { backgroundColor: hex(C.verdeC) }, 'backgroundColor'); cell(g(9, 10, 9, 10), { backgroundColor: hex(C.verdeC) }, 'backgroundColor');
  height(3, 12, 21); height(12, 13, 10);
  // tabla: fila de grupos y fila de columnas con color fuerte, celdas con tinte hasta abajo
  merge(g(13, 14, 1, 5)); merge(g(13, 14, 5, 8));
  const grupos = [[0, 1, C.azul, 'FFFFFF'], [1, 5, C.verde, C.verdeC], [5, 8, C.teal, C.tealC], [8, 9, C.nota, C.notaC]];
  for (const [c0, c1, fuerte, tinte] of grupos) {
    fill(g(13, 15, c0, c1), fuerte, 'FFFFFF', true, 9);
    if (c0 > 0) fill(g(15, FL, c0, c1), tinte, C.texto, false, 9);
  }
  fill(g(15, FL, 0, 1), C.azul, 'FFFFFF', true, 9);
  num(g(15, FL, 0, 1), 'DATE', 'ddd d mmm');
  cell(g(13, 14, 8, 9), { horizontalAlignment: 'LEFT', padding: { left: 6 } }, 'horizontalAlignment,padding');
  cell(g(15, FL, 8, 9), { textFormat: tf(9, '404040'), horizontalAlignment: 'LEFT', padding: { left: 6, right: 6 }, wrapStrategy: 'WRAP' }, 'textFormat,horizontalAlignment,padding,wrapStrategy');
  num(g(15, FL, 1, 4), 'NUMBER', '#,##0'); num(g(15, FL, 4, 5), 'PERCENT', '0%');
  num(g(15, FL, 5, 6), 'NUMBER', '#,##0;-#,##0;""'); num(g(15, FL, 6, 8), 'NUMBER', '#,##0;-#,##0');
  height(13, 14, 21); height(14, 15, 30); height(15, FL, 21);
  width(0, 1, 95); width(1, 8, 88); width(8, 9, 330); width(9, 10, 110); width(10, 11, 16);
  fmt.push({ updateDimensionProperties: { range: { sheetId: S, dimension: 'COLUMNS', startIndex: 11, endIndex: 12 }, properties: { hiddenByUser: true }, fields: 'hiddenByUser' } });
  // condicionales: alertas por color cuando un número está fuera de rango (el primero que calza manda)
  const T = g(15, FL, 1, 9);
  const madura = `$A${F0}<=$L$2-6`;
  const ROJO = { backgroundColor: hex('FFC7CE'), textFormat: { foregroundColor: hex('9C0006'), bold: true } };
  const AMARILLO = { backgroundColor: hex('FFEB9C'), textFormat: { foregroundColor: hex('9C5700'), bold: true } };
  const VERDE = { backgroundColor: hex('C6EFCE'), textFormat: { foregroundColor: hex('006100'), bold: true } };
  cf(g(15, FL, 4, 5), `=AND(ISNUMBER(E${F0}),${madura},E${F0}>=9/10)`, VERDE);
  cf(g(15, FL, 4, 5), `=AND(ISNUMBER(E${F0}),${madura},E${F0}>=8/10)`, AMARILLO);
  cf(g(15, FL, 4, 5), `=AND(ISNUMBER(E${F0}),${madura})`, ROJO);
  cf(g(15, FL, 6, 7), `=AND(ISNUMBER(G${F0}),G${F0}<0,$A${F0}<=$L$2)`, { textFormat: { foregroundColor: hex('9C0006'), bold: true } });
  cf(g(15, FL, 0, 9), `=$A${F0}=TODAY()`, { backgroundColor: hex(C.hoy), textFormat: { bold: true, foregroundColor: hex(C.texto) } });
  cf(g(15, FL, 0, 1), `=AND($A${F0}<>"",$A${F0}>TODAY())`, { backgroundColor: hex(C.azulFuturo) });
  cf(T, `=AND($A${F0}<>"",$A${F0}>TODAY())`, { textFormat: { foregroundColor: hex(C.textoGris) } });
  cf(g(15, FL, 0, 1), `=AND($A${F0}<>"",WEEKDAY($A${F0},2)>5)`, { backgroundColor: hex(C.azulFinde) });
  cf(g(15, FL, 0, 9), `=$A${F0}=""`, { backgroundColor: hex('FFFFFF') });
  // caja 1
  cf(g(5, 6, 3, 4), '=AND(ISNUMBER($D$6),$D$6>0)', ROJO);
  cf(g(8, 9, 3, 4), '=AND(ISNUMBER($D$9),$D$9>0)', AMARILLO);
  cf(g(9, 10, 3, 4), '=AND(ISNUMBER($D$10),$D$10<$L$33)', ROJO);
  cf(g(9, 10, 3, 4), '=AND(ISNUMBER($D$10),$D$10<$L$34)', AMARILLO);
  cf(g(9, 10, 3, 4), '=ISNUMBER($D$10)', VERDE);
  cf(g(10, 11, 3, 4), '=AND(ISNUMBER($D$11),$D$11>=9/10)', VERDE);
  cf(g(10, 11, 3, 4), '=AND(ISNUMBER($D$11),$D$11>=8/10)', AMARILLO);
  cf(g(10, 11, 3, 4), '=ISNUMBER($D$11)', ROJO);
  cf(g(11, 12, 3, 4), '=AND(ISNUMBER($D$12),$D$12>5)', ROJO);
  cf(g(11, 12, 3, 4), '=AND(ISNUMBER($D$12),$D$12>3)', AMARILLO);
  // caja 2
  cf(g(4, 5, 7, 8), '=AND(ISNUMBER($H$5),$H$5>0)', ROJO);
  for (const r of [6, 8]) {
    const c = `$H$${r + 1}`;
    cf(g(r, r + 1, 7, 8), `=AND(ISNUMBER(${c}),${c}<$L$33)`, ROJO);
    cf(g(r, r + 1, 7, 8), `=AND(ISNUMBER(${c}),${c}<$L$34)`, AMARILLO);
  }
  const note = (row, col, text) => fmt.push({ updateCells: { range: g(row, row + 1, col, col + 1), rows: [{ values: [{ note: text }] }], fields: 'note' } });
  note(14, 1, 'Hasta el último día con datos: unidades vendidas (Shopify). Desde hoy: la venta por día que se usa, en gris.');
  note(14, 2, 'De lo vendido ese día, cuántas unidades ya escaneó el courier. Lo normal: casi todo a los 6 días.');
  note(14, 4, 'Verde ≥ 90 %, amarillo 80–90 %, rojo bajo 80 %. Solo se colorea desde el sexto día.');
  note(14, 5, 'Férulas que llegan ese día (pestaña STOCK encargos).');
  note(14, 6, 'Día anterior + entrante − vendidas. Negativo = pedidos esperando stock. Rojo solo si es real.');
  note(14, 7, 'De la pestaña STOCK registro: «Le faltan X» = −X; «En bodega X» = X menos lo vendido sin despachar.');
  note(9, 0, 'Rojo: menos que lo que tarda la fábrica + llegada a Jie. Amarillo: menos que el ciclo completo (fábrica + llegada + hasta el pedido siguiente).');
  note(4, 4, 'Encargos cuya fecha de llegada ya pasó y nadie anotó «Llegó» en STOCK encargos.');
  note(4, 8, 'Lo que Jie cobra al despachar, a precio promedio por unidad (pestaña STOCK supuestos). Es estimado: el número fino lo lleva el control de Megafulfill.');
  return { crear, data, fmt, locale: loc };
}
if (typeof module !== 'undefined') module.exports = { armarStockV6 };
