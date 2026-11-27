# El sistema del SAC de Alegres (n8n + Supabase)

*El mapa vivo del motor: qué pieza hace qué, cuánto confío en ella y dónde va cada cosa que aprendemos.
Última revisión: 16-nov-2026. Si cambia una pieza, se actualiza aquí en el mismo momento.*

## El recorrido de un correo

| # | Paso | Pieza | Confianza | Nota |
|---|---|---|---|---|
| 1 | Entra el correo | n8n «WF-Gmail Live Alegres» `KmEy2p8U3voUhmEJ` → tabla `correos` | ✅ alta | corre en vivo; último correo hace minutos |
| 2 | Se clasifica el motivo | n8n «WF-Clasificar v2 Alegres» `4mU2pGrdEwRB45mJ` → `interacciones` | ✅ alta | taxonomía de salud; freno de gravedad |
| 3 | Se arma la ficha | Supabase `ops_alegres_ficha(correo o pedido)` | 🟡 nueva (16-nov) | todos los pedidos, correos, respuestas, gestiones con Jie y rastreo de la persona. Hoy la uso yo; falta pasársela al redactor |
| 4a | Dónde está mi pedido | Supabase `ops_alegres_plantilla_rpc` (plantilla de Mariana, sin IA) | ✅ alta | la única que sale sola. Aprobada por Martin |
| 4b | Todo lo demás | n8n «WF-R1» `rcQyVDE8i8IzkNJz`, nodo «Redactar IA» (Haiku) con el guion de `sac_bot_guiones` | 🟡 en prueba (16-nov) | desde hoy usa los guiones del motor (19 motivos). Antes usaba los de Lorentina |
| 5 | Freno de voz | Supabase trigger `ops_alegres_frenar_envio` → `ops_alegres_revisor` | ✅ alta | devuelve a revisión todo lo que rompe una regla. Copia del revisor de Python |
| 6 | Aprobación | Martin en esta sesión → `sac_respuestas.estado = en_cola` | ✅ | hoy caso por caso; la meta es aprobar por molde |
| 7 | Envío | n8n «WF-R2 Alegres» `I7URIzqkTJWqnQ07`, cada 3 min | ✅ alta | |
| 8 | Respuestas hechas a mano en Gmail | n8n «WF-E2 Alegres» `nfUaNZmA64KVIqP2` | ✅ | las concilia solas |
| 9 | Gestiones con Jie | tabla `ops_alegres_gestiones_jie` + tarea del Mac «mensaje-diario-jie» (19:30) = puente del WhatsApp | 🟡 | el servidor de n8n no puede leer el WhatsApp (es personal, solo la base del Mac). La tarea marca jie_hecho / jie_no_puede. Desde el 16-nov ya NO escribe correos a clientas |
| 9b | Encolar al confirmar Jie | trigger `ops_alegres_al_confirmar_jie` + tabla `ops_alegres_envio_al_confirmar` | 🟡 nuevo (16-nov), probado con reversa | cuando una gestión pasa a jie_hecho, encola el correo que Martin aprobó, con el saludo según la hora (`ops_alegres_saludo_hora`) |
| 9c | Quién sale solo | n8n «WF-R3 Auto-responder» `jELGS5KDo4Wl89QV` + `sac_policies` (por motivo) | ✅ | promueve a la cola lo marcado como seguro de los motivos en auto_enviar. Desde el 16-nov solo `consulta_estado` (la plantilla); el resto en solo_borrador. Respaldo de cómo estaba en `ops_alegres_func_bak` |
| 10 | Rastreo | n8n «WF-C ParcelPanel Alegres v4» `0sSk7eOBAsodUjvv` | ✅ | |

Piezas de Carlos que NO se usan en Alegres: el panel con su Bandeja, el cierre del día por
Telegram y el monitor de salud (los dos últimos están apagados).

