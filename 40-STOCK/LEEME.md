# Control de stock · AlbaMed y VisionPure en la bodega de Jie

*Parte del motor desde el 20-nov. Lo opera Karla con Martin. Fuente original: la sesión «Control de stock» (17 y 18-nov); la copia viva es esta.*

## La pregunta que responde
**¿Alcanza el stock o hay que pedir?** Y de paso: ¿Jie está despachando lo que vendemos?
- **AlbaMed** se trabaja **con stock**: Jie compra por lotes a Kevin, el fabricante, y lo guarda en su bodega.
- **VisionPure** es **dropshipping**: Jie lo compra por pedido.

Por eso el riesgo de quiebre está casi todo en AlbaMed.

## Quién es quién
- **Kevin Xu**: fabricante de la férula AlbaMed (Xiamen Situ Crafts). Es casi el único proveedor; ver `proveedores-albamed.md`.
- **Jie** (Megafulfill): compra, guarda, empaca y despacha.
- **Karla**: anota en el Sheet lo que dicen Jie y Kevin, y avisa cuando algo no calza.
- **Martin**: decide cuánto pedir y paga.

## El grupo de WeChat (desde el 19-nov)
- Están Kevin, Jie, Martin y Karla. Sirve para la operación del stock: cuántas hay, cuándo salen, cuándo llegan.
- **Los precios se hablan por privado**, no en el grupo.
- **Todo lo que se acuerda en WeChat se anota en el Sheet** (pestañas «STOCK registro» y «STOCK encargos»), porque el motor no puede leer WeChat. Lo que no está en el Sheet, para el motor no existe.
- Karla puede pegarle a Claude el texto o el pantallazo de lo que dijo Kevin o Jie, y Claude lo pasa a la fila que corresponde (fecha · producto · en bodega · le faltan · nota con la frase textual).

## Dónde está todo
- **Sheet «Alegres Mexico»**, el de las facturas de Jie, del que Carlos Brito es dueño: https://docs.google.com/spreadsheets/d/1eEoAfvZbMvCCotzRiaJRtfQDN88pZoi-Me12PVEQXqI/edit#gid=910001
  - **Jie y su equipo ven estas pestañas.** No escribir nada que no queramos que lean.
  - Las pestañas de Jie no se tocan.

| Pestaña (sheetId) | Qué es | Quién la llena |
|---|---|---|
| **STOCK** (910031) | La vista: STOCK HOY (venta, pedidos esperando stock, libre, en camino, sin fecha, cobertura, % despachado, días sin dato de Jie) · ENCARGOS Y EMPAQUE (encargos vencidos, bolsas y manuales con días de cobertura) · PAGOS A JIE (venta semanal y lo atrasado, en USD). Abajo, un día por fila. Alertas por color. | Nadie: son fórmulas |
| **STOCK supuestos** (910006) | Días de fábrica, días extra, cada cuántos días se pide, mínimo, costo, umbrales, Año Nuevo Chino | Martin |
| **STOCK registro** (910005) | Lo que dicen Jie o Kevin: fecha · producto · en bodega · le faltan · bolsas · manuales · nota | **Karla** |
| **STOCK encargos** (910003) | Cada encargo: fecha, cantidad, llega (estimado), llegó, cantidad que llegó, quién, pagó, frase textual | **Karla** |
| **STOCK datos** (910004) | Vendidas y despachadas por día y producto | n8n, solo, cada día |

- **Flujo diario:** `[ALEGRES] Stock: actualizar ventas y despachos en el Sheet (diario)`, id `TNCzkwsPOnOJUXdJ`. Corre a las 07:30 Chile (también hay una pasada de noche), reescribe desde el 1-nov y usa la función de Supabase `ops_alegres_stock_por_dia(p_desde)`. El 20-nov estaba funcionando.
- **Recordatorio del Año Nuevo Chino** (6-feb-2027; la fábrica va lenta del 15-ene al 15-mar): a Slack #suppliers el 15-dic y el 2-ene, flujo `6DBSZr5giYTGe249`.
- Credencial de Google Sheets en n8n: «ECOMHILL» `fHwseZIkYDeI8FkV`. El Sheet está en español de México (separador `,`).

