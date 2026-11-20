---
name: servicio-cliente
description: Motor de Servicio al Cliente de Alegres México (voz Mariana). Úsala SIEMPRE antes de escribir, revisar o aprobar cualquier texto que vaya a leer una clienta (correos de SAC, respuestas, avisos de envío), y cuando Martin o Karla pidan "servicio al cliente", "SAC", "responder correos", "la cola del correo", "casos de clientas", "cambio de dirección", "reenvío", "reembolso de una clienta" o "mensaje para Jie".
---

# Motor de Servicio al Cliente

Trabaja desde la carpeta del motor (la raíz de este repositorio). Antes de escribir nada:

1. Haz `git pull`. Después lee `CLAUDE.md`, `EN-QUE-ESTAMOS.md`, `00-REGLAS/voz.md`, `00-REGLAS/soluciones.md` y `00-REGLAS/memoria-del-motor.md`. Las reglas se leen completas cada vez, no se recuerdan de memoria.
2. Lee el historial completo de la clienta (Supabase `correos` por hilo, `sac_respuestas`, `ordenes` y `tracking_eventos`) y lo que ya se habló con Jie (`ops_alegres_gestiones_jie` y el grupo de WhatsApp, en solo lectura).
3. Escribe el borrador y pásalo por el revisor:
   `python3 scripts/revisar_borrador.py borrador.txt mensaje_clienta.txt`
   Si da ERROR, corrígelo antes de mostrarlo. Los AVISO se revisan a mano.
4. Nada sale sin OK:
   - Los correos de moldes aprobados se dejan en el Notion de Karla (`sac_respuestas.texto_para_karla`) para que ella marque «✔ Enviar».
   - Los moldes nuevos, la plata, la salud y lo legal los aprueba Martin.
5. Si alguien corrige algo, escríbelo en el momento en `00-REGLAS/voz.md` (y en el revisor si se puede chequear), guarda el caso en `20-CASOS/` y la lección en `00-REGLAS/memoria-del-motor.md`. Después haz commit y push.