## Por dónde se empieza cada vez
- `select * from ops_alegres_cola_urgencia` = los casos de clientas reales que esperan, ordenados por urgencia (legal, salud, piden plata, horas esperando, mensajes sin respuesta). Excluye lo que espera a Jie.
- `select ops_alegres_ficha(p_order => '…')` = todo lo de esa persona antes de proponer.
- Plazos medidos (`ops_alegres_config`): llegada desde la compra 18 días (MX y ES); reenvío desde la salida 11 días MX y 13 ES.

## Dónde va cada cosa que aprendemos

| Si Martin corrige… | Se cambia en | Y se carga en el sistema con |
|---|---|---|
| la voz (una frase, una palabra) | `00-REGLAS/voz.md` | `scripts/compilar_guiones.py` → guiones del redactor. Si se puede chequear: `scripts/revisar_borrador.py` **y** `ops_alegres_revisor` (las dos iguales) |
| qué solución dar | `00-REGLAS/soluciones.md` | `compilar_guiones.py` |
| qué hacer en un tipo de caso | `10-FLUJOS/guiones-por-motivo.md` | `compilar_guiones.py` |
| un caso aprobado | `20-CASOS/AAAA-MM-DD-nombre.md` (molde) | `compilar_guiones.py` (los moldes entran al prompt) |
| la plantilla de estado | función `ops_alegres_borrador_estado` (respaldo en `ops_alegres_func_bak`) | directo en Supabase |
| un plazo (días de llegada) | `ops_alegres_config` (`dias_llegada_mx`, `dias_llegada_es`) | lo leen la plantilla y la ficha |

**Cómo se carga el compilado:** cada parte vive por separado en `ops_alegres_guion_partes` (plantilla, general, voz, soluciones,
moldes, motivo:<x>) con su huella. `python3 scripts/compilar_guiones.py --partes` muestra la huella local de cada parte; se compara con
la tabla y se suben solo las que cambiaron: `SALIDA=<carpeta> python3 scripts/compilar_guiones.py voz soluciones` escribe el .sql
con esas partes más `select ops_alegres_compilar_guiones('<huella>')`, que rearma los 19 guiones. Se ejecuta con el conector de
Supabase. La huella total queda en `sac_bot_guiones.nota` («fuente:…»).

**Respaldo:** los guiones anteriores (de Carlos, adaptados de Lorentina) están en `sac_bot_guiones_bak_20261113`.

## Control (que siempre esté la última versión)
Cada vez que se trabaja en el motor:
1. La huella local es igual a la de `sac_bot_guiones.nota`.
2. `ops_alegres_revisor` tiene las mismas reglas que `revisar_borrador.py`.
3. Sin errores en las ejecuciones de R1, R2 y el clasificador del día.
4. Los borradores nuevos pasan el revisor (si muchos fallan, el guion de ese motivo necesita ajuste).

## Lo que falta (en orden)
1. **Leer la confirmación de Jie y encolar el molde aprobado** (cambios de dirección): primero el motor, después en n8n.
2. **Aprobar por molde, no por caso:** la vista `ops_alegres_madurez_moldes` mide por motivo cuántos borradores salieron sin
   corrección. Con 10 o más enviados y 90 % o más sin cambio, se le propone a Martin que ese motivo salga solo: `sac_policies` a
   auto_enviar y, en R1, dejar pasar ese motivo (hoy la llave `GUIONES_NUEVOS_ACTIVOS` es una sola para todos: cambiarla por una
   lista de motivos el día que el primero esté listo).
3. **Pasarle al redactor la ficha, la fecha de llegada y la hora de México** (hoy no las tiene: no puede poner fecha ni saludo exacto).
4. Moldes para «no llegó / aduana» y «producto equivocado», que son los de más plata.

