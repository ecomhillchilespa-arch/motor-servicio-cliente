# Criterio de soluciones

*Martin, 16-nov-2026: «la lógica siempre es ayudar al cliente, pero con el menor impacto económico en la empresa… o si no, el servicio al cliente va a matar el negocio». La meta es que nada escale a contracargo.*

## Orden para resolver
1. **Que la persona lo resuelva sola, con los pasos exactos.** Ejemplo: WhatsApp de J&T 55 7100 1047 con su guía JMX.
2. **Reenvío.** Lo pide Jie en el mensaje del día (ver CONEXIONES.md).
3. **Reembolso, la última opción: la que menos queremos** (Martin, 16-nov). Aunque la clienta lo pida, el primer correo ofrece el reenvío **y no nombra el reembolso**. Se escribe con buen copy para que elija el reenvío, que sale mucho más barato:
   - perdón sentido;
   - «revisamos tu caso y fue una excepción»;
   - le reenviamos con regalo y con la guía;
   - hechos que den confianza, no claims: qué hacemos, cuándo sale, que le llega el rastreo y la fecha de llegada (nunca «confía en nosotros», regla 13 de voz);
   - el molde de este tipo de correo se crea con el copy chief de servicio; después los correos usan el molde.
   Solo si responde que no quiere el reenvío, se le pide perdón de nuevo y el reembolso va sin demora.
   **Si falta información, primero se junta** (preguntarle a Jie, revisar el rastreo) y recién ahí se decide. Reembolsar es lo último.
   **Nunca se escribe «ya está tu reembolso» ni «ya cancelamos» antes de que la devolución esté registrada en Shopify** (Martin, 17-nov: el bot viejo lo escribió a 6 clientas sin hacerlo). El freno de Supabase lo bloquea.
   Reembolso: Claude **no ejecuta reembolsos**: los hace Martin o Karla en Shopify o en la pasarela, con el OK explícito de Martin para cada caso.

Siempre propone Claude la solución de cada caso. Martin aprueba o da contexto: no se le deja la decisión abierta.

## Reglas fijas
- **Error nuestro no es regalo automático.** Se evalúa según cuánto lleva esperando la clienta y si viene tranquila o furiosa.
- **Regalos:** una unidad extra cuesta poco y se da. Nunca se pide devolver frascos y se presenta como generosidad.
- **Producto roto:** se pide una foto como prueba y después se reenvía.
- **Dr. Harryi:** es el mismo VisionPure, con la etiqueta del laboratorio.
- **Precios:** no hay OXXO ni pago contra entrega. $499 = 1 unidad, $699 = 2 unidades.
- **Cambio de dirección:** solo se puede antes de que el paquete salga de China. Primero se revisa la etapa en `ordenes.etapa_actual`: si es `origen`, se pide a Jie. Si ya salió, se le dice la verdad a la clienta y se ve la opción (J&T, recibir en la otra dirección, o reenvío si se devuelve). **Nunca se confirma un cambio que Jie no hizo**, y a la clienta no se le escribe hasta que Jie lo confirme (Martin, 16-nov). El texto aprobado queda guardado y se encola cuando llega la confirmación.
- **Lo que dijo Jie (17-nov):** la dirección se puede cambiar mientras el pedido no haya salido, aunque ya tenga la etiqueta impresa. Las notas del pedido en Shopify NO le llegan al repartidor: nunca prometer «que te llamen antes de entregar». Lo único que llega es lo que va en la dirección, incluido el teléfono.
- **Antes de proponer:** leer el historial completo de la persona (todos sus correos, lo que se le prometió y el rastreo). Juntar toda la información posible: preguntar a Jie, revisar el rastreo y Shopify. Recién ahí se contesta (lección del caso #10596).

## Lo que cuestan los errores (para decidir)
Reenvío a precio acordado con Jie, envío incluido: VisionPure 1/2/3/5 u = USD 4,9 / 7,6 / 9,9 / 11,4 · AlbaMed 1/2/3 u = USD 7,2 / 12,5 / 18,2. España: + el impuesto o el precio del canal con impuesto incluido. Ejemplo: reenviar 2 VisionPure en México cuesta ~USD 7,6.


## Reembolsos: muy justificados, nunca por defecto (Martin, 17-nov)
«Soy bien corto con las devoluciones. Me da miedo que de repente un día devolvamos mucho.»
- **Antes de proponer un reembolso se entiende el caso:**
  - qué dijo exactamente;
  - cómo lo está usando;
  - si tiene lógica.

  Hay gente malintencionada que escribe cualquier cosa para recuperar la plata. Un spray que va sobre el párpado cerrado no tiene cómo «empeorar la vista».
- **Primero se pide información o evidencia:**
  - cómo lo aplica;
  - una foto;
  - desde cuándo le pasa.

  Lo mismo que con J&T: mejor tener la información antes de decidir.
- Si después de eso se justifica (no lo puede usar de verdad, y lo dijo con detalle), recién se propone el reembolso, caso por caso y con el porqué.
- **Solo se trabajan los casos en que la clienta habló última.** Si el último mensaje es nuestro, ya se respondió y no hay nada que hacer.
- **VisionPure:** nunca se aplica directo al ojo. Va sobre el párpado cerrado. Hay que decirlo siempre en las respuestas de uso.
- **Antes de cualquier devolución, ayudarla a que le funcione** (Martin, 17-nov): «la persona no logró tener éxito con el producto, a veces no sabe usarlo». El correo es un seguimiento del tipo «nos gustaría que ahora te funcione». Se le dice cómo usarlo, con qué constancia y las recomendaciones de la guía o del libro de regalo (VisionPure-Protocolo-4-Semanas, AlbaMed-Protocolo-30-Noches). Mucha gente que tira el comentario, si se la ayuda bien, termina contenta o deja de escribir porque ve que no hay fraude.
- **Casos muy antiguos sin movimiento** (más de 2 meses, sin escribir de nuevo): se cierran, no se revuelven (Martin, 17-nov, caso 5866).
