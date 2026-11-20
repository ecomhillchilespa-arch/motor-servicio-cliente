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
- **Karla**: anota en el Sheet lo que dicen Jie y Kevin, pide el conteo y avisa cuando algo no calza.
- **Encargar a la fábrica lo resuelve Jie**, que cobra cuando despacha. No es una decisión ni un pago de Martin (Martin, 18-nov).

## Regla dura
**Ni el Sheet ni Claude le sugieren a Martin pedidos ni montos a pagar.** Antes de marcarle algo como decisión, revisar lo que ya está acordado. Los pagos los hace Martin solo como última opción, y nunca se le propone pagar sin preguntarle. Los mensajes a Jie y a Kevin los mandan Martin o Karla, nunca Claude, con tono de socio que pide ayuda. Con los proveedores chinos todo se negocia: se pide cotización, nunca se encarga de entrada.

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
| **STOCK** (910031) | La vista: STOCK HOY (venta, pedidos esperando stock, libre, en camino, sin fecha, cobertura, % despachado, días sin dato de Jie) · ENCARGOS Y EMPAQUE (encargos con llegada vencida, bolsas y manuales con los días que alcanzan) · PAGOS A JIE (venta semanal y lo atrasado, en USD a precio aproximado). Abajo, un día por fila. Alertas por color. **No tiene «cuánto pedir» ni costo de pedido**: se sacó el 18-nov. | Nadie: son fórmulas |
| **STOCK supuestos** (910006) | Días de fábrica, días extra, cada cuántos días se pide, mínimo, costo, umbrales, Año Nuevo Chino | Martin |
| **STOCK registro** (910005) | Lo que dicen Jie o Kevin: fecha · producto · en bodega · le faltan · bolsas · manuales · nota | **Karla** |
| **STOCK encargos** (910003, los datos parten en la fila 5) | Cada encargo: fecha, cantidad, llega (estimado), llegó, cantidad que llegó, quién, pagó, frase textual | **Karla** |
| **STOCK datos** (910004) | Vendidas y despachadas por día y producto | n8n, solo, cada día |

- **Flujo diario:** `[ALEGRES] Stock: actualizar ventas y despachos en el Sheet (diario)`, id `TNCzkwsPOnOJUXdJ`. Corre a las 00:10 y a las 07:10 Chile. Llena «STOCK datos», ajusta el alto de las filas con nota, reescribe desde el 1-nov y usa la función de Supabase `ops_alegres_stock_por_dia(p_desde)`. El 20-nov estaba funcionando.
- **Recordatorio del Año Nuevo Chino** (6-feb-2027; la fábrica va lenta del 15-ene al 15-mar): a Slack #suppliers el 15-dic y el 2-ene, flujo `6DBSZr5giYTGe249`.
- Credencial de Google Sheets en n8n: «ECOMHILL» `fHwseZIkYDeI8FkV`. El Sheet está en español de México (separador `,`).

- En «STOCK supuestos», B14:B15 tienen los precios aproximados (6,5 y 3,3 USD). **Jie y su equipo ven estas pestañas: nada de juicios ni notas internas ahí.**

## Cómo calcula
- **Venta por día:** el promedio de 7 días. Si el de 3 días es más de 15 % mayor, se usa el de 3. Los días futuros usan ese número (en cursiva gris).
- **Despachadas:** de lo vendido cada día, cuántas unidades ya tienen el primer escaneo del courier. Se pinta rojo si a los 6 días salió menos del 80 %.
- **Stock en vivo:** el día anterior + lo que entra − lo vendido. Si ese día hay dato de Jie, parte del dato: «le faltan X» resta X; «en bodega X» da X menos lo vendido sin despachar.
- **Lo que entra:** los encargos de férulas, por fecha de llegada (o la estimada). **Lo que no tiene fecha no entra a la proyección hasta que Karla la anote.**
## El motor de stock: la rutina diaria de Karla con su Claude
Karla le pide a su Claude «revisa el stock» y Claude hace esto:
1. **Lee las cajas de STOCK** y reporta solo lo que esté en rojo o amarillo.
2. **Revisa los encargos con llegada vencida** que no tienen «Llegó», y los días sin dato de Jie: más de 3 es amarillo y más de 5, rojo.
3. **Arma el mensaje del día para Jie o Kevin**, listo para pegar en WeChat: pedir el conteo, confirmar una llegada o pedir la fecha de los lotes que no tienen. Lo manda Karla.
4. **Cuando Karla pega la respuesta**, Claude la deja como fila en «STOCK registro» o «STOCK encargos», con la frase textual.

Además, Karla pide el conteo a Jie **cada 2 días**.

**A Martin se le escala solo** si:
- hay pedidos esperando stock y van creciendo;
- la cobertura queda bajo los días de fábrica más llegada (13 días);
- lo despachado de hace 6 a 12 días está bajo el 80 %;
- o aparece plata o un precio nuevo.

Se le pasa **como dato**, no como «decidí X» ni como «hay que pedir N».

**Regla de oro:** el Sheet es la memoria. Lo que se acuerde en WeChat y no quede ahí, no existe.

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
- **Lo que muestra el Sheet el 20-nov:**
  - Hay 2 encargos con llegada vencida; probablemente las 1.400, que llegaban el 19-nov, y otro, ninguno con «Llegó» anotado.
  - «STOCK registro» no tiene nada después del 17-nov (último conteo de Jie: le faltan 1.327).
  - Desde el 18-nov nadie anotó llegadas ni conteos.
  - **No se sabe si las 1.400 llegaron: hay que preguntarle a Jie.** No se deduce del Sheet.
  - Las tareas de stock de Karla (fechas de las 600 y las 1.500, conteo cada 2 días, anotar la llegada de las 1.400) no se ven hechas en el Sheet.
- No se sabe si el grupo de WeChat ya existe con Karla adentro. El 19-nov Karla bajó WeChat y tenía problemas con el código de verificación.
- **Venta reciente** (Supabase, 20-nov): AlbaMed ~240 al día entre el 15 y el 17-nov y 167 el 18; VisionPure ~150 al día.
  - Despachadas al 20-nov: casi nada de AlbaMed desde el 15-nov.
  - Normal sería que salga ~30 % a los 5 días, así que el atraso del lote de 1.400 se ve en los datos. Hay que confirmar con Jie que cumplió lo del 20-nov.
