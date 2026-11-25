# 04 · Moldes de redes · BORRADOR, nada de esto se ha enviado

Los 13 textos pasan `scripts/revisar_redes.py`. Los archivos sueltos están en `moldes/`.
Cada escenario trae su volumen en la muestra de 600 comentarios, casos reales donde se usaría, el texto y las excepciones.
**Ninguno se activa sin tu OK a la versión final.** Si un texto cambia, se vuelve a mostrar.

## R01 · Precio y cómo comprar
**Camino A** · 78 de 600 comentarios · 23 ocultos

Casos reales:
- «Precio???»
- «Costo y dónde se consigue»
- «Quiero más info y costos por fa»
- «Como lo compro»

**Corregido con Karla el 25-nov**, partiendo de sus respuestas de «Voz de marca y respuestas · Alegres Tienda México» (Notion, octubre). Se pasaron a tú y a la firma de Mariana, con un emoji y el enlace del producto siempre (regla de Martin del 20-oct: «el enlace de la página de producto va SIEMPRE»). Los dos enlaces se probaron el 25-nov y abren la página correcta.

🚩 **Precio sin confirmar.** En la tienda, el 25-nov, los dos productos aparecen con un precio base de $1,398 (VisionPure) y $1,399 (AlbaMed), y no de $499 y $699. Karla ya había anotado en octubre que la gente reclama «en la publicación dice $499 y en el sistema aparece $699». Mientras Martin no confirme qué precio se dice, el texto queda con `{precio de 1}` y `{precio de 2}`.

Comentario (VisionPure):
```
Hola {nombre}, muchas gracias por tu interés 😊 VisionPure está en ${precio de 1} un frasco y en ${precio de 2} los dos, con envío gratis a todo México. Lo pides directo aquí y ahí mismo eliges cómo pagar.
https://alegrestiendamexico.com/products/visionpure-spray-lutein-ojos
Mariana
```

Comentario (AlbaMed):
```
Hola {nombre}, muchas gracias por tu interés 😊 AlbaMed está en ${precio de 1} una férula y en ${precio de 2} las dos, con envío gratis a todo México. La pides directo aquí y ahí mismo eliges cómo pagar.
https://alegrestiendamexico.com/products/albamed-ferula-antirronquidos
Mariana
```

Comentario, «no sé cómo comprarlo» (R01b, de la respuesta de Karla «No encuentro cómo comprarlo»):
```
Hola {nombre}, con mucho gusto te ayudo 😊 Entras a este enlace, tocas "Agregar al carrito" y luego "Comprar". Llenas tus datos de envío completos, con el número de tu casa y tu teléfono, y eliges cómo pagar. El envío es gratis a todo México.
{enlace del producto}
Mariana
```

Excepciones y cuidados:
- El producto se saca del anuncio donde comentó. Si el anuncio no deja claro cuál es, pasa a Karla.
- Si en el mismo comentario pregunta otra cosa («¿y sirve para cataratas?»), manda el molde de salud.
- Los precios salen de la regla de hoy ($499 una unidad, $699 dos). Si la promoción cambia, se cambia el molde ese mismo día, y por eso no nombra «Buen Fin» ni «2x1».

## R02 · ¿Pago al recibir o en OXXO?
**Camino A** · 45 de 600 · 13 ocultos · es la pregunta más repetida

Casos reales:
- «Disculpa tienes servicio de pago contra entrega??»
- «Se paga al recibir porque no tengo tarjeta»
- «Si lo quiero pero no manejo tarjetas xq no usan Oxxo»
- «manden número de cuenta y les deposito en farmacia Guadalajara»

**Corregido con Karla el 25-nov.** En su Notion la respuesta de pago contra entrega y la de métodos de pago iban juntas. Karla pidió separarlas, una para cada caso. Los métodos de pago salen de lo que ella confirmó en el checkout el 21-oct (Visa, Mastercard, American Express, PayPal, Shop Pay y Google Pay). Conviene volver a mirarlo en el checkout antes de aprobar.

Comentario, «¿pago al recibir u OXXO?» (R02):
```
Hola {nombre}, muchas gracias por preguntar. Por ahora no tenemos pago al recibir ni en OXXO, pero puedes pagar con PayPal o Google Pay sin registrar tu tarjeta en la tienda. Apenas compras te llega a tu correo el número de tu pedido, y después el enlace para ver dónde viene tu paquete hasta que llegue a tu casa 📦
Mariana
```

