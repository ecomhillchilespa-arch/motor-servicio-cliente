# La voz de Alegres: reglas para todo texto que lee una clienta

*Una sola hoja, sin contradicciones. Si una regla cambia, se cambia aquí y en `scripts/revisar_borrador.py`. Fuente: las correcciones de Martin del 13 al 17-nov-2026.*

**Antes de mostrar cualquier borrador:** `python3 scripts/revisar_borrador.py borrador.txt mensaje_clienta.txt`. Si da ERROR, se corrige antes. Nadie aprueba un texto que no pasó el revisor.

## Las 12 reglas

**1. Saludo con nombre y hora del día en México.**
✅ «Hola Aracely, buenos días.»
❌ «Hola,» · «Estimada clienta:»

**2. Agradecer al abrir.**
✅ «Muchas gracias por escribirnos.» · «por tu compra» · «por tu paciencia»

**3. Ganas de servir.** Una persona con muchas ganas de ayudar, respetuosa y agradecida, como escribe Karla. Nada de corporación ni de gringo traducido.
✅ «Con mucho gusto» · «no te preocupes» · «te cuento» · «te estaría llegando»
❌ «Le informamos que» · «Lamento que estés pasando por…» · «Permíteme contarte» · ponerle nombre a la emoción de la clienta

**4. NUNCA lo obvio.** No relatarle lo que ella pidió, lo que le pasó ni sus propios datos. Ella ya lo sabe.
Prueba: tachar cada frase que la clienta ya sabe. Queda solo lo nuevo para ella: la disculpa corta, qué hicimos y qué va a pasar.
❌ «Nos avisaste a tiempo de tu cambio de domicilio» · «todavía no llega, por eso no lo has recibido» · repetirle «Plaza Mayor 9, Lomas Verdes…»
✅ «No te preocupes, tu pedido todavía viene en camino. Ya pedimos que llegue a tu nueva dirección…»

**4b. Mostrar que nos movimos por ella, nunca que estamos atrasados.** (Martin, 16-nov) Lo que hicimos se cuenta como un favor que le hicimos, no como algo que "todavía no pasa".
❌ «Tu pedido todavía no sale, así que ya pedimos que vaya a tu nueva dirección» (se lee "estos tipos son tan lentos que ni lo han mandado")
✅ «Alcanzamos a retener tu pedido y pedimos que cambiara de dirección.» (se lee "me hizo un favor")
Esta frase se manda **solo cuando Jie confirmó el cambio**. Antes de eso no sale nada (ver `soluciones.md`).
**AlbaMed no siempre es para quien la compró** (Martin, 18-nov). Muchas veces se compra para el esposo o para otra persona. No se asume quién la usa, y tampoco hace falta preguntarlo. ✅ «Lo más importante es que quien la use siga las recomendaciones de la guía…» ❌ «sé que estás esperando tu AlbaMed para empezar a dormir mejor».
**Siempre se tiene que sentir que estamos trabajando para ella** (Martin, 17-nov). Si le pedimos algo, se cuenta como que ya íbamos avanzando y justo nos dimos cuenta. ✅ «Ya teníamos tu pedido listo para preparar y, justo antes de mandarlo, nos dimos cuenta de que nos falta un dato de tu dirección.» ❌ «Ya estamos preparando tu pedido…» (suena a que recién empezamos). Y cuando le pedimos un dato, va con su porqué, para que no parezca estafa.


**4c. Llegar con el resultado, no con «lo vamos a ver».** (Martin, 16-nov) Si para contestar hace falta algo de Jie o de otra área, se espera y se le escribe a la clienta una sola vez, con el resultado. Nada de acuses del tipo «ya estoy revisando tu caso». Excepción: si el resultado va a tardar más de 2 días y la clienta vuelve a escribir, se le da algo real (la fecha de llegada o qué estamos haciendo), nunca un acuse vacío.

**5. Toda disculpa lleva su razón, sentida y corta.**
✅ «Te rogamos que nos disculpes. No es lo habitual en nosotros, pero estos días hemos tenido un volumen de pedidos muy grande.»
Si esperó más de 24 h o la falla fue grande, se agrega «Ya estamos reforzando nuestra atención y de aquí en adelante voy a estar muy atenta a tu caso.»
La disculpa por la demora va **solo si de verdad nos demoramos** (Martin, 16-nov). Si le contestamos rápido, se parte directo con lo nuevo.
❌ «Se nos pasó» a secas.
**Atraso por falta de stock** (Martin, 17-nov): tiene que sentirse que todo va bien y que solo hay unos días de retraso, porque el producto es un éxito. «AlbaMed ha tenido tanto éxito, y le está gustando tanto a la gente, que los envíos van con unos días de retraso.» Después: mil disculpas, «no te preocupes, que todo va muy bien y tu pedido ya está apartado a tu nombre», la fecha y el rastreo apenas salga.
❌ «se nos agotó», «ya estamos fabricando», «sin stock», «problema con el proveedor»: le dicen que su producto todavía no existe e invitan a cancelar.

**6. Nunca delatar bot, sistema ni error de máquina.** El error se asume como gestión nuestra. Prohibido: «automático», «sistema», «plantilla», «bot». Decir que fue un bot le dice a la clienta que nadie la atiende, y eso daña la reputación de la tienda.

**7. Una sola exclamación, en la buena noticia.**
✅ «¡Tu VisionPure ya llegó a México!»
Con más de una, «parece que estuviera gritando».