## País del pedido (17-nov)
- `ops_alegres_pais(pedido)`: el país de Shopify (`ops_alegres_pedido_extra.pais`); si no está, lo deduce del rastreo (Colombia, Perú, Uruguay, España); si no, MX.
- Columna `pais` en `ops_alegres_cola_urgencia`, `ops_alegres_cola_escenarios` y en la ficha. Hoy la cola tiene 439 MX, 42 ES y 3 CO.
- Ojo: `pedido_extra` está atrasado desde el 14-nov; un pedido nuevo de otro país sin rastreo aparece como MX.

## Por qué se devuelven los pedidos (17-nov, 51 devueltos desde el 1-sep, ~1 % de los pedidos)
- 17 (33 %): J&T marcó «dirección incompleta o incorrecta».
- 4: la clienta lo rechazó.
- 30: J&T no da motivo (en promedio, 4 visitas en 7 días).
- Ninguna clienta nos escribió antes de que se devolviera.
- Cuando J&T marca «dirección incompleta», 15 de 35 se devuelven y 14 se entregan. Desde esa alerta hasta la devolución pasan 4,3 días: es la ventana para rescatarlo.
- «Destinatario no contesta»: 17 de 17 se entregaron (no hace falta intervenir).

## Pedido con datos completos (calibrado el 17-nov con 51 devueltos y 200 entregados)
- n8n `eaDp1UfPIdS79JMJ` «[SAC] Calibrar direcciones completas (solo lectura)»: lee la dirección de Shopify y devuelve solo qué falta, nunca la dirección.
- Cuánto aparece cada falla en los devueltos y en los entregados:

  | Falla | Devueltos | Entregados |
  |---|---|---|
  | Calle muy corta (menos de 8 letras) | 12 % | 1 % |
  | Código postal que no cuadra con el estado | 16 % | 2,5 % |
  | Sin teléfono | 18 % | 6 % |
  | Sin número | 16 % | 8,5 % |
  | Sin colonia | 37 % | 23,5 % |
  | Sin referencias | 14 % | 15,5 % |

  El apellido nunca falta.
- La regla «falta un dato» (calle corta, CP que no cuadra, sin teléfono o sin número) marca al 41 % de los devueltos y al 16 % de los entregados. Eso son unos 10 correos al día.
- La colonia y las referencias no mueven la aguja. Solo se piden si ya se va a escribir por otro dato.
- Moldes en borrador (pasan el revisor y esperan el OK de Martin): A, «falta un dato» al comprar; B, rescate cuando J&T no encuentra el domicilio.

## Una sola conversación abierta por persona (18-nov)
El trigger `trg_ops_alegres_una_por_persona` en `sac_respuestas` deja abierta solo la conversación del mensaje más nuevo de cada persona. Las más viejas se cierran solas y quedan respaldadas en `ops_alegres_cierres_dedupe`.
No se cierran las que tienen un correo esperando a Jie o un reembolso.
Causa: el redactor procesaba correos viejos de personas que ya tenían una conversación abierta.

## Ediciones de Karla
(Cuando Karla edita un correo antes de mandarlo, aquí queda qué cambió, para aprender sus correcciones.)

## La lista de Karla corre en n8n (18-nov)
- **K1** `rHpYk2gKiCz8878d`, cada 10 minutos: encola los correos que Karla marcó ✔ Enviar. Pasan por `ops_alegres_encolar_aprobado`, que aplica el revisor y el saludo; las ediciones de Karla quedan en `ops_alegres_ediciones_karla`.
- **K2** `L9rGB3s6LcpLRK3c`, cada 15 minutos: procesa las marcas ✅ y ✖️ de Karla con `ops_alegres_karla_marco`.
  - ✅ en «Mandar» → la gestión pasa a enviado.
  - ✅ con la guía o la respuesta de Jie → jie_hecho, y el correo a la clienta sale solo.
  - Reembolso → se verifica en Shopify.
  - ✖️ → aviso a Martin por Slack.
