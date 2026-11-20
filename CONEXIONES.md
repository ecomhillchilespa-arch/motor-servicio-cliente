# Cómo el Motor de Servicio al Cliente habla con el resto del negocio

| Área | Qué le pasa el motor | Qué recibe | Por dónde |
|---|---|---|---|
| **Jie (Megafulfill)** | Cambios de dirección, reenvíos, cancelaciones, consultas | Sus respuestas y lo que nos pide (direcciones, datos) | Tabla `ops_alegres_gestiones_jie` (Supabase SAC). La tarea «mensaje-diario-jie» (19:30) arma un solo mensaje al día. Martin lo pega en el grupo Alegres Store. Nunca se le repite algo que ya se pidió |
| **Karla (SAC)** | Solo lo que ella tiene que hacer, con su acción | Lo que ella le pidió a Jie (el motor lo sigue) | Mensaje «Para Karla» en Slack #suppliers |
| **Martin** | Solo acciones: 🚩 urgentes, aprobar respuestas, decidir casos | Aprobaciones y contexto | Mensaje «Para Martin» en Slack #suppliers, y conversación con esta sesión |
| **Control Megafulfill** (la otra sesión, dueña del código) | Los reenvíos pedidos por SAC (si Jie reenvía, el cobro original no se reclama; si cobra el reenvío a precio completo, se revisa) | Alertas de cobros | `control-megafulfill/CONTEXTO.md` (sección «Casos SAC y reenvíos») y la tabla de gestiones |
| **Finanzas** (sesión «💰 Finanzas», dueña de los datos de plata) | El costo de los reenvíos por error nuestro (para el profit) | Cualquier dato de plata (caja, profit, deuda con Jie): se le pide a esa sesión, no se calcula por cuenta propia | La tabla de gestiones (tipo reenvio + nota «costo nuestro»). Tablero: http://localhost:8765/finanzas/ |
| **Motor Shopify** | Pedidos que no deben entrar a campañas (reclamos abiertos, no entregados) y links de ebooks | Segmentos y links | `~/handoff-shopify` |
| **Parte diario del jefe** | Una línea cuando pasa algo relevante (falla grave, cambio de regla, cifra) | — | `/Users/martinzuniga/Downloads/ALG-Master Dropshipping/PARTE-DIARIO.md` |

## Reglas de convivencia
- El motor **no le escribe a Jie, a Karla ni a ninguna clienta** sin el OK de Martin. Los correos aprobados se encolan en `sac_respuestas` (estado `en_cola`, `origen_envio` = 'humano') y los envía el workflow WF-R2.
- **Solo lectura de WhatsApp** (base local del Mac). Nunca se escribe ahí.
- **Al resto se le pide por mensaje, no se toca lo suyo.** El código del control lo cambia solo la sesión Control Megafulfill; la tabla de gestiones la mueven el motor y la tarea diaria.

## Karla y Jie por Notion (18-nov)
Los pendientes de Karla ya no van por Slack. Van a la base de Notion «✅ Tareas de Karla» (collection://41ce3bfc-6a93-81f6-8c34-000bc2681b69), con Área = Servicio al cliente o Jie. Una fila por pedido y tarea, con las columnas Pedido, Estado (⏳ 👀 ✅ ✖️), Tipo (Contactar Cliente · Escribir a Megafulfill · Actualizar Sheet · Otro), Vence, Nota Claude y Nota Karla (esquema del 18-nov).
Cómo llega una gestión a Jie:
1. El motor crea la fila en `ops_alegres_gestiones_jie` (por_enviar).
2. La tarea de las 19:30 arma el mensaje en inglés y lo deja como tarea de Karla en Notion.
3. Karla lo manda por WhatsApp al grupo Alegres Store, donde ahora está también el asistente de Jie.
4. La tarea lee el WhatsApp (solo lectura) y marca jie_hecho.
5. El correo aprobado a la clienta sale solo.

## Nada hecho sin prueba (18-nov)
- En Notion, una tarea ✅ necesita la columna **Prueba**: la guía (reenvío), el reembolso visible en Shopify, o el mensaje visto en el WhatsApp. Sin prueba, la tarea vuelve a 👀.
- Un reenvío solo pasa a jie_hecho y le escribe a la clienta si Jie respondió con un número de guía: trigger `trg_ops_alegres_reenvio_exige_guia`.
- Lo que se queda pegado lo desbloquea Karla con una tarea «Desbloquear» en su Notion. A Martin le llega solo lo que ella no pudo.

## Traspaso a Karla (18-nov)
- Martin se desliga del día a día. Karla trabaja con «✅ Tareas de Karla», con las vistas «Por hacer hoy» y «En espera», y deja dudas o ideas en «💬 Notas de Karla para el motor» (collection://41ce3bfc-6a93-81f4-8a2d-000b46c3e128).
- La guía para Karla está en Notion: «Cómo trabajar con el motor de servicio al cliente», en su página.
- La tarea programada `motor-sac` corre a las 9, 12, 15, 18 y 21 h: contesta las notas de Karla, verifica las pruebas, procesa las respuestas de Jie y de las clientas, mantiene la lista y prepara las respuestas con moldes aprobados.
- `ops_alegres_config.motor_auto_moldes`:
  - false (por ahora): el motor le deja a Karla el texto listo;
  - true: lo manda solo.
- A Martin solo le llegan por Slack las decisiones: casos sin molde, plata, salud y legal.