Comentario, «¿cómo se paga?» (R02b):
```
Hola {nombre}, con mucho gusto te cuento 😊 Puedes pagar con tarjeta Visa, Mastercard o American Express, con PayPal, con Shop Pay o con Google Pay. Si prefieres no registrar tu tarjeta en la tienda, PayPal o Google Pay son lo más cómodo. Lo eliges al final de tu compra, aquí.
{enlace del producto}
Mariana
```

Excepciones y cuidados:
- Nunca se da un número de cuenta ni se acepta un depósito, aunque lo pidan.
- Si dice «ya hice mi pedido pero no tengo tarjeta», es un pedido sin pagar: va al camino C.
- Raíz: es una venta perdida. Ver la decisión 6 del LEEME.

## R03 · ¿Cuánto tarda en llegar?
**Camino A** · 13 de 600 · 9 ocultos

Casos reales:
- «Buenas noches me podrían informar para cuándo me envían mi pedido» (esta ya compró: va al camino C)
- (Casi no hay preguntas de plazo de gente que aún no compra. La mayoría de las que hablan de plazo ya compraron.)

Comentario:
```
Hola {nombre}, con mucho gusto te cuento. Tu pedido te estaría llegando a más tardar en 18 días desde tu compra, con envío gratis, y te mandamos a tu correo el enlace para ir viendo cada avance.
Mariana
```

Excepciones y cuidados:
- Si ya compró, no va este molde: va el R04.
- España y otros países no usan este texto.
- Depende de la decisión 4 del LEEME (qué plazo se dice antes de la compra).

## R04 · Ya compré y no me llega
**Camino C** · 33 de 600 · 18 ocultos · 12 con respuesta

Casos reales:
- «Yo lo compré y no me ha llegado ya llevo más de un mes y ya no me contestan los mensajes.» (oculto)
- «Hice un pedido y llevo esperando veinte días, y sigo esperando» (oculto)
- «Lo compre y no me ha llegado 😡 cuidado!» (oculto)
- «A mi no me a llegado desde septiembre 8868 mi pedido»

**Corregido por Karla el 25-nov**, con lo que hace hoy a mano:
- Si el pedido lleva **menos de 5 días** en tránsito, le da tranquilidad en público sin comprometer un plazo (R04b). Karla, 25-nov: «mejor decir que está en tránsito y darle seguridad al cliente sin comprometer el tiempo». Va en línea con la regla 10 de voz (la fecha se esconde salvo que haga falta), y el plazo de la tienda y el del correo no se contradicen en público.
- Si lleva **más de 5 días**, le escribe por privado, le dice dónde va el pedido y le manda el enlace de rastreo (R04, R04c).
- **Pide el correo, no el número de pedido**, porque la gente casi siempre le da el número de guía.
- Si hay problemas en la entrega, le da por privado el contacto de la paquetería de última milla (R04d, que es el texto del molde B del correo).
- Karla pidió agregar un emoji (va uno, R11).

**Lo que se le propone a Martin** (es decisión suya):
- En el **privado**, el enlace de rastreo con la guía (`/apps/parcelpanel?nums=…`) hoy da ERROR por la R10. Se propone que la R10 valga solo para los comentarios públicos, porque en el privado el enlace de rastreo es justo lo que la clienta necesita (igual que en el correo).

Comentario público, más de 5 días o sin saber cuál es el pedido (R04):
```
Hola {nombre}, mil disculpas por la espera 🙏 Te acabo de escribir por mensaje privado para ubicar tu pedido contigo y decirte cuándo te llega.
Mariana
```

Comentario público, recién compró, menos de 5 días (R04b):
```
Hola {nombre}, muchas gracias por tu compra 🙏 No te preocupes, que tu pedido ya va en camino y todo va muy bien. Te escribí por mensaje privado con el enlace para que veas cada avance hasta que llegue a tus manos.
Mariana
```

Mensaje privado para ubicarlo (R04):
```
Hola {nombre}, muchas gracias por escribirnos y mil disculpas por la espera.

Para ubicar tu pedido y decirte dónde viene y cuándo te llega, ¿me ayudas con el correo con el que hiciste la compra? Te lo pido porque aquí en Facebook solo veo tu nombre, y con tu correo lo encuentro de inmediato y te respondo por aquí mismo.

Mariana
```