- **K3** `ZJQ4PppFeHDNRHEb`, cada hora a los :30: compara `ops_alegres_tareas_karla_obj()` con Notion. Crea, actualiza («Esperando» → «Recordarle» a los 2 días) y archiva lo cerrado. Cada fila queda ligada por «Ref motor»:
  - g:id para las gestiones;
  - r:pedido para los reembolsos;
  - s:sac_respuesta|mensaje para los borradores de correo.
  - **Arreglo del 19-nov (tareas duplicadas que vio Karla):** Karla a veces archiva la fila a mano, sin marcar ✅, después de mandar el mensaje al grupo. K2 no veía esa fila y la gestión quedaba igual, así que K3 creaba otra a la hora siguiente. Además, K3 leía solo las primeras 100 filas. Ahora K3 lee todas las páginas, deja una sola fila viva por «Ref motor» (archiva las repetidas) y, si Karla archivó a mano algo que sigue pendiente, le desarchiva la misma fila con una nota que le explica que marque ✅ Hecha. Nunca crea otra.
  - **Corrección del 19-nov, noche:** Karla nunca usa «Estado ✅»: su «listo» es el visto de Archivar («le doy al lado y ya ✅»). Desde el 17-nov ninguna fila tuvo ✅ Hecha, y 64 se archivaron así. Lo que avanza la gestión es lo que ella manda al grupo, que se detecta por WhatsApp, no el Notion. Por eso K3 ya no le devuelve una tarea que ella archivó: si es la misma tarea, la deja archivada; si el paso nuevo es solo esperar (👀), la actualiza sin sacarla del archivo; y solo la saca del archivo con «Paso nuevo: …» cuando le toca algo distinto (por ejemplo, «Recordarle a Megafulfill»). Regla de diseño: adaptarse a lo que Karla hace, no pedirle otro gesto.
  - **19-nov:** la columna «✔ Enviar» quedó sin nombre cuando agregaron columnas en Notion (Área, Vence, Link) y K1 falló cada 10 minutos. Se le devolvió el nombre. Si K1 vuelve a fallar con «Could not find property», revisar primero los nombres de las columnas.
- Las tareas de Claude `motor-sac` y `enviar-aprobados-karla` quedaron apagadas. A `mensaje-diario-jie` se le quitó la escritura en Notion: no se pudo apagar.
- Karla es el puente con Jie: pega la respuesta o la guía en «Prueba». Ya no dependemos del WhatsApp del Mac.

## Correos que el motor deja listos para Karla (20-nov)
- **Por qué existe:** hasta el 19-nov, ningún correo llegaba al Notion de Karla. El filtro solo tomaba los borradores marcados «se puede responder», y esos ya salían solos. A la vez, cuando Jie confirmaba un cambio, a la clienta no le salía nada: 26 casos sin correo desde el 16-nov.
- **Cómo funciona:** `sac_respuestas.texto_para_karla` (más `para_karla_nota` y `para_karla_at`). Toda fila en `esperando_humano` con ese texto aparece en la lista de Karla como «Responder a la clienta: #…», con el texto listo. Lo arma `ops_alegres_tareas_karla`. Karla marca «✔ Enviar» y K1 lo encola tras pasar el revisor.
- **Paso automático «Jie confirmó → correo»:** `ops_alegres_preparar_confirmaciones(p_aplicar)`, que llama K3 cada hora (nodo «Preparar confirmaciones»).
  - Toma los cambios de dirección de México con `jie_hecho` en los últimos 10 días y sin correo después.
  - Arma el molde aprobado con 3 variantes: confirmación, confirmación con disculpa si esperó más de 3 días, o solo la buena noticia si ya le dijimos que lo retuvimos.
  - Usa la guía nueva de Jie o, si no viene, la del rastreo. Va sin fecha (regla 10) y pasa el revisor.
  - **Interruptor:** `ops_alegres_config.confirmaciones_karla_activo`. Encendido el 20-nov y **apagado el 24-nov por Martin**. Solo se vuelve a encender con su OK y ejemplos reales. Con `p_aplicar = false` es una prueba en seco.
  - **Arreglo del 24-nov:** `ops_alegres_clase_cambio(id de la gestión)` separa `cambio` (pidió cambiar o corregir su dirección), `dato` (completó un dato que pedimos con el molde A) y `duda`. Solo `cambio` arma el correo. Prueba: de los 40 correos del 24-nov, 39 son `dato` y 1 `cambio`; los 8 cambios reales aprobados dan `cambio`. De las 115 gestiones `cambio_direccion`: 19 cambio, 90 dato, 6 duda.
  - Tampoco se arma si la clienta volvió a escribir después del pedido, si la guía no tiene movimientos en nuestro rastreo o si la que se mueve es otra.
  - Resguardo (20-nov): si el último correo de la clienta ya tiene otra respuesta en el motor, queda como excepción (antes rompía la restricción única de `mensaje_id` y botaba el nodo de K3).
  - Excepciones (no arma nada): fuera de México, sin nombre claro, sin guía, o la clienta no escribió por correo.
