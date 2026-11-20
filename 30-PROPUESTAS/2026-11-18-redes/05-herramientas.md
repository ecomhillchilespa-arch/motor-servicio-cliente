# 05 · Herramientas · qué se usa y qué no

## Recomendación: seguir con lo que ya tenemos
n8n + Supabase + Notion, igual que el correo. No hay que pagar nada nuevo.
- El esqueleto de redes ya existe en n8n (ingreso, borradores, envío) y las tablas ya existen en Supabase.
- Karla ya trabaja en Notion y ya sabe aprobar con «✔ Enviar».
- Las reglas, el revisor y los moldes quedan en un solo lugar para correo y redes.
- Corre en n8n, no en tareas programadas de Claude, así que no se corta.

## Lo que se probó esta noche
| Qué | Resultado |
|---|---|
| Leer los comentarios de los anuncios de Facebook | Funciona, con la conexión de la cuenta JP2 más el permiso de cada página |
| Leer los comentarios de los anuncios de Instagram | Funciona |
| Leer mensajes privados de Facebook | Ya funcionaba |
| Leer mensajes privados de Instagram | No se puede: falta conectar una cuenta de Instagram profesional a la página |
| Responder, ocultar o mandar un privado | **No se probó.** Es una acción hacia afuera y espera tu OK |

## Lo que falta de parte de Meta
1. **Conectar la cuenta de Instagram a la página** (lo haces tú o quien administre la página, en la configuración de Meta). Sin eso no se ven los privados de Instagram.
2. **Aviso inmediato en vez de revisar cada 15 minutos.** Meta puede avisar al instante cada comentario nuevo. Es mejor, pero necesita que la aplicación de Meta esté configurada para eso. Se parte revisando cada 15 minutos, que alcanza de sobra.
3. **Ventana de 7 días para privados.** Por defecto Meta deja responder un privado durante 24 horas. Para llegar a 7 días hay que pedirle a Meta el permiso de «agente humano». Mientras tanto, la regla es responder el mismo día.

## Lo que evalué y no recomiendo por ahora
| Herramienta | Para qué sirve | Por qué no ahora |
|---|---|---|
| Bandeja de Meta Business Suite con respuestas guardadas | Responder a mano más rápido | No cruza con el pedido, no pasa el revisor, no deja registro. Es lo que hay hoy y así salieron los claims |
| Respuestas automáticas de Meta por palabra clave | Contestar «precio» solo | Solo sirve para privados y no distingue una queja de una pregunta |
| ManyChat o parecidos | Comentario → privado automático | Tiene costo mensual, es otro sistema con otras reglas, y lo mismo se hace en n8n |
| Mesa de ayuda (Zendesk, Gorgias, etc.) | Todo en una bandeja | Caro para este volumen y habría que rehacer lo del correo |
| Filtro de palabras de la página | Ocultar groserías solo | **Sí sirve y es gratis**, pero primero hay que ver qué lista tiene puesta hoy, porque algo está ocultando preguntas de compra |

## Lo que no se hace
- No se usan herramientas que respondan solas con IA sin molde aprobado. Eso es lo que hay hoy.
- No se compran reseñas ni comentarios.
