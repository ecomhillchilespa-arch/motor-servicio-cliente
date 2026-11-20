# Propuestas por escenario · 17-nov-2026

Martin las revisa **de a una**. Cada archivo trae lo mismo:
- qué está pasando;
- las reglas que aplican;
- el curso de acción y su costo;
- un molde que pasa el revisor;
- las excepciones y máximo 2 preguntas.

Orden: primero lo que más riesgo de contracargo o PROFECO tiene, y después lo que más casos despeja.
Nada de esto se envió. Todo espera su corrección.

## 0 · Antes de todo: promesas que hicimos por escrito y no cumplimos (transversal, 🚩)
Es el riesgo más alto: la clienta tiene la promesa por escrito.
- **Dijimos "ya hicimos el reembolso" y no está en Shopify:** 12068, 11621, 9234, 6103, 10627 (pagó con PayPal; puede estar hecho por fuera) y 10372.
  - 12068 y 11621 siguen en la bodega con la guía creada y nadie le dijo a Jie que no los despache.
  - Acción: Martin o Karla revisan en Shopify o en la pasarela y hacen las que falten; a Jie se le pide que frene esos 2.
- **Prometimos un reenvío, una reposición o un cambio de dirección y nunca se le pidió a Jie:**
  - 9703, 9888, 4875, 8026, 7479, 8884, 6895, 8894, 9419, 9896, 10085, 8982 (AlbaMed x3, prometido dos veces) y 7913.
  - Acción: cargarlos todos a Jie en un mensaje y escribirle a cada una cuando confirme (regla 4c).
- **Prometimos el libro y no lo mandamos:** 10327, 10262 y 10693. El molde del libro es definitivo, así que salen sin costo.
- **Graves por antigüedad:** 6701 (pagado en agosto, nunca salió) y 3576 (desde junio sin producto ni plata).

## El orden para mañana
| # | Escenario | Archivo | Casos | Lo clave |
|---|---|---|---|---|
| 1 | Salud: el spray arde | `01-salud.md` | 7 personas | No es alergia: entra al ojo en el paso "parpadea cinco veces" de la guía, y dimos 3 instrucciones de uso distintas. Choque de reglas: la guía dice "consulta a tu oftalmólogo" y nuestra regla prohíbe mandar al médico. Propone reembolso sin devolución a quien no lo puede usar |
| 2 | Legal o "fraude" + pide plata | `02-legal-o-fraude.md` | 11 personas | Casi ninguno es un abogado de verdad: son personas que esperaron más de 30 días sin una respuesta útil. Reenvío con regalo donde se pueda |
| 3 | No le sirve (apnea o CPAP) | `03-no-le-sirve-apnea.md` | 3 casos (6 personas en total) | Única excepción donde el reembolso es la salida (MXN 2.177 en total): otra férula no le sirve a quien no la puede usar |
| 4 | No le ha llegado | `04-no-le-ha-llegado.md` | 41 pedidos | 19 devueltos a J&T, 7 que no salieron de la bodega, 3 que figuran entregados. Reenvíos por ~USD 237. Un solo reembolso (6898) |
| 5 | Pide reembolso o cancelar | `05-pide-reembolso-o-cancelar.md` | 27 personas | Nadie está "en camino y dentro del plazo". 5 tienen el antirronquidos anterior: ofrecerles AlbaMed sin costo (USD 28,8). 3 de España atascados en aduana |
| 6 | Le faltó producto o el libro | `08-falto-producto-o-libro.md` | 11 | 🚩 6112, 8509 y 9937 recibieron lo que pagaron, pero un anuncio prometía "2 + 2 gratis". Hay que confirmar si el anuncio existió y avisar a Creativos. Cumplirles cuesta USD 20,1 |
| 7 | Le llegó otra cosa | `07-le-llego-otra-cosa.md` | 15 personas | Casi todo es la etiqueta Dr. Harryi, sin costo. Molde nuevo que une Dr. Harryi con el libro. QuietLab: reponer con AlbaMed (USD 25) |
| 8 | Cambio de datos | `06-cambio-de-datos.md` | 23 personas | Solo 4 siguen en la bodega. 15 ya se entregaron y se cierran. 2 errores nuestros con reenvío (10067 y 7913, USD 14,8). 12087, 13112 y 12679 esperan el paso siguiente |
| 9 | Dónde está y uso | `10-donde-esta-y-uso.md` | 57 | La respuesta automática no falló: la mayoría no trae un número de pedido que se pueda leer. 7 de los de "uso" en realidad quieren comprar y no saben cómo |
| 10 | Otros sin clasificar | `11-otros-sin-clasificar.md` | 110 | 37 se cierran (spam y avisos de apps), 30 eran de otros escenarios. Patrones nuevos: quieren comprar y no pueden, férulas rotas, cobros sin pedido, facturas |
| 11 | Cerrar sin responder | `09-cerrar-sin-responder.md` | 109 | 63 se cierran sin escribir. 37 NO se pueden cerrar porque detrás del "gracias" hay un problema real |

Un caso, un dueño: algunos pedidos aparecen en dos archivos (9920 en salud y en otra cosa; la apnea en legal y en el 03; 11334 en el 04 y el 10). Al presentar se dicen una sola vez, en el escenario de más riesgo.

## Errores del sistema que salieron (arreglar antes de automatizar cierres)
1. **El clasificador lee mal el número de pedido.** Toma el año "2026", el nombre de una foto (IMG_3630), un código postal, un monto (1299) o un celular (3833). Son unas 35 filas.
2. **La ficha no ve los correos que la clienta mandó desde otra dirección** (4831, 6426, 10841).
3. **Rastreos mezclados con eventos de otro envío** (julio, "Sent To Chile"): 10410, 9703, 9869, 9888, 10561 y 11334.
4. Ya corregido: la palabra "agua" calzaba dentro de "Aguascalientes" en el filtro de escenarios.
5. 10408 escribió por salud el 17-nov a las 03:32 y todavía no estaba en la cola.