- **K1 (20-nov):** ahora toma «✔ Enviar» aunque la fila esté archivada. **K3 (20-nov):** si Karla archiva un correo sin «✔ Enviar», vuelve con una nota; si escribió algo en «Nota Karla», se respeta el archivo.

## Scorecard EOS de Karla (20-nov, Martin vía sesión CEO)
Dos números semanales que se calculan solos. Son funciones de solo lectura en Supabase y la scorecard las lee cada mañana. Sábado y domingo no cuentan: `ops_alegres_dias_habiles(desde, hasta)` cuenta lunes a viernes, hora de Ciudad de México, con decimales.
- **Gestiones con Jie colgando:** `ops_alegres_kpi_gestiones_colgadas()`. Devuelve el número, el desglose y el detalle por pedido. Meta ≤ 5.
  - Cuenta las gestiones en `por_enviar` desde `created_at` y las de `enviado` desde `enviado_at`, con más de 2 días hábiles.
  - Fuera del número: `jie_hecho` (el aviso a la clienta es del motor y de los moldes) y `esperando_dato` (espera a la clienta). El 20-nov daba 14.
- **Días desde el último conteo de Jie:** `ops_alegres_kpi_conteo_stock()`. Meta ≤ 2.
  - Lee `ops_alegres_kpi_stock`, que M1 llena cada mañana con la fecha del último conteo de AlbaMed en «STOCK registro» (nodos «Último conteo (KPI)» y «Guardar KPI en Supabase»).
  - Si M1 no corre, el campo `ojo` lo avisa. El 20-nov daba 2,7 (último conteo: 17-nov).
- **Cómo llegan a la scorecard:** `ops_alegres_kpi_karla()` (solo los dos números, sin pedidos) → webhook n8n `x7eMb0NOMG7wVMVi` → `scripts/kpi_karla_scorecard.py`, que corre en `~/log-diario/correr.sh` (launchd 07:00, Mac de Martin). Escribe `gestiones_jie` y `conteo_stock` en `~/log-diario/scorecard.json` del viernes de la semana. Si falla o el dato tiene más de 36 h, escribe «⚠️ sin dato» o «⚠️ dato viejo»; nunca un número viejo. La dirección del webhook está solo en el Mac de Martin (`~/log-diario/.kpi_karla_url`), no en el repo.
- **Ojo con `jie_respuesta_at`:** lo marcan las tareas de Claude en el Mac de Martin (`motor-sac` y `mensaje-diario-jie`), que leen el WhatsApp, o Karla con su marca en Notion (K2 → `ops_alegres_karla_marco`). Si el Mac está apagado y Karla no marca, las gestiones se quedan en `enviado` y el número sube aunque Jie haya respondido.
- `clienta_avisada_at` solo lo pone el trigger `ops_alegres_al_confirmar_jie`. Los correos que salen por la lista de Karla no lo marcan, así que «`jie_hecho` sin clienta avisada» está inflado (7 de los 14 cambios de dirección ya tienen correo).

