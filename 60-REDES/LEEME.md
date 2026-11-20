# Motor de redes sociales · a cargo de Karla (desde el 20-nov)

Martin (20-nov): «pásale el motor de redes así ella lo puede empezar a trabajar de 0 con lo que tiene». **Hoy no está construido:** solo existe el diagnóstico y la propuesta del 18-nov, que está en `30-PROPUESTAS/2026-11-18-redes/`. Karla lo toma desde ahí, con su Claude.

## Lo que ya se sabe (18-nov, con datos reales)
- A los anuncios les llegan **~34 comentarios al día en Facebook** y ~30 a la semana en Instagram.
- **El 55 % está oculto**, y entre los ocultos hay clientas a las que no les llega su pedido y gente preguntando el precio.
- **Lo que hoy se responde en público trae promesas de salud.** Por ejemplo, «te sirve perfectamente» a un operado de los ojos o «100 % segura». Es el riesgo más grande.
- Los mensajes privados están casi sin atender: 6 respuestas en 30 días.
- La idea es que redes funcione **igual que el correo**: mismas reglas de voz, moldes aprobados, Karla aprueba en su Notion y todo corre en n8n.

## Por dónde partir (sugerencia)
1. **Leer la propuesta**, en este orden: `00-LEEME.md` → `01-diagnostico.md` → `02-motor-propuesto.md` → `03-reglas-redes.md` → `04-moldes.md` (unos 25 minutos).
2. **Contestar lo que Karla ya sabe**: quién responde hoy los comentarios y con qué herramienta, y quién los oculta (decisiones 1 y 2 de la propuesta). Karla lo ve en el día a día; su Claude no lo puede ver.
3. **Corregir los 13 moldes** de `moldes/` con lo que ella sabe de las clientas. Cada uno pasa por `scripts/revisar_redes.py`.
4. **Proponer el orden de construcción** (decisión 7). El primer paso propuesto es solo lectura: traer los comentarios de los anuncios a una lista de Notion para Karla, sin responder nada.

## Lo que necesita Karla
- **Acceso a Meta Business Suite** (lo da Martin) para las páginas que tienen los anuncios: «Revista Alquimia» y «Oftalmólogo - Dr Arturo Sánchez», en la cuenta de JP2. Con eso ve y responde comentarios y mensajes a mano mientras no exista el motor.
- **n8n:** Karla no tiene acceso. Lo que haya que construir (ingreso de comentarios, filtros, avisos) se lo propone a Martin por el **buzón** (issue `para-martin`) con el diseño exacto, y lo arma la sesión de Martin.

## Lo que sigue decidiendo Martin
- **Salud y legal:** frenar las respuestas con promesas de salud (decisión 1), qué se responde sobre Cofepris (decisión 3) y la página del «Dr. Arturo Sánchez».
- **Plata y venta:** si se nombra la garantía en público (decisión 5), qué plazo se dice antes de la compra (decisión 4) y pago en OXXO (decisión 6).
- **Moldes nuevos:** ninguno sale sin el OK de Martin a la versión final, igual que en el correo.

## Reglas que ya valen en redes (aunque el motor no exista)
- **Nada de promesas de salud** («te sirve», «cura», «100 % seguro», «frena las cataratas»). Si preguntan por salud, se responde con la forma de uso y se invita a escribir por privado.
- **No ocultar** preguntas ni quejas de alguien que compró. Solo se ocultan insultos y spam.
- Mismas reglas de voz del correo (`00-REGLAS/voz.md`), más las 15 de `03-reglas-redes.md` cuando Martin las apruebe.
- **Nunca** pegar ni repetir claves o tokens de Meta que aparezcan en un resultado de n8n.
