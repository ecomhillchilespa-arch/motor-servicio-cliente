# Motor de Servicio al Cliente — Alegres México

Atiende los correos de las clientas de Alegres México (VisionPure y AlbaMed) con la voz de Mariana. Gestiona con Jie lo que hace falta para resolverlos y avisa a cada área solo lo que le toca. Se opera con Codex desde esta carpeta.

## Lo primero, siempre
1. Lee `00-REGLAS/voz.md` y `00-REGLAS/soluciones.md` **antes de escribir cualquier cosa para una clienta**.
2. Todo borrador pasa por el revisor antes de mostrarlo: `python3 scripts/revisar_borrador.py borrador.txt mensaje_clienta.txt`. Con un ERROR no se le muestra a Martin.
3. Antes de proponer, lee el historial completo de la persona (todos sus correos, lo prometido y el rastreo).

## Mentalidad (Martin, 16-nov)
Se arma el sistema, no se atiende caso a caso. Por cada tipo de caso: 1 o 2 ejemplos para calibrar el molde con Martin → molde aprobado en `20-CASOS/` → se aplica en lote (y se automatiza lo que se pueda). A Martin se le muestran solo las excepciones y las decisiones.

## Mapa de la carpeta
| | |
|---|---|
| `00-REGLAS/` | voz (las 12 reglas con ejemplos) y criterio de soluciones |
| `10-FLUJOS/` | qué hacer en cada tipo de caso, paso a paso |
| `20-CASOS/` | casos aprobados por Martin (el ejemplo manda sobre la teoría) |
| `CONEXIONES.md` | cómo habla con Jie, Karla, Martin, el control, Finanzas y Shopify |
| `scripts/revisar_borrador.py` | el revisor automático de borradores |
| `SISTEMA.md` | **el mapa del sistema en n8n/Supabase**: cada pieza, su confianza y dónde va cada cosa que se aprende |
| `scripts/compilar_guiones.py` | compila voz + soluciones + guiones + moldes en los guiones del redactor IA (WF-R1) |

## Dónde vive cada cosa (sistemas)
- **Supabase SAC** `exgcnhoqkbjljvandhgq`, Alegres store_id `a7888bc0-222a-4b44-a330-62ed410077c1`:
  - `correos`: los mensajes;
  - `sac_respuestas`: la cola de respuestas (`esperando_humano` → `en_cola` → `enviado`);
  - `ordenes` y `tracking_eventos`: la etapa y el rastreo;
  - `ops_alegres_gestiones_jie`: el seguimiento con Jie;
  - `ops_alegres_config`: `dias_llegada_mx` = 18.
- **Para enviar una respuesta aprobada:** actualizar su fila de `sac_respuestas` con `texto_enviado`, `mensaje_id` = el último mensaje de la clienta, `estado` = 'en_cola', `origen_envio` = 'humano' y `editado_bool` = true. Lo envía WF-R2 (`I7URIzqkTJWqnQ07`) cada 3 minutos. Antes de encolar, el texto pasa el revisor.
- **n8n:**
  - WF-R1 `rcQyVDE8i8IzkNJz` redacta. Solo sale sola la plantilla de "¿dónde está mi pedido?". Los cambios de datos, las cancelaciones y las preguntas de producto pasan siempre por una persona.
  - El webhook `mensaje-suppliers` publica texto en Slack #suppliers.
- **WhatsApp**, solo lectura: `~/Library/Group Containers/group.net.whatsapp.WhatsApp.shared/ChatStorage.sqlite` (abrir con mode=ro). Grupo Alegres Store `120363224787040227@g.us` (miembro 1375 = Jie, 1343 = Karla).
- **Tareas programadas:** «mensaje-diario-jie» (19:30) y «control-semanal-megafulfill» (10:00, de la otra sesión).

## Reglas duras
- Nada sale hacia afuera (clienta, Jie, Karla) sin OK. Desde el 18-nov, los correos de moldes aprobados los aprueba Karla con «✔ Enviar» en su Notion; los moldes nuevos, la plata, la salud y lo legal siguen siendo de Martin. Nada de reembolsos ni de mover plata.
- Todo lo que se le muestra a Martin o a Karla trae una acción concreta. Lo que solo es esperar lo monitorea el motor.
- A Martin se le habla en español chileno simple, sin códigos ni inglés. Los mensajes van a Slack, listos para copiar, nunca en Excel.
- Datos de clientas: privados. En reportes, solo el número de pedido.
- Cuando Martin corrige algo, se escribe en `00-REGLAS/voz.md` (y en el revisor si se puede chequear, el de Python y `ops_alegres_revisor`) **en el momento**, el caso queda en `20-CASOS/` y se recompilan los guiones (ver `SISTEMA.md`).