Mensaje privado, ya ubicado (R04c):
```
Hola {nombre}, muchas gracias por esperarme. Ya encontré tu pedido y no te preocupes, que va muy bien.

{dónde viene}. Te estaría llegando a más tardar el {fecha}.

En este enlace puedes ir viendo cada avance.
https://alegrestiendamexico.com/apps/parcelpanel?nums={guía}

Mariana
```

Mensaje privado, problema en la entrega (R04d):
```
Hola {nombre}, muchas gracias por esperarme. ¡Tu pedido ya está en tu ciudad! J&T Express, que es la paquetería que te lo lleva hasta tu casa, salió a entregarlo pero no logró dar con tu domicilio.

Para que no se regrese, escríbeles por WhatsApp al 55 7100 1047 con tu número de guía {guía JMX} y tu dirección completa, con colonia, código postal, referencias para encontrar tu casa y un teléfono de contacto. Así acuerdas la entrega directo con ellos.

Lo ideal es hacerlo hoy o mañana, porque J&T lo intenta solo por unos días.

Mariana
```

Excepciones y cuidados:
- Si da el número de guía en vez del correo, sirve igual: con la guía también se ubica el pedido.
- R04d necesita la guía de J&T (JMX). Si solo tenemos la de origen (YT…), se usa el teléfono de la oficina local que viene en el aviso de J&T.
- Si el comentario ya trae el número de pedido (como el 8868), no se le vuelve a pedir: el privado va directo con la respuesta del motor del correo para ese pedido.
- Si esa persona ya tiene un caso abierto por correo, se une a esa conversación y se le responde una sola vez.
- Si dice «fraude» o «PROFECO» y tiene pedido, sigue siendo este molde, pero el caso sube a Martin como en el correo.
- El «mil disculpas por la espera» va solo si de verdad lleva más de 18 días o más de 24 horas sin respuesta nuestra.
- Meta deja mandar un solo privado por comentario. Si no contesta, no se insiste.

## R05 · «¿Es confiable?» «¿Alguien ya lo probó?»
**Camino B** · parte de los 97 de fraude y desconfianza · 71 ocultos

Casos reales:
- «Alguien ya lo probó?»
- «me gustaría leer su testimonio con sinceridad y si está página no es un fraude»
- «¿Realmente funciona?» (oculto)

Comentario:
```
Hola {nombre}, es normal preguntarlo antes de comprar por internet. Apenas compras te llega a tu correo el número de tu pedido y después un enlace para ver dónde viene tu paquete. Y si tienes cualquier duda antes o después, me escribes por mensaje privado y te respondo yo.
Mariana
```

Excepciones y cuidados:
- Si la persona dice que compró y no le llegó, no es este molde: es el R04.
- «Puro cuento», «publicidad para retrasados» y parecidos no llevan respuesta.
- No nombra la garantía. Ver la decisión 5 del LEEME.

## R06 · Pregunta de salud (VisionPure)
**Camino B** · 28 de 600 · 11 ocultos

Casos reales:
- «Disculpen Sirve para las cataratas»
- «Y si estoy operado de los ojos me sirve»
- «Si sirve para el ojo seco mi pregunta»
- «Y los jóvenes q usan lentes?»

Comentario:
```
Hola {nombre}, muchas gracias por tu pregunta. VisionPure es un spray de luteína que va por fuera, sobre el párpado cerrado, nunca directo al ojo. Es un producto de cuidado diario y no reemplaza el tratamiento que ya tengas indicado. En la página está la fórmula completa y cómo se usa.
https://alegrestiendamexico.com/products/visionpure-spray-lutein-ojos
Mariana
```

Excepciones y cuidados:
- Hoy a estas preguntas se les responde «sí, te sirve perfectamente». Este molde no dice ni sí ni no: dice qué es y cómo se usa.
- Si describe un síntoma serio («veo manchas negras», «perdí la visión»), no lleva molde: lo ve Karla y, si hace falta, Martin.
- Si ya lo usa y le arde o le molesta, va a los moldes S1 y S2 del correo, por privado.

## R07 · AlbaMed no es para su caso
**Camino B** · pocos casos, pero muy claros

Casos reales:
- «Si persona que lo ocupe usa dentadura le funciona?»
- «Y si tengo bruxismo?» (el bruxismo no está en la guía: pasa a Karla)

