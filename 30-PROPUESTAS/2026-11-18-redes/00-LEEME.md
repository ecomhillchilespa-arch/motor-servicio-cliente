# Motor de redes sociales · diagnóstico y propuesta · 18-nov-2026

**Nada salió hacia afuera.** No se respondió ni se ocultó ningún comentario, y no se cambió nada en Facebook, Instagram ni en lo que hoy responde. Todo lo de esta carpeta es borrador y espera tu corrección.

## En corto
- A los anuncios les llegan unos **34 comentarios al día** en Facebook y unos 30 a la semana en Instagram. El sistema que teníamos no veía ninguno, porque leía la página y no los anuncios.
- **El 55 % de los comentarios está oculto**, y entre los ocultos hay clientas que compraron y no les llega (18 de 33) y gente que pregunta el precio (23 de 78).
- **Lo que hoy se responde en público tiene promesas de salud.** De las últimas 60 respuestas, 45 tienen un problema serio: «te sirve perfectamente» a un operado de los ojos, «desinflamar el cristalino», «100 % segura», «1,700 reseñas verificadas», trato de usted, enlaces malos.
- Los mensajes privados están casi sin atender: 6 respuestas en 30 días.
- La propuesta es que redes funcione **igual que el correo**: mismo revisor, moldes aprobados por ti, Karla aprueba en su Notion, todo en n8n y sin costo nuevo.

## Qué leer, en este orden
| Archivo | Qué trae | Tiempo |
|---|---|---|
| `01-diagnostico.md` | Los números, los 6 problemas y lo que apareció de otros motores | 5 min |
| `02-motor-propuesto.md` | El recorrido de un comentario, los 4 caminos, qué se oculta y qué hay que construir | 5 min |
| `03-reglas-redes.md` | Las 15 reglas de voz que cambian en redes | 3 min |
| `04-moldes.md` | 10 escenarios con sus 13 textos, casos reales y excepciones | 10 min |
| `05-herramientas.md` | Qué se usa, qué se probó y qué falta de Meta | 3 min |

## Tus decisiones (sí, no o me corriges)

**1. 🚩 ¿Frenamos ya las respuestas públicas que traen promesas de salud?**
Es lo más urgente. Propongo que sí: que quien responde hoy deje de contestar preguntas de salud hasta que estén los moldes, y siga solo con precio y pago. Necesito que tú o Karla me digan quién responde y con qué herramienta, porque yo no lo puedo ver.

**2. ¿Quién oculta los comentarios hoy?**
No es nuestro sistema. Si es un filtro de palabras de la página, propongo revisarlo para que deje de ocultar preguntas de compra. Si es una persona, propongo la regla del archivo 02: se ocultan insultos y spam, nunca una pregunta ni una queja de alguien que compró.

**3. ¿Qué se responde cuando preguntan por Cofepris?**
No tengo la respuesta verdadera y no la voy a inventar. Hoy esos comentarios se ocultan. Necesito que me digas qué registro o aviso tiene cada producto, o si la respuesta es que no lleva.

**4. ¿Qué plazo decimos antes de la compra?**
La tienda dice «5 a 15 días hábiles desde el despacho» y el correo dice «a más tardar en 18 días desde tu compra». Propongo usar el de 18 días en todas partes, porque es el que cumplimos el 90 % de las veces, y pedirle a Shopify que cambie la política. Si prefieres otro para no asustar la venta, me dices cuál.

**5. ¿Nombramos la garantía en público?**
La página la promete (90 días VisionPure, 30 noches AlbaMed, «sin preguntas»), y hoy se nombra en casi todas las respuestas. Tú quieres devoluciones muy justificadas. Propongo **no nombrarla** en las respuestas, porque ya está en la página y cada mención invita a pedirla. Los moldes están escritos sin ella.

**6. ¿Evaluamos pago en OXXO?**
«¿Puedo pagar al recibir o en OXXO?» es la pregunta más repetida, cerca de 1 de cada 10 comentarios. No es de servicio al cliente, es una venta que se pierde. Solo te lo dejo planteado, porque la regla de hoy es que no hay.

**7. ¿Apruebas el orden de construcción?**
1. Ingreso de comentarios de anuncios y filtro de avisos de Facebook (solo lectura, no sale nada).
2. Camino C, clientas con pedido: comentario + privado + lista de Karla.
3. Camino A, ventas: precio, pago y plazo.
4. Camino B: salud, confianza, no le funcionó y Dr. Harryi.
5. Recién ahí, ver qué moldes del camino A salen solos.
Cada paso se prueba en seco con casos reales y se enciende solo con tu OK.

**8. Los moldes.** Van en `04-moldes.md`. Corrígelos como en el correo, de a uno. Los que más pesan son R04 (ya compré y no llega), R01 (precio) y R02 (pago).

## Para pasar a otros motores (no los toqué)
- **Creativos y Media buying:** la página «Oftalmólogo - Dr Arturo Sánchez» pauta el producto como si fuera un médico. Riesgo alto con Meta y legal si no hay un doctor real que lo autorice.
- **Shopify y Creativos:** la página de VisionPure dice que «frenan el avance de cataratas».
- **Jie, vía Karla:** confirmar qué ingredientes lista la etiqueta Dr. Harryi, porque una clienta dice que solo trae luteína.
- **Meta:** conectar la cuenta de Instagram a la página para poder ver esos mensajes privados.

## Qué quedó hecho esta noche
- El diagnóstico completo con datos reales (204 anuncios, 1.003 comentarios de Facebook y 70 de Instagram leídos).
- `scripts/revisar_redes.py`, el revisor de redes en borrador.
- 13 textos de moldes en `moldes/`, todos pasan el revisor.
- Los flujos de lectura en n8n quedaron apagados y no escriben nada hacia afuera.
