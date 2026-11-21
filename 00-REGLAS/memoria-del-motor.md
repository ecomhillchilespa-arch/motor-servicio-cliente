# Memoria del motor (lo que Martin y Karla ya corrigieron)

*Lo comparten todas las sesiones de Claude que trabajan en esta carpeta, la de Martin y la de Karla. Si alguien corrige algo que sirve para siempre, se agrega aquí en el momento (una entrada corta: qué, quién, cuándo, por qué y cómo aplicarlo) y se sube a GitHub.*

## Cómo se trabaja

**Armar el sistema, no atender caso a caso** (Martin, 16-nov). «Estamos armando sistemas acá.» Cada caso que se muestra sirve para sacar un molde o una regla que después se aplica solo a todos los de su tipo. Se calibra con 1 o 2 ejemplos, se aprueba el molde, se aplica en lote y se automatiza lo que se pueda. A Martin se le muestran solo las excepciones y las decisiones.

**Ningún molde se activa sin el OK de Martin a la versión final** (Martin, 17-nov, dos veces: «cualquier molde siempre debe ser aprobado»).
- Antes de activar un molde, se corre en seco sobre los casos reales donde se usaría: cuántos serían, cómo sale en cada uno y cuáles son las excepciones.
- Se enciende con un interruptor apagado. Se le muestran a Martin el conteo, 2 o 3 ejemplos reales y las excepciones, y recién ahí se activa.
- Si el texto cambió después de su último OK, se le muestra de nuevo.

**Cada molde nuevo trae su arreglo de raíz** (Martin, 17-nov). Antes de cerrarlo se pregunta por qué pasa: se mide la causa con datos, se propone el arreglo (una alerta, un cambio en la página, un aviso a Jie o a Creativos) y después se hace el molde.

**Reembolsos, solo muy justificados** (Martin, 17-nov: «soy bien corto con las devoluciones»).
- Primero se entiende el caso y, si hace falta, se pide evidencia.
- Solo se trabajan los casos en que la clienta habló última.
- Al presentarle un caso a Martin va el contexto completo: qué dijo ella, qué hicimos antes y por qué la propuesta tiene sentido. Las reglas están en `soluciones.md`.

**Antes de decir «nunca se hizo», revisar el WhatsApp** (Martin, 18-nov). Karla gestiona mucho a mano con Jie. De 13 pedidos que se daban como «nunca pedidos», Karla ya había pedido 8. Se busca el número de pedido en el grupo Alegres Store, en solo lectura, antes de cargar un reenvío o pedir algo de nuevo.

## Karla y su Notion

**Karla aprueba los correos** (desde el 18-nov). Martin salió del día a día. Los correos de moldes ya aprobados los prepara el motor en «✅ Tareas de Karla» con el texto listo, y Karla marca «✔ Enviar». A Martin solo le llegan las decisiones: moldes nuevos, plata, salud y legal.

**El visto de Karla significa «listo»** (19-nov: «le doy al lado y ya ✅»).
- Karla marca el casillero «Archivar» cuando termina una tarea y nunca usa Estado ✅.
- El sistema se adapta a lo que ella hace. Una tarea archivada no vuelve; solo vuelve si aparece un paso nuevo distinto.
- La excepción son los correos para la clienta: archivarlos no los manda, así que vuelven con una nota que pide marcar «✔ Enviar».
- Antes de pedirle a alguien que cambie cómo marca algo, se mira en los datos qué hace de verdad.

**Karla trabaja en Notion, no en Slack** (Martin, 20-nov: «quiero que use harto el Notion»). Todo lo suyo llega a una de sus dos listas: «✅ Tareas de Karla» (clientas) o «🤝 Megafulfill» (cobros mal hechos, stock de AlbaMed y pendientes con Jie).

**Lo que es para Karla se lo manda el motor, por Notion o por correo** (Martin, 20-nov, en la reunión semanal con la sesión CEO: «¿por qué no se lo manda el mismo motor?… mandemos a Karla las cosas por correo o por Notion también, en caso que sea tarea. Esos son los canales de comunicación con ella»). Si es tarea, va como fila en su Notion (casi siempre en «🤝 Megafulfill» o «✅ Tareas de Karla»), con la explicación completa. Martin no hace de mensajero. El correo a Karla nunca sale desde contacto@ (ese se usa solo para leer).

## Textos para clientas

**La fecha de llegada se esconde salvo que pregunten** (Martin, 20-nov: «nuestros tiempos de envío son malos y siempre trato de ocultarlos»). Se da el enlace de rastreo. La fecha solo va si la clienta pregunta cuándo llega o si llega en menos de 7 días. Está en la regla 10 de `voz.md`.

**Sin acuses vacíos.** El correo de cambio de dirección sale solo cuando Jie confirma, en un solo correo con el resultado. Jie confirma en unas 9 horas (mediana) y como máximo en 32. Si pasan 2 días y la clienta vuelve a escribir, se le da algo real.

## Cobros

**Karla reclama los cobros mal hechos** (Martin, 20-nov: «sí quiero que ella reclame la plata, si al final ya está decidido en el doc qué hay que hacer»). Le llegan a «🤝 Megafulfill» con el mensaje para Jie listo. Reclama solo lo acordado (los precios de `50-COBROS/LEEME.md` y el estuche y el cepillo a 0). Lo que está en negociación, los pagos, los saldos y las discusiones de precio siguen siendo de Martin.

## Stock

**No se le sugieren pedidos ni pagos a Martin** (Martin, 18-nov). Encargar a la fábrica lo resuelve Jie, que cobra al despachar. Ni el Sheet ni Claude proponen cuánto pedir ni cuánto pagar. A Martin se le pasan datos, no «hay que pedir N». Los pagos son de Martin y solo como última opción. Ver `40-STOCK/LEEME.md`.

**El Sheet es la memoria del stock.** Lo que se acuerda en WeChat (que el motor no puede leer) se anota en el Sheet, o no existe. Los mensajes a Jie y a Kevin los mandan Martin o Karla, nunca Claude.

## Errores que ya pasaron (para no repetirlos)

- **19-nov:** la columna «✔ Enviar» quedó sin nombre al agregar columnas en Notion y el envío falló un día entero. Si un flujo dice «Could not find property», lo primero es revisar los nombres de las columnas.
- **19-nov:** la lista de Karla no tenía de dónde sacar correos, porque el filtro pedía «sale solo» y esos ya salían solos. Antes de dar por hecho que un flujo funciona, hay que contar cuántas cosas pasaron de verdad por él.
- **17-nov:** a un pedido se le escribió «Hola Alma» con el nombre del ejemplo del molde. El nombre siempre sale del pedido o de la firma de la clienta, nunca del ejemplo.
