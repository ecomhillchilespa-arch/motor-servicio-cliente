# Flujos por tipo de caso

**Al tomar cualquier caso:** leer el historial completo (`ops_alegres_ficha`) y ubicar en qué escalón emocional está la clienta (regla 13 de voz). El correo la sube al escalón siguiente.

**Antes de activar un molde (Martin, 17-nov):** se prueba en seco sobre los casos reales donde se usaría, se corrigen las excepciones y se le muestra a Martin la versión final con el conteo y 2 o 3 ejemplos reales. Se activa solo cuando él dice «aprobado» o «enciende». Si el texto cambió después, se le vuelve a mostrar.

**Cada molde nuevo trae su arreglo de raíz (Martin, 17-nov):**
1. Se mide por qué pasa el caso.
2. Se propone cómo evitarlo: una alerta, la página, el checkout, o un aviso a Jie o a Creativos.
3. Recién ahí se escribe el molde.

Ejemplo: los devueltos llevaron a la alerta de «falta un dato de tu dirección».
**Orden de atención:** por urgencia, primero lo que es de una clienta real y lleva más tiempo esperando (Martin, 17-nov).

Cada flujo termina con la clienta avisada y la gestión cerrada en `ops_alegres_gestiones_jie`, si pasó por Jie.

## ¿Dónde está mi pedido? (consulta_estado)
Lo responde sola la plantilla de Mariana (`ops_alegres_plantilla_rpc`), con una variante por etapa, solo en el primer mensaje de la conversación y solo para México.
Pasa a una persona si: ya se entregó, hubo un intento fallido, se devolvió, no es México, pasó la fecha de llegada, lleva más de 10 días sin moverse, tiene `rastreo_asignado` hace 5 días o más sin retiro, o no tiene rastreo después de 3 días hábiles.

## Cambio de dirección o de datos (correccion_datos)
1. Leer todo el hilo y sacar la dirección nueva completa. Si falta, se le pide a la clienta con el formulario de dos puntos.
2. Revisar la etapa (`ordenes.etapa_actual`).
3. **En origen:** crear la gestión `cambio_direccion` en por_enviar, que va en el mensaje del día a Jie. Se deja el borrador listo y aprobado, pero **a la clienta se le escribe solo cuando Jie confirma**. Entonces se le dice «Alcanzamos a retener tu pedido y pedimos que cambiara de dirección» (regla 4b), nunca «todavía no sale».
4. **Ya salió:** decirle la verdad sin relatarle lo obvio. Si el error fue nuestro (le prometimos el cambio y no se hizo), se reenvía por cuenta nuestra y se le dice «si el primero llegara a tus manos, quédatelo con nuestras disculpas».
5. Cuando Jie confirma, se cierra la gestión.

## No llegó, devuelto o abandonado
Revisar el rastreo y lo que Jie haya dicho: muchas veces el paquete quedó abandonado por una dirección mala. Pedir la dirección correcta con el formulario y después el reenvío a Jie. Aunque la clienta pida reembolso, el primer correo ofrece el reenvío con regalo y la guía, sin nombrar el reembolso (ver `soluciones.md`, punto 3). Si falta información, primero se le pregunta a Jie. Solo si rechaza el reenvío, va el reembolso (lo ejecuta Martin o Karla).

## Producto roto o equivocado
Pedir una foto como prueba y después el reenvío por Jie. Nunca se pide devolver el producto.

## Pregunta de uso o de producto
Solo la forma de uso que dice el empaque o la guía, sin mandar al médico. Links de las guías:
- VisionPure: https://cdn.shopify.com/s/files/1/0872/7284/9765/files/VisionPure-Protocolo-4-Semanas.pdf?v=1794428185
- AlbaMed: https://cdn.shopify.com/s/files/1/0872/7284/9765/files/AlbaMed-Protocolo-30-Noches.pdf?v=1794428185
Dr. Harryi es el mismo VisionPure.

## Reembolso pedido
Si el pedido viene bien: primero la noticia con emoción, después «como ya va en camino no lo podemos detener», y al final «recíbelo con confianza y ya que lo tengas lo vemos juntos». Si hubo falla nuestra, se ofrece el reenvío con regalo y la guía. Solo si insiste después de esa oferta, el reembolso va sin demora y lo ejecuta una persona.

## Salud o legal (reacción, publicidad engañosa, PROFECO, abogado)
Siempre lo ve una persona. Acuse respetuoso, sin admitir ni resolver, y aviso a Martin con 🚩.
