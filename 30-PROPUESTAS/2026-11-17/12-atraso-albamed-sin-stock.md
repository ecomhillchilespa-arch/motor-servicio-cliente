# Escenario · AlbaMed atrasado por falta de stock (17-nov)

**Cuántos:** 356 pedidos de AlbaMed del 7 al 14-nov sin salir de la bodega (~$283.000 MXN). Hay 750 pedidos desde el 14-nov que todavía no tienen producto cargado, así que el total probablemente pasa de 600. Afecta a México, Colombia, Perú y Uruguay.

## Qué está pasando
Jie se quedó sin stock de AlbaMed alrededor del 9-nov y repone cuando llega el pago; la fábrica tarda unos 7 días. Los pedidos esperan en la bodega con la guía creada. La fecha que les dimos (compra + 18 días) no se va a cumplir para la mayoría: van a llegar unos 10 días más tarde.

## Lo que se hace en estos casos (investigación, 17-nov)
- Avisar antes de que pregunte, con la razón breve y una fecha nueva. Mantener informada a la clienta hace que la espera no se sienta excesiva ([ClearSale](https://www.clear.sale/blog/managing-backorders-during-the-holidays), [Racklify](https://racklify.com/encyclopedia/backorder-and-customer-experience-communication-policies-and-retention)).
- Mandar un segundo aviso con el rastreo cuando sale. Si el atraso es largo, un aviso a la semana aunque no cambie nada ([Racklify](https://racklify.com/encyclopedia/query/shipping-delay-communication/)).
- Las herramientas de avisos proactivos dicen bajar entre 40 % y 70 % las preguntas de «¿dónde está?» ([LateShipment](https://www.lateshipment.com/blog/shipping-notification/), [ShippyPro](https://www.shippypro.com/blog/en/reduce-shipping-support-tickets)). Son cifras de proveedores, no estudios independientes.
- Dato nuestro: a quien se le contestó en menos de 24 h pidió reembolso menos (13 % contra 19 %).
- Lo que no se adopta: los proveedores recomiendan facilitar la cancelación. Martin decidió que el reembolso es la última opción, así que el correo da control con hechos y no ofrece cancelar.

## Curso de acción que propongo
1. Control Megafulfill consigue con Jie la fecha real de reposición y de despacho de los atrasados (encargado el 17-nov).
2. Con esa fecha, correo **A (proactivo)** a cada clienta de AlbaMed atrasada que no ha escrito, y correo **B** a las que ya preguntaron. Salen en lote, después de simularlo con el molde.
3. Cuando cada pedido sale, va un segundo correo con el rastreo (lo hace la plantilla de estado, que vuelve a responder sola al apagar el freno).
4. Mientras tanto, la respuesta automática no promete fecha a AlbaMed con más de 4 días sin salir. Ya está andando, con el interruptor `albamed_sin_stock`.
5. Costo: USD 0. Lo que se cuida es evitar reembolsos y contracargos.

## Molde A · Proactivo (no ha escrito) · v3 (Martin): todo va bien, solo unos días de retraso por el éxito; sin «se agotó» ni «estamos fabricando»
Escalera: tranquila (todavía no sabe) → informada y con control (fecha nueva, rastreo, «no tienes que hacer nada»).
```
Hola Laura, buenos días.

Muchas gracias por tu compra. Te escribo para contarte cómo va tu AlbaMed.

Estos días AlbaMed ha tenido tanto éxito, y le está gustando tanto a la gente, que los envíos van con unos días de retraso. Te pedimos mil disculpas por la espera.

No te preocupes, que todo va muy bien y tu pedido ya está apartado a tu nombre. Sale de nuestra bodega el lunes 24 de noviembre y te estaría llegando a más tardar el viernes 5 de diciembre. Apenas salga, yo misma te escribo con tu número de rastreo para que puedas ver cada avance hasta tu puerta.

Para lo que necesites, aquí estoy para servirte.

Quedo atenta,
Mariana
```
Revisor: `OK, pasa todas las reglas` (las fechas son de ejemplo; van las reales de Jie).

## Molde B · Ya preguntó
Escalera: preocupada o molesta → escuchada («tienes toda la razón») → control.
```
Hola Laura, buenos días.

Muchas gracias por escribirnos, y te pedimos mil disculpas por la espera y por la demora en responderte. Estos días AlbaMed ha tenido tanto éxito, y le está gustando tanto a la gente, que los envíos van con unos días de retraso.

No te preocupes, que todo va muy bien y tu pedido ya está apartado a tu nombre. Sale de nuestra bodega el lunes 24 de noviembre y te estaría llegando a más tardar el viernes 5 de diciembre. Apenas salga, yo misma te escribo con tu número de rastreo para que puedas ver cada avance hasta tu puerta.

Para lo que necesites, aquí estoy para servirte.

Quedo atenta,
Mariana
```
Revisor: `OK, pasa todas las reglas`.

## Lo que necesito que decidas
1. ¿Le agregamos un regalo chico por la espera? Por ejemplo, un segundo estuche, o 1 VisionPure a quien compró 2 AlbaMed. Cuesta plata, pero baja el enojo.
2. ¿El correo A sale a todas las atrasadas o solo a las que ya pasaron su fecha original?

## Qué se podría automatizar después
Cuando el control de stock avise de un quiebre, el correo A sale solo a los pedidos afectados, con la fecha que da la proyección.
