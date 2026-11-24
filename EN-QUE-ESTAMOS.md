# En qué estamos (pendientes del motor)

*Lo que está abierto hoy. Quien cierre algo lo saca de aquí, y quien abra algo nuevo lo agrega. Lo más nuevo va arriba. Última actualización: 20-nov, por Martin con Claude.*

## Esperando a Karla
- **Respuestas de Jie del chat exportado (24-nov, Karla con Claude):** se anotaron en Notion 13 cambios que Jie ya hizo, 11 con guía nueva del 21-nov y 2 confirmados por Mona: #13049, #13643, #13669, #13635, #13335, #13691, #13689, #13097, #13518, #13547, #13728, #13126 y #13159. Los correos de confirmación salen a la lista de Karla para «✔ Enviar». #12163, #12439, #13405 y #10596 ya iban despachados y Jie dice que no se puede cambiar la dirección hasta el primer intento fallido. #12779 sigue sin respuesta. #3173: Jie preguntó «3173?» el 21-nov y falta aclararle. AlbaMed: Jie tiene 178 en bodega y 487 en camino (sin fecha).
- **Sheet de cambios de dirección para Jie (23-nov):** se mandaron juntos 97 cambios de dirección y la consulta del #12779 en «Alegres - Address changes for Jie (Nov 23, with shipped orders)», en el Drive de contacto@. Está dividido en dos partes: 85 pedidos en bodega y 13 ya despachados. Se le pidió a Jie que trabajemos siempre con este formato. En Supabase quedaron como `enviado`. Cuando Jie marque «Done», hay que pasarlo a Notion (Prueba + ✅) para que salgan los correos.
- **4 clientas esperando desde el 18-nov, ahora las decide Karla** (Martin, 20-nov: «ella ahora está a cargo de ese motor»). Están en su lista con contexto y propuesta: #10361 (reembolso, ya aprobado por Martin el 18-nov), #13117 (primero Jie, después reembolso), #9896 (completar reposición) y #11233 (reembolso, pero **lo consulta con Martin** por salud y riesgo legal). Los correos de reembolso salen solos cuando la devolución aparece en Shopify.
- **3 correos de cambio de dirección** corregidos el 23-nov y listos para «✔ Enviar»: #12051, #12788 y #13340. #13371 y #13370 ya se habían mandado el 20-nov desde el correo de la tienda: quedaron cerrados.
- **9 correos de «¿dónde está mi pedido?»** corregidos el 23-nov (disculpa y fecha solo si preguntó) y listos para «✔ Enviar». **#13405** espera que Karla le mande a Jie la dirección completa, que la clienta dio el 19-nov y nunca se pasó; después sale el correo. **#9896** listo para «✔ Enviar»: Karla confirmó que la guía YT2631701400390627 lleva las 3 férulas.
- **Para proponerle a Martin:** cuando una clienta responde con los datos que le pedimos (como en #13405), no se crea la gestión para Jie. Hay que ver por qué.
- **Ojo con los textos que se arman solos:** el 23-nov 3 de 5 venían mal. #12051 decía «ya está en México» cuando estaba en el aeropuerto de salida, porque la etapa `transito_nacional` se marca antes de que el paquete salga de China. En #12788 y #13340, Jie cambió la guía después de que se armó el texto. Hay que revisar si conviene proponerle a Martin un arreglo de raíz.

## Esperando a Martin (decisiones)
- **Un permiso para Karla** (issue #1, 23-nov): **editora en el Sheet «Alegres Mexico».** Hoy solo puede verlo, así que su Claude no anota el stock. (Lo de ser miembro en el Notion de ecomhill quedó listo el 23-nov: su Claude ya lee sus dos listas.)
- **Roca R2:** el reporte semanal de Karla parte el viernes 27-nov. Falta que Martin le mande el mensaje una vez.
- **Molde «tu reenvío ya salió»**: lo aprueba Martin. Hay 17 reenvíos ya despachados sin correo a la clienta.
- **Molde B (rescate J&T)**: lo aprueba Martin.
- **#4562, #11621 y #3073**: Karla los archivó sin mandarlos a Jie y parecen casos viejos ya resueltos. ¿Se cierran?
- **Redes sociales:** desde el 20-nov las lleva Karla (`60-REDES/LEEME.md`). A Martin le quedan las decisiones de salud, legal y plata (1, 3, 4, 5 y 6). Karla ya tiene acceso a Meta Business Suite y al correo de la tienda (20-nov).

## Stock (ver `40-STOCK/LEEME.md`)
- **Desde el 20-nov Karla anota el stock en su Notion** (conteo, llegadas y fechas confirmadas) y M2 lo pasa al Sheet. Revisar que la primera vez quede bien en el Sheet.
- **Hoy, 20-nov, vencía la promesa de Jie** de despachar todo el atraso de AlbaMed (el lote de 1.400). Según los datos, desde el 15-nov casi no ha salido nada. Hay que confirmar con Jie.
- Los lotes de 600 y de 1.500 (bolsa QuietLab) estaban **sin fecha** de llegada. Mientras no tengan fecha, el Sheet no los cuenta.
- Las 5.000 bolsas y los 5.000 manuales llegaban del 26 al 28-nov.
- **El Sheet no tiene nada anotado desde el 17-nov.** Hay 2 encargos con llegada vencida sin «Llegó». Karla tiene que pedirle a Jie el conteo y confirmar si llegaron las 1.400; después se anota.
- No se sabe si el grupo de WeChat ya existe con Karla adentro.
- Pendientes: extender la vista STOCK más allá del 31-dic, definir con Martin los avisos a Slack y retirar el flujo viejo de Notion `otIQ0Q7plk23X4Yb` (espera el OK de Martin).

## Por hacer (motor)
- **Scorecard EOS de Karla (20-nov):** dos números automáticos (`SISTEMA.md`, sección «Scorecard EOS de Karla»). El de gestiones depende de que alguien marque las respuestas de Jie; hoy lo hacen las tareas de Claude del Mac de Martin. Falta que `clienta_avisada_at` se marque también cuando sale un correo por la lista de Karla.
- **«Jie confirmó → correo» encendido el 20-nov.** Revisar en unos días cuántos llegaron a la lista de Karla y cuántos quedaron como excepción.
- **Moldes nuevos** que pidió Martin, para mostrárselos con casos reales:
  - pedido fuera de México (#12505 Uruguay y #13338 Colombia esperan este molde);
  - AlbaMed sin stock (la base es `20-CASOS/2026-11-17-albamed-atraso-stock.md`);
  - caso con conversación previa.
- **#10655**: Jie respondió «Delivery failed due to incorrect address» (está en la columna Prueba del Notion), pero la gestión sigue como «enviado». Hay que contactar a la clienta por la dirección.
- **Correos mandados a mano fuera de la voz de Mariana** desde el correo de la tienda («Estimada Mayce…» y «Le notificamos que el pedido ya está en camino…», con la guía de origen y sin enlace). Si son de Karla, desde ahora deberían pasar por el motor.
- **142 correos en `esperando_humano`** desde el 18-nov. Unos 90 son cambios de datos, que avanzan por las tareas de Megafulfill.
- **Viejos:**
  - aviso proactivo de AlbaMed y QuietLab;
  - cerrar los 40 «agradece» y mandar el libro a 6;
  - alerta de 20 días sin rastreo;
  - pedirle a Jie la retención de 7 días de J&T;
  - recompilar los guiones;
  - disputa de PayPal del #10908.

## Ojo
- La tarea programada `mensaje-diario-jie` (Mac de Martin) sigue prendida y crea gestiones en bloque. El 19-nov creó unas 37 de una vez.
