# Reclamos de PayPal: qué aprendimos de nuestro historial y cómo se atienden

*Fuente: los 23 reclamos de PayPal de Alegres (tabla `disputas`, que n8n sincroniza todos los días), revisados el 17-nov-2026.
Shopify Payments tiene su propia app de contracargos; esto es solo para PayPal.*

## Lo que dice nuestro historial
| Motivo | Total | Ganados | Perdidos | Cerrados |
|---|---|---|---|---|
| No le llegó | 11 | 6 | 3 | 2 |
| No es como se describía | 9 | 2 | 5 | 1 |
| No autorizado | 2 | 2 | 0 | 0 |
| Cobro incorrecto | 1 | abierto | | |

**Por qué perdimos los 5 de «no es como se describía»:**
- 2 porque **nunca respondimos** (`NO_SELLER_RESPONSE`): 9709 y 4280. Se perdieron solos.
- 3 porque **aceptamos devolver** (7924, 3528, 2746).

**Por qué ganamos los 2:** respondimos con pruebas y la compradora nunca dijo en qué era distinto el producto. PayPal lo declaró fuera de la protección al comprador (9640 y 4060).

## Reglas (de los datos)
1. **Nunca dejar un reclamo sin respuesta.** Es la forma más segura de perder. La cola por urgencia sube al primer lugar a cualquier clienta con un reclamo abierto, y su ficha muestra el plazo para responder.
2. **Responder con pruebas concretas, no con argumentos:**
   - el pedido de Shopify (en PDF);
   - el rastreo con «Entregado» y la fecha;
   - la página del producto tal como se vendió;
   - si es la etiqueta Dr. Harryi, que es el mismo producto con la etiqueta del laboratorio.
3. **Señalar lo que la compradora no probó.** Si no dice en qué es distinto ni manda foto, eso se escribe. Fue lo que ganó el 9640.
4. **Si nosotros fallamos de verdad** (prometimos y no cumplimos, llegó otra cosa), no se pelea: se devuelve desde el mismo caso. Así se cierra rápido y no queda en contra.
5. **En paralelo, escribirle a la clienta con el molde que corresponda.** Muchas abren el reclamo sin habernos escrito nunca.

## Quién hace qué
- **El motor:** detecta el reclamo, arma la respuesta con las pruebas y el correo a la clienta, y propone «pelear» o «devolver».
- **Martin:** decide.
- **Karla:** responde en PayPal o hace la devolución.
- **Respaldo:** cada devolución queda en `ops_alegres_reembolsos`, con referencia y fecha del correo a la clienta.

Pendiente: con la conexión directa de PayPal, el motor puede leer los casos y adjuntar las pruebas. Las devoluciones siempre las hace una persona.
