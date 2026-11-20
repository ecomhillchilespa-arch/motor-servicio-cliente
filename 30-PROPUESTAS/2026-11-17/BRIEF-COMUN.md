# Brief común para analizar escenarios del SAC (17-nov-2026)

Eres analista del Motor de Servicio al Cliente de Alegres México (VisionPure: spray de luteína para los ojos; AlbaMed: férula antirronquidos).
Martin, el dueño, va a revisar mañana un escenario a la vez y corregir tu propuesta. Esta noche SOLO analizas y escribes.

## Prohibido
- Mandar correos, escribir en WhatsApp, hablar con Jie, Karla o una clienta.
- Escribir o modificar cualquier cosa en Supabase o n8n. Solo SELECT.
- Inventar datos. Si algo no se puede saber con los datos, escríbelo como pregunta.

## Lee primero, completos
- `/Users/martinzuniga/motor-servicio-cliente/00-REGLAS/voz.md`: las 13 reglas de voz. La 13 es la escalera de emociones.
- `/Users/martinzuniga/motor-servicio-cliente/00-REGLAS/soluciones.md`: el criterio de soluciones. El reembolso es la última opción.
- `/Users/martinzuniga/motor-servicio-cliente/00-REGLAS/copy-chief.md`: los principios para recuperar a una clienta molesta.
- `/Users/martinzuniga/motor-servicio-cliente/10-FLUJOS/flujos.md` y `/Users/martinzuniga/motor-servicio-cliente/10-FLUJOS/guiones-por-motivo.md`.
- Los moldes aprobados de `/Users/martinzuniga/motor-servicio-cliente/20-CASOS/` (los archivos con fecha). El ejemplo manda sobre la teoría.

## Datos (Supabase, proyecto `exgcnhoqkbjljvandhgq`; solo SELECT, con la herramienta execute_sql del conector de Supabase)
- `ops_alegres_cola_escenarios`: cada conversación que espera respuesta, con `escenario`, `pedido`, `horas_esperando`, `lo_que_pide`, `status_envio`, `etapa_actual`, etc. Filtra por tu escenario.
- `select ops_alegres_ficha(p_order => '12345')`: todo de una persona (pedidos, conversación completa, lo que le respondimos, gestiones con Jie, rastreo, fecha de llegada). Úsala para leer el historial completo antes de proponer. Si no hay pedido: `ops_alegres_ficha(p_email => '...')`.
- `ops_alegres_config`: `dias_llegada_mx` = 18 (desde la compra), `dias_reenvio_mx` = 11 y `dias_reenvio_es` = 13 (desde que sale de la bodega).
- Costos de un reenvío, con envío incluido:
  - VisionPure: 1 u USD 4,9 · 2 u 7,6 · 3 u 9,9 · 5 u 11,4.
  - AlbaMed: 1 u 7,2 · 2 u 12,5 · 3 u 18,2.
  - Precios de venta: $499 una unidad, $699 dos.
- `ordenes.monto_reembolsado` y `estado_financiero`: si ya hubo un reembolso.
- La tabla `disputas` NO sirve para Alegres: mezcla números de pedido de otra tienda. No la uses.

## Qué entregas: un archivo markdown por escenario, en la ruta que te indican, con este formato exacto
```
# Escenario · <nombre simple>

**Cuántos:** N conversaciones (última semana X · 8-30 días Y · más de 30 días Z). Pedidos: lista.

## Qué está pasando
3-4 líneas en español chileno simple, sin códigos. El patrón real, no el del clasificador.

## Lo que ya me enseñaste que aplica
Viñetas cortas con el número de regla (voz.md / soluciones.md / molde).

## Curso de acción que propongo
Pasos numerados: qué se le dice a la clienta, qué se le pide a Jie (si aplica), qué se cierra, cuánto cuesta (en USD) y cuándo sale el correo (ahora o al confirmar Jie).
Si hay sub-escenarios (por ejemplo, "en camino" vs "devuelto"), uno por sub-escenario, con cuántos casos tiene cada uno.

## Molde propuesto (uno por sub-escenario que lleve correo)
Un correo completo con un caso real como ejemplo (nombre de pila real, sin apellido ni datos personales).
Antes del correo, una línea: «Escalera: <escalón donde está> → <a dónde la llevamos>».
El correo tiene que pasar el revisor: guárdalo en un .txt y corre
`python3 /Users/martinzuniga/motor-servicio-cliente/scripts/revisar_borrador.py <archivo.txt> <mensaje_de_la_clienta.txt>`.
Corrige hasta que diga «OK, pasa todas las reglas» y pega esa salida debajo del correo.

## Casos que no calzan (excepciones)
Pedido y una línea de por qué no calza y qué propones para ese.

## Lo que necesito que decidas (máximo 2 preguntas, solo las que destraban)

## Qué se podría automatizar después
1-2 líneas.
```
Guarda los .txt de prueba en `/private/tmp/claude-501/-Users-martinzuniga-motor-servicio-cliente/b67253b7-bec7-4b0f-b205-40b18514fb1d/scratchpad/escenarios/`. Al terminar, responde en 5 líneas: qué archivos escribiste, cuántos casos miraste y lo más importante que encontraste.