## Lista «🤝 Megafulfill» de Karla (20-nov)
- **Notion:** `collection://41ee3bfc-6a93-81b8-9dd8-000bb77181fe` (db `41ee3bfc6a9381ccb0cdc253ecb5ff72`).
  - Ref: `c:<fecha>:<tipo>` (cobros), `st:<fecha>` (stock) y `p:<tema>` (pendientes).
- **Cobros mal hechos:** rama «Para Karla» del flujo `cM44xJ9zP4hzonjP`, que recibe el POST del control de Martin.
  - Entran: precio mal cobrado, regalo cobrado, reenvío cobrado como nuevo, pedido que no corresponde y pestaña nueva (salvo las STOCK).
  - Lo de plata no entra.
- **Seguimiento de AlbaMed:** M1 `oUURcRFeWw1vskWM`, 09:00 Chile.
  - Lee el Sheet (registro y encargos) y `ops_alegres_stock_por_dia`.
  - Arma un semáforo y el mensaje para Jie. Nunca sugiere pedidos ni pagos.

## Dato del molde A que no llegaba a Jie (27-nov, issue #2, arreglo de raíz)
- Nueva rama `dt:<pedido>` en `ops_alegres_tareas_karla`: la clienta respondió al molde A (`ops_alegres_datos_envio`, `correo_estado = 'enviado'`) en los últimos 14 días, el pedido sigue en `origen`, no hay gestión `cambio_direccion` y el hilo no está cerrado. Le aparece a Karla «Pasar a Jie el dato de la clienta: #…» con la respuesta, para que la pase al Sheet de Jie (o la archive si no trae el dato). Se excluyen los rebotes de correo (mailer-daemon y «** …»).
- Al encenderlo eran 22. Ojo: `ops_alegres_datos_envio.respondio_at` nunca se llena (0 de 172 respuestas); la regla mira los correos del hilo.
- Hallazgo aparte: algunos correos del molde A rebotan (dirección mala o bandeja llena), así que esa clienta nunca recibió el pedido de datos.

## Comentarios de los anuncios → Notion de Karla (27-nov, issue #3, solo lectura)
- Flujo `2jcmB4drgM1xhswR` «[SAC] Redes: comentarios de anuncios → Notion de Karla», cada 30 minutos (:10 y :40). Lee los anuncios activos de la cuenta JP2 `act_3066900430267301`, los comentarios de Facebook (también los ocultos) y de Instagram de las últimas 48 h, sin los de la propia página. Los guarda en `ops_alegres_redes_comentarios` (para no repetir) y crea una fila por comentario en «✅ Tareas de Karla» (Ref `rd:<id>`, con el enlace a Meta).
- No responde, no oculta y no manda privados. El flujo viejo de diagnóstico `Cxh26r6KdaCnJ55x` sigue apagado.
- Al encenderlo: 60 comentarios en 48 h (6 ocultos y 6 de Instagram). Meta no entrega el nombre de quien comenta; la fila muestra el comienzo del comentario.

## Roca R2: reporte semanal de Karla (20-nov, Martin: «r2 perfecta»)
- **Flujo** `cbTU6E1AG6yj5wOD`, con dos partes:
  - **viernes 09:00** crea en «🤝 Megafulfill» la fila «📊 Reporte semanal · <semana>» (Tipo «Reporte semanal», Ref `rs:<viernes>`, sin duplicar). En «Qué pasa» van los números de `ops_alegres_reporte_semanal(viernes)` (semana del viernes anterior al jueves) más los cobros mal hechos de la misma lista;
  - **viernes 18:05** revisa si Karla llenó «Qué pasó», «Qué está trabado» y «Qué necesito de Martin» y marcó el visto. Lo guarda en `ops_alegres_kpi_reporte` con `ops_alegres_kpi_guardar_reporte`.