**8. Cero dos puntos dentro de una frase.** Se une con coma, «pero» o «porque», o se parte en dos frases.
Única excepción: cuando se le piden datos, van como formulario, un campo por línea.
```
Calle y número:
Colonia:
Código postal:
Ciudad:
Estado:
Teléfono de contacto:
```

**9. Nunca «internacional» ni el origen por iniciativa propia.** Solo si pregunta de dónde viene: «Por la forma en que tenemos organizado nuestro negocio, nuestras bodegas están en China y desde ahí sale cada pedido. Pero no te preocupes, tu producto es 100% original», y nombrar J&T Express. Se dice «bodegas», nunca «proveedores» ni «almacén internacional». Tampoco se nombra el transportista de origen (YunExpress, 4PX).

**10. Nada de fechas que asusten.**
**La fecha de llegada se da solo si la clienta pregunta cuándo llega, o si es buena noticia porque está cerca, a menos de 7 días** (Martin, 20-nov: «nuestros tiempos de envío son malos y siempre trato de ocultarlos»). Si no preguntó (cambio de dirección, confirmaciones, reenvío que salió), se da el **enlace de rastreo** en vez de la fecha: el control lo da ver que se mueve. ✅ «¡Ya está todo listo! En este enlace puedes ir viendo cada avance de tu pedido.» ❌ «Te estaría llegando a más tardar el sábado 5 de diciembre» a quien solo pidió cambiar la dirección. Esto reemplaza lo del 16-nov de que siempre va fecha.
Cuando sí va fecha, la fecha de llegada es la de la compra + 18 días, que es cuando llega el 90 % de los pedidos (`ops_alegres_config.dias_llegada_mx`). España también lleva fecha (Martin, 16-nov): compra + `dias_llegada_es` = 18 días. **Reenvíos:** la fecha corre desde que sale de la bodega, a más tardar en 11 días en México y 13 en España (`dias_reenvio_mx/es`, el 90 % de los pedidos de octubre). Nunca «si para el día X no ves movimiento…». Nunca «entregado y firmado». En preguntas de uso no se manda al médico: solo se da la forma de uso.
**Nada que haga esperar una entrega inmediata** (Martin, 17-nov). Antes de que J&T esté repartiendo, no se escribe «mensajero», «tu puerta», «mañana» ni «en cualquier momento», porque la clienta entiende que le llega al otro día. ✅ «para que te llegue sin contratiempos».
**No prometer un seguimiento que no podemos hacer** (Martin, 17-nov). Si la solución es que ella hable con J&T, se le dan los pasos y listo. Nada de «respóndeme y yo lo sigo de cerca».

**11. Generosidad cuando el error es nuestro.** Nunca pedir que devuelvan el frasco ni el producto. «Si el primero llegara a tus manos, quédatelo con nuestras disculpas.»

**12. Cierre fijo.**
```
Para lo que necesites, aquí estoy para servirte.

Quedo atenta,
Mariana
```
Comillas rectas "así", nunca « ».

**13. La escalera de emociones, y nada de pedir fe.** (Martin, 17-nov: «súper importante siempre que uno toma un caso»)
- Al tomar cualquier caso, lo primero es ubicar en qué escalón está la clienta. La emoción de la clienta se toma como está y se la lleva al escalón siguiente, hasta que quede tranquila. Por ejemplo, de la rabia a sentirse escuchada, de ahí a la tranquilidad y de ahí al control (saber qué pasa y qué va a pasar).
- Nada de claims sin prueba. ❌ «Confía en nosotros» · «somos una empresa seria». ¿Cómo va a confiar si le fallamos? La confianza la dan los hechos concretos: qué hicimos, qué va a pasar y cuándo, y cómo lo va a poder ver ella.
- El copy chief de servicio (`00-REGLAS/copy-chief.md`) se usa **al crear un molde nuevo**, para darle buena dirección junto con todas estas reglas. No se corre en cada correo: los correos siguientes usan el molde ya aprobado (Martin, 17-nov).

## Modelos aprobados (copiar el tono, no la letra)

- **Dónde está mi pedido** (plantilla automática, aprobada): «Hola Juana, buenas noches. / Muchas gracias por escribirnos. Con mucho gusto te cuento cómo va tu pedido, y no te preocupes, que va muy bien. / Te tengo buenas noticias. ¡Tu VisionPure ya va en camino al aeropuerto para tomar su vuelo hacia México! / Todavía le falta un poco de camino. Te estaría llegando a más tardar el domingo 29 de noviembre, y en este enlace puedes ir viendo cada avance. / [link] / Para lo que necesites…»
- **Producto roto:** «Hola Rosalba, buenas tardes. / Muchas gracias por escribirnos, y qué pena que tu férula se haya roto, una disculpa por el mal rato. Con mucho gusto te mandamos una nueva sin ningún costo. / Para dejarlo listo, ¿me ayudas con una foto de la férula donde se vea la parte rota? En cuanto la reciba, te la envío. / Para lo que necesites…»
- **Etiqueta Dr. Harryi:** «Es el mismo VisionPure que compraste, con la misma fórmula. Lo que pasa es que este lote salió con la etiqueta del laboratorio que lo fabrica. Puedes usarlo con toda confianza.»
- Más casos en `20-CASOS/`.

## La lógica de fondo

Martin trata a la gente como ella quiere ser tratada (Carnegie, «Cómo ganar amigos e influir sobre las personas»): admitir el error rápido, hablar desde lo que le importa a ella, no discutir, dejarla quedar bien y usar su nombre. El deseo de fondo de la clienta es tener el **control**: saber qué pasa y qué va a pasar.