Comentario:
```
Hola {nombre}, muchas gracias por preguntar antes de comprar. La guía de AlbaMed indica que no se use con dentadura completa, dientes flojos, aparatos de ortodoncia ni implantes de menos de un año. En ese caso preferimos decirte que no es para ti.
Mariana
```

Excepciones y cuidados:
- Solo se usa cuando lo que pregunta está en la lista de la guía. Si no está, pasa a Karla sin texto.
- Con apnea o CPAP rige lo que ya aprobaste en el correo.
- Perdemos esa venta a propósito: es una devolución menos.

## R08 · Me llegó con la etiqueta Dr. Harryi
**Camino B** · 9 de 600 · 8 ocultos

Casos reales:
- «apenas me llegaron pero son unas gotas que dicen Dr harry entonces no son las originales ?»
- «Es una falsificación, en este anuncio el frasco dice visionpure y en el que envían dice Dr Harryi» (oculto)
- «Cuál es mejor visión puré o Dr.harry» (oculto)

Comentario:
```
Hola {nombre}, es el mismo VisionPure que compraste, con la misma fórmula. Lo que pasa es que ese lote salió con la etiqueta del laboratorio que lo fabrica, así que puedes usarlo con toda confianza. Si quieres que lo veamos juntos, me escribes por mensaje privado.
Mariana
```

Excepciones y cuidados:
- Es el texto que ya aprobaste para el correo, acortado.
- 🚩 Una clienta dice que su Dr. Harryi lista solo luteína. Hasta que Jie confirme qué dice esa etiqueta, este molde no se usa con quien reclame por los ingredientes.
- Si además pide la plata, va al camino C.

## R09 · No me funcionó
**Camino B** · 27 de 600 · 25 ocultos · 3 con respuesta

Casos reales:
- «Yo lo compré y no funciona» (oculto)
- «Esas gotas no sirven yo las compré y no sentí mejoría» (oculto)
- «Falso. Lo use 8 semanas y no me hizo nada.» (oculto)

Comentario público:
```
Hola {nombre}, gracias por contarlo, y qué pena que no hayas notado el cambio. Nos gustaría que ahora sí te funcione, así que te escribí por mensaje privado para ver contigo cómo lo estás usando.
Mariana
```

Mensaje privado (VisionPure):
```
Hola {nombre}, muchas gracias por contarnos cómo te fue, y qué pena que no hayas notado el cambio.

Nos gustaría que ahora sí te funcione. ¿Me cuentas cómo lo estás aplicando y hace cuánto lo usas? Te pregunto porque lo que mejor resulta es aplicarlo sobre el párpado cerrado, dos rociadas en la mañana y en la noche, todos los días, y dejar los ojos cerrados unos 30 segundos hasta que se seque.

Con lo que me cuentes vemos juntos el paso siguiente.

Mariana
```

Excepciones y cuidados:
- Es tu regla del correo: primero ayudar a que le funcione. No se nombra la garantía ni la devolución.
- «No funciona» a secas, sin decir que lo compró, no lleva respuesta.
- Falta la versión del privado para AlbaMed (posiciones, adaptación de 2 a 5 noches). La escribo cuando apruebes esta.

## R10 · Comentario positivo
**Camino A** · 9 de 600

Casos reales:
- «Ya lo estoy usando muy bueno»
- «Revista Alquimia, muchísimas gracias»

Comentario:
```
Hola {nombre}, ¡qué alegría leerte! Muchas gracias por tomarte el tiempo de contarlo.
Mariana
```

Excepciones y cuidados:
- Si el «gracias» es respuesta a una respuesta nuestra, no se contesta de nuevo.
- No se le pide reseña ni se le ofrece nada.

## Lo que todavía no tiene molde
| Escenario | Por qué | Qué falta |
|---|---|---|
| «¿Tiene permiso de Cofepris?» (4 de 600, los 4 ocultos) | No sé la respuesta verdadera, y no se inventa | Decisión 3 del LEEME |
| «Me llegó otra cosa» y «quiero mi dinero» | Son casos de pedido | Usan el R04 para llevar al privado y después los moldes del correo |
| España: cobro de aduana | Es plata y es legal | Sube a Martin, como en el correo |
| Mensajes privados de quien quiere comprar | Son las mismas preguntas | Usan R01, R02 y R03 en versión privada, que escribo cuando apruebes esos |
| Insultos y spam | No llevan respuesta | Se ocultan |