- **Los números:**
  - stock: días sin conteo y AlbaMed de hace 6 días o más sin despachar;
  - cobros: nuevos, reclamados y abiertos;
  - reclamos cada 100 pedidos: pedidos con un correo de reclamo creado en la semana (motivos de queja) ÷ pedidos de la semana;
  - respuesta: % de correos de clientas respondidos en menos de 24 h y la mediana;
  - gestiones con Jie colgando.
- **Scorecard:** `ops_alegres_kpi_karla()` trae la historia y `scripts/kpi_karla_scorecard.py` escribe `reporte_karla` = «✅ N/8», «❌ 0/8 (falta …)» o «⏳ pendiente», desde el viernes 27-nov.
- Las 3 columnas nuevas las buscan los flujos por nombre: no se renombran. La fila de prueba del 20-nov quedó archivada con Ref `prueba:rs:2026-11-20`.

## Stock: lo que anota Karla en Notion → Sheet (20-nov)
- **M2** `4QIxYGwOpRnOnNC6`, cada 30 minutos (:05 y :35). Lee las filas de «🤝 Megafulfill» con «En el Sheet» sin marcar y algún número en «Jie: en bodega», «Jie: le faltan», «Llegaron: cantidad» o «Llegan: cantidad».
- Escribe en «STOCK registro» (conteo) y «STOCK encargos» (llegó: columnas E y F; llega: columna D; o una fila nueva). Llama a `ops_alegres_kpi_guardar_conteo` y marca «En el Sheet». Reglas en `40-STOCK/LEEME.md`.
- **Las columnas nuevas** («Jie: en bodega», «Jie: le faltan», «Llegaron: cantidad», «Llegaron: fecha», «Llegan: cantidad», «Llegan: fecha», «En el Sheet») las busca M2 por nombre: no se renombran.
- M1 ahora le explica a Karla qué campos llenar.

## Redes sociales (propuesta, 18-nov · nada encendido)
- El diagnóstico, el motor propuesto, las reglas, los moldes en borrador y las decisiones de Martin están en `30-PROPUESTAS/2026-11-18-redes/` (partir por `00-LEEME.md`).
- `scripts/revisar_redes.py` es el revisor de redes, en borrador hasta que Martin apruebe `03-reglas-redes.md`.
- En n8n ya existe el esqueleto: ingreso `3Z8FknSmYMNAnHT2` (hoy lee solo la página, no los anuncios), borradores `jPPTMOGAGaebsx5K` (apagado) y envío `RCVVyxA9GTUPfnUn`. El flujo de lectura de anuncios `Cxh26r6KdaCnJ55x` está apagado y solo escribe un resumen en `ops_alegres_diag`.
- Los anuncios salen de la cuenta JP2 y de las páginas «Revista Alquimia» y «Oftalmólogo - Dr Arturo Sánchez».
- Regla: no se responde, oculta ni manda nada por redes hasta que Martin apruebe los moldes y el paso de construcción correspondiente.

## Avisos automáticos de ParcelPanel a las clientas (27-nov)
- En Shopify → CWILL (Parcel Panel) → Settings → Shipping notifications, los avisos «Exception» y «Failed attempt» mostraban «Transportista: YunExpress» y «Contacto del transportista: 400-8575-500» (un teléfono de China), y pedían «contacta al transportista». Salían también cuando Jie cambiaba la etiqueta (733 correos en 14 días).
- Martin aprobó el cambio (27-nov): se sacaron el transportista y el teléfono (queda solo el número de seguimiento) y el texto dice que no tiene que hacer nada y que si hace falta un dato le escribimos. Los dos avisos («Exception» y «Failed attempt») se guardaron el 27-nov.
- ParcelPanel no deja saltarse solo las excepciones por cambio de etiqueta; las fallas reales de J&T las toma la alerta J&T (issue #5).
