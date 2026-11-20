# AlbaMed atrasado por falta de stock · 17-nov-2026 · APROBADO para responder a quien pregunte

Contexto: Jie se quedó sin stock de AlbaMed alrededor del 9-nov. Hay ~880 pedidos sin salir.
Correcciones de Martin hasta llegar a este texto:
1. La razón es el éxito: «da tan buenos resultados que las mismas personas que lo usan se lo recomiendan, y eso trajo un pico de pedidos que no esperábamos; todo lo demás va bien».
2. Nunca «se agotó», «estamos fabricando» ni «sin stock»: suena a que su producto no existe. Lo frenan el revisor y el freno de Supabase.
3. Empatía: partir por ella («sé que lo estás esperando») y «sabemos que no es lo que esperabas». Sin asumir quién lo usa.
4. Sin «si algo cambiara te aviso»: deja abierta la idea de que puede empeorar.
5. «Estamos acelerando todo para que salga lo antes posible», y la guía ya asignada como señal de que está andando.
6. La fecha va pedido por pedido, según la tanda de salida que dé Jie (los más antiguos primero): salida + 11 días en México.
7. Cupón de buena fe al final: «te regalamos un 25% de descuento en tu próxima compra con el código GRACIAS25». Sin decir que se le va a acabar. El código existe en Shopify desde el 17-nov: 25 % sobre el pedido, sin límite.
8. Buen Fin según la fecha de compra. México, del 13 al 18-nov: «Con el Buen Fin, y como AlbaMed está dando tan buenos resultados…». Antes del 13-nov o fuera de México: solo las recomendaciones.

```
Hola Laura, buenos días.

Muchas gracias por tu compra y por tu confianza. Te escribo yo antes de que tengas que preguntar, porque sé que estás esperando tu AlbaMed, y quiero que sepas exactamente cómo va.

Con el Buen Fin, y como AlbaMed está dando tan buenos resultados que las mismas personas que lo usan se lo han ido recomendando unas a otras, estos días tuvimos un pico de pedidos muy grande que no esperábamos. Por eso los envíos van con unos días más de lo normal, pero todo lo demás va muy bien. Te pedimos mil disculpas por esta espera, sabemos que no es lo que esperabas cuando hiciste tu compra.

Tu pedido ya está apartado a tu nombre, ya tiene su guía asignada y lo estoy siguiendo yo personalmente. Estamos acelerando todo para que salga lo antes posible, y te estaría llegando a más tardar el {{FECHA_LLEGADA}}. En este enlace vas a poder ver cada avance apenas empiece a moverse.
{{LINK_RASTREO}}

Y como agradecimiento por tu paciencia, te regalamos un 25% de descuento en tu próxima compra con el código GRACIAS25.

Para lo que necesites, aquí estoy para servirte.

Quedo atenta,
Mariana
```

Para quien pregunta, la primera línea pasa a «Muchas gracias por escribirnos, y te pedimos mil disculpas por la demora en responderte.» y el resto queda igual.

## Fecha de salida (17-nov, 23:30)
Jie dice que todos los AlbaMed atrasados salen **a más tardar el jueves 20-nov**. Con salida + 11 días, la fecha de llegada es **a más tardar el lunes 1 de diciembre**.
El freno de AlbaMed (`albamed_sin_stock`) se apaga recién cuando la sesión de stock confirme el primer escaneo del rastreo.
Las clientas que reciban la bolsa «QuietLab Pro» (ventas del 21 al 27-nov) necesitan el manual en español; está pendiente el OK de Martin para agregarlo al correo de confirmación.

Corrección de Martin (18-nov): no se asume que AlbaMed es para quien la compró (puede ser para el esposo). Se sacó «para empezar a dormir mejor».
