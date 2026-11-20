# 02 · El motor de redes, propuesto · 18-nov-2026

La idea es que redes funcione **igual que el correo**: mismas reglas, mismo revisor, mismos moldes aprobados, la misma lista de Karla en Notion y la misma regla de que nada sale sin OK. Lo único que cambia es la entrada (un comentario o un mensaje privado) y la salida (una respuesta pública corta, un mensaje privado, o las dos).

## El recorrido de un comentario
1. **Entra.** Cada 15 minutos n8n lee los comentarios nuevos de todos los anuncios activos de Facebook e Instagram y los mensajes privados. Hoy lee solo las publicaciones normales, por eso no ve nada.
2. **Se limpia.** Los avisos «Facebook creó este chat…» y los comentarios de la propia página no cuentan como pendientes.
3. **Se clasifica** con los mismos motivos del correo, más los propios de redes (quiere comprar, cómo se paga, etiqueta a un amigo, insulto o spam).
4. **Se arma la ficha.** Si el comentario o el mensaje trae un número de pedido o un correo, se cruza con el pedido, el rastreo y el historial de correos de esa persona. Una persona, una sola conversación, escriba por donde escriba.
5. **Se elige el camino** (tabla de abajo).
6. **Se redacta con el molde** y pasa el revisor de redes. Con un ERROR no sigue.
7. **Karla aprueba** en su Notion, en la misma lista de siempre, con «✔ Enviar». Si quiere cambiar el texto, lo edita ahí.
8. **Sale** por el paso de envío que ya existe, y queda registrado quién aprobó, qué se respondió y si se ocultó algo.

## Los cuatro caminos
| Camino | Qué entra | Qué se hace | Quién aprueba |
|---|---|---|---|
| **A · Respuesta fija** | Precio, cómo comprar, cómo se paga, tiempo de entrega, comentario positivo | Respuesta pública con el molde, sin cambios | Al principio Karla con «✔ Enviar». Cuando un molde lleve 2 semanas sin correcciones, Martin decide si sale solo, como la plantilla de «¿dónde está mi pedido?» |
| **B · Respuesta con criterio** | Preguntas de salud, «¿es confiable?», no le funcionó, etiqueta Dr. Harryi | Respuesta pública corta y, si hace falta, mensaje privado | Karla, siempre |
| **C · Caso de pedido** | «Ya compré y no llega», «me llegó otra cosa», «quiero mi dinero» | Respuesta pública corta que invita al privado + mensaje privado que pide el número de pedido. Con el pedido en la mano, el caso entra al motor del correo con sus moldes de siempre | Karla. Plata, salud grave y legal siguen siendo de Martin |
| **D · Sin respuesta** | Etiquetas a amigos, emojis, bromas | No se responde. Hoy se les contesta a todos con una promoción, y se ve como spam | Nadie |

## Qué se oculta y qué no
- **Se oculta:** insultos, groserías, spam, enlaces de otros vendedores y datos personales que alguien publique.
- **No se oculta:** una pregunta, una duda de confianza, ni una queja de alguien que compró. Una queja con respuesta amable y concreta a la vista vende más que 70 comentarios ocultos, y la gente nota cuando se borran («fraudulentos y borran luego luego comentarios», escribió uno).
- **Nunca se oculta una queja de pedido sin abrir el caso.** Ocultar y atender van juntos.
- Antes de cambiar esto hay que saber quién oculta hoy (decisión 2 del LEEME).

## Los tiempos que manda Meta
- A un comentario se le puede mandar **un solo** mensaje privado, dentro de los 7 días. Si la persona contesta, se abre la conversación.
- En un mensaje privado se puede responder libre durante 24 horas desde el último mensaje de la persona, y hasta 7 días si responde una persona del equipo. Después ya no se puede escribir.
- Por eso redes necesita respuesta **el mismo día**. La lista de Karla va a mostrar primero lo que está por vencer.

## Qué ve Karla
En su página de Notion, una vista nueva «Redes para revisar», dentro de la misma lista de tareas:
- quién escribió y dónde (comentario de Facebook, comentario de Instagram o privado);
- qué dijo, y el anuncio donde lo dijo;
- el texto propuesto, que puede editar;
- «✔ Enviar» y «No responder»;
- cuánto falta para que venza.

Con ~34 comentarios al día, de los que cerca de la mitad no llevan respuesta, a Karla le quedarían unas 15 a 20 aprobaciones diarias mientras el camino A no salga solo, y unas 8 cuando salga solo.

## Qué hay que construir (nada de esto está hecho ni encendido)
| Pieza | Qué es | Estado |
|---|---|---|
| Ingreso de comentarios de anuncios | Cambiar el ingreso de Alegres para que lea los 204 anuncios activos y los de Instagram | Probado en modo lectura esta noche. Falta dejarlo fijo |
| Filtro de avisos de Facebook | Que «Facebook creó este chat…» no cuente como pendiente | Por hacer |
| Clasificador y ficha | Los mismos del correo, con los motivos de redes | Por hacer |
| Revisor de redes | `scripts/revisar_redes.py` | Hecho en borrador. Falta la copia en Supabase para que n8n lo use |
| Moldes | 10 escenarios, 13 textos | En borrador, pasan el revisor. Esperan tu corrección |
| Lista de Karla | Vista «Redes para revisar» + dos pasos de n8n iguales a los del correo | Por hacer |
| Envío | Ya existe y está encendido. Hay que probar la respuesta pública, el privado y el ocultar con un caso real antes de usarlo | Por probar, con tu OK |
| Puente al correo | Cuando llega el número de pedido por privado, el caso sigue con los moldes del correo y se responde por el privado | Por hacer |

**Orden que propongo:** primero el camino C (clientas con pedido, que es donde está el riesgo), después el A (ventas) y al final el B. El orden completo, con lo que necesita de ti cada paso, está en el LEEME.

## La raíz de cada escenario
| Escenario | Raíz | Dónde se arregla |
|---|---|---|
| «¿Pago al recibir u OXXO?» | La tienda solo acepta tarjeta y PayPal | Ventas: evaluar pago en OXXO desde el checkout. Decisión tuya |
| «¿Cuánto cuesta?» | El anuncio no dice el precio | Creativos: evaluar el precio en el texto del anuncio |
| «¿Es fraude?» | Comentarios de clientas sin atender a la vista, y otros ocultos | Este motor: atender el camino C |
| «No llega» | Lo mismo que en el correo | Ya se trabaja ahí (datos de envío, alerta de atraso) |
| «Dr. Harryi» | Lote con otra etiqueta | Jie: confirmar hasta cuándo sale ese lote y qué lista la etiqueta |
| «No me funcionó» | Uso sin constancia o mal aplicado | Guía y libro de regalo, ya en curso |
| Preguntas de salud | La página promete de más («frena cataratas») | Shopify y Creativos |