## Cómo calcula
- **Venta por día:** el promedio de 7 días. Si el de 3 días es más de 15 % mayor, se usa el de 3. Los días futuros usan ese número (en cursiva gris).
- **Despachadas:** de lo vendido cada día, cuántas unidades ya tienen el primer escaneo del courier. Se pinta rojo si a los 6 días salió menos del 80 %.
- **Stock en vivo:** el día anterior + lo que entra − lo vendido. Si ese día hay dato de Jie, parte del dato: «le faltan X» resta X; «en bodega X» da X menos lo vendido sin despachar.
- **Lo que entra:** los encargos de férulas, por fecha de llegada (o la estimada). **Lo que no tiene fecha no entra a la proyección hasta que Karla la anote.**
- **Cuánto pedir:** venta × (días de fábrica + días extra + cada cuántos días se pide) − (stock hoy + lo que entra), redondeado a 100, con un mínimo de 200.

## La rutina de Karla con el stock
1. **Cada vez que Jie o Kevin dicen algo** de cantidades o fechas, en WeChat o WhatsApp, se anota en «STOCK registro» o en «STOCK encargos» con la frase textual.
2. **Una vez al día**, mirar la caja STOCK HOY:
   - **Rojo en «% despachado»**: Jie no está despachando. Hay que preguntarle en el grupo cuándo salen.
   - **Rojo en «días sin dato de Jie»**: hace días que no sabemos cuántas tiene. Hay que pedirle el conteo.
   - **Encargo vencido**: pasó la fecha de llegada y no se marcó «llegó». Preguntar a Kevin o a Jie.
   - **Cobertura baja** (pocos días de stock): avisarle a Martin con el número de «cuánto pedir».
3. Si pasa algo grande (no llega un lote, Kevin no tiene), va a la lista de Karla con el área **Stock** y a Martin solo la decisión.

## Cómo se conecta con servicio al cliente
- Si AlbaMed se atrasa por falta de stock, las clientas escriben. El molde aprobado es `20-CASOS/2026-11-17-albamed-atraso-stock.md`: AlbaMed tiene tanto éxito que va con unos días de retraso. **Nunca** «sin stock», «agotado» ni «fabricando».
- Los correos con motivo «AlbaMed sin stock» se quedan para una persona hasta que exista el molde nuevo que pidió Martin (20-nov). Ver `EN-QUE-ESTAMOS.md`.
- El lote de 1.500 con **bolsa QuietLab** (de otro cliente, con instrucciones en inglés) necesita un aviso a la clienta con el manual en español en PDF. Esa propuesta espera el OK de Martin.

## Reglas
- **No regenerar las pestañas** con los scripts de `scripts/`, porque se pierde lo que Karla anotó. Los cambios se hacen editando el Sheet. Los scripts quedan solo como referencia de cómo se armó.
- La vista STOCK llega hasta el 31-dic: hay que extenderla antes de fin de año.
- No hay avisos automáticos a Slack todavía. Las reglas están por definir con Martin.
- La página vieja de Notion «📦 Stock en bodega de Jie» y el flujo `otIQ0Q7plk23X4Yb` se retiran cuando el Sheet funcione solo, pidiendo el OK antes.

## Lo que se sabía el 17 y 18-nov (actualizar con lo nuevo)
- **Plan de AlbaMed acordado el 17-nov.** Jie, a las 23:15: «placing our orders today in line with this plan».

| Lote | Cubre las ventas de | Estado el 18-nov |
|---|---|---|
| 1.400 con bolsa nuestra + manual | lo atrasado hasta el 17-nov | Kevin las mandaba el 17, llegaban ~19; Jie: todo despachado a más tardar el 20-nov |
| 600 con nuestras últimas bolsas + manuales | ventas del 18 al 20-nov | encargadas, sin fecha |
| 1.500 con bolsa QuietLab | ventas del 21 al 27-nov | encargadas, sin fecha |
| 5.000 bolsas (USD 1.030) + 5.000 manuales (USD 251) | stock en la fábrica de Kevin | 8 a 10 días corridos, del 26 al 28-nov |

- **Costo de fábrica de AlbaMed:** 3,70 / 3,60 / 3,45 USD (100 / 200 / 300 unidades, incluye estuche y cepillo) + bolsa ~0,21 + manual 0,05.
- **Tiempos normales** (oct-nov): a los 5 días sale el 29 % de las AlbaMed y el 66 % de las VisionPure; a los 8 días, el 98 % y el 93 %.
- **Venta reciente** (Supabase, 20-nov): AlbaMed ~240 al día entre el 15 y el 17-nov y 167 el 18; VisionPure ~150 al día.
  - Despachadas al 20-nov: casi nada de AlbaMed desde el 15-nov.
  - Normal sería que salga ~30 % a los 5 días, así que el atraso del lote de 1.400 se ve en los datos. Hay que confirmar con Jie que cumplió lo del 20-nov.
