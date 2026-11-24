# Molde nuevo: «mandó su dato, pero el pedido ya había salido» · 24-nov · propuesta de Karla

**Estado:** Karla lo aprueba (24-nov). Como es un molde nuevo, **falta el OK de Martin para activarlo**. Mientras tanto no sale nada.

## El caso
Le pedimos a la clienta un dato que faltaba (teléfono, colonia o número) con el molde A. Ella respondió a tiempo, pero **el dato nunca se le pasó a Jie** y el pedido salió sin él. Jie dice que a un pedido despachado no se le puede cambiar la dirección hasta el primer intento de entrega fallido.

**Hoy son 6 pedidos:** #13434, #13363, #13250, #13158, #13116 y #13787. Todos van en camino al aeropuerto (rastreo del 23 y 24-nov). A la mayoría les falta solo el teléfono o la colonia, así que lo más probable es que igual les llegue.

## El texto (pasa el revisor)
```
Hola {{NOMBRE}}, buenas tardes.

Muchas gracias por escribirnos y por mandarnos tus datos. Te rogamos que nos disculpes por la demora en responderte. No es lo habitual en nosotros, pero estos días hemos tenido un volumen de pedidos muy grande. Ya estamos reforzando nuestra atención y de aquí en adelante voy a estar muy atenta a tu caso.

No te preocupes, que tu pedido va muy bien. Ya va en camino al aeropuerto para tomar su vuelo hacia México.

Para que te llegue sin contratiempos, te dejo el WhatsApp de J&T Express, la paquetería que lo va a repartir, 55 7100 1047. Si te llega un aviso de que no encontraron tu domicilio, escríbeles con tu número de guía, {{LOS DATOS QUE MANDÓ: tu teléfono / tu colonia / tu número exterior}}, y así acuerdas la entrega directo con ellos.

En este enlace puedes ir viendo cada avance.

{{LINK_RASTREO}}

Para lo que necesites, aquí estoy para servirte.

Quedo atenta,
Mariana
```

**Por qué así:**
- No se le cuenta que el dato no se pasó, porque eso le dice que nadie la atendió (regla 6). Tampoco se le repiten sus datos (regla 4).
- Le da el control: sabe qué hacer si J&T no la encuentra. Es el punto 1 de `soluciones.md`, que la persona lo resuelva sola, y usa el mismo WhatsApp de J&T que el molde B.
- No promete un seguimiento que no podemos hacer (regla 10).

**Duda abierta (la misma del molde B):** J&T pide la guía JMX y nosotros solo tenemos la YT. Hay que ver si el enlace de ParcelPanel muestra la JMX cuando J&T recibe el paquete.

## Arreglo de raíz
**Cuando la clienta responde al molde A con el dato, no se crea la gestión para Jie** (ya estaba anotado en «En qué estamos»: le pasó a #13405 y ahora a estos 6). El arreglo es que el flujo del molde A (`63BbJp1q9gTVVbjb`) cree la gestión `cambio_direccion` en `por_enviar` apenas llegue la respuesta, si el pedido sigue en `origen`, o que la deje en la lista de Karla con el dato listo para el Sheet.

## Qué decide Martin
1. ¿Se activa el texto para estos 6 y para los que vengan?
2. ¿Se hace el arreglo de raíz en el flujo del molde A? Karla no tiene acceso a n8n.
