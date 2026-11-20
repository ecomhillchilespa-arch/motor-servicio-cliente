# Moldes · Datos que faltan (A) y rescate cuando J&T no encuentra el domicilio (B)

**Estado:** A aprobado en su versión final («dale», 17-nov) y ENCENDIDO: el primer día salieron 64 de 86, y el resto sale de a 15 cada 15 minutos. B sigue apagado (`rescate_jt_enviar`) hasta resolver lo de la guía J&T.
**Flujo:** n8n `63BbJp1q9gTVVbjb` «[SAC] Datos de envío completos y rescate J&T (Alegres)», que corre cada 15 minutos. Tabla `ops_alegres_datos_envio`.

## Por qué existen
Desde el 1-sep se devolvieron 51 pedidos, ~1 % del total. 1 de cada 3 fue por «dirección incompleta» y ninguna clienta nos escribió antes.
La calibración está en `SISTEMA.md`, en la sección «Pedido con datos completos».

## A · Al comprar, si falta un dato
**Cuándo:** el pedido tiene alguno de estos problemas:
- calle de menos de 8 letras;
- código postal que no corresponde al estado;
- sin teléfono;
- sin número.

**Qué pide:** solo los campos que faltan. Si ya se le escribe, se agrega la colonia si también falta.
**Cuando responde:** el dato se le pasa a Jie como un cambio de dirección, antes del despacho.

Correcciones de Martin:
- «mensajero» y «puerta» hacen esperar la entrega al otro día, así que se sacaron.
- Cada dato va con su porqué, para que no parezca estafa. El teléfono, «para que la paquetería te pueda llamar al momento de la entrega».
- Se cierra con «no tienes que pagar nada ni entrar a ningún enlace».
- En España no hay número exterior: va «Número, piso y puerta:».
- Tiene que sentirse que estábamos trabajando: «Ya teníamos tu pedido listo para preparar y, justo antes de mandarlo, nos dimos cuenta…». Solo sale si el pedido sigue en la bodega (hay un freno en la función).

```
Hola Daniela, buenos días.

Muchas gracias por tu compra. Ya teníamos tu pedido #13250 listo para preparar y, justo antes de mandarlo, nos dimos cuenta de que nos faltan unos datos de tu dirección para que te llegue sin contratiempos.

Te pido el número exterior, para que encuentren tu casa a la primera, y un teléfono, para que la paquetería te pueda llamar al momento de la entrega. Basta con que respondas este correo. No tienes que pagar nada ni entrar a ningún enlace.

Número exterior (y el interior, si tienes):
Teléfono de contacto:

Con eso lo dejo anotado en tu envío.

Para lo que necesites, aquí estoy para servirte.

Quedo atenta,
Mariana
```

Cada dato que falta tiene su línea del formulario:

| Falta | Línea |
|---|---|
| Número | `Número exterior (y el interior, si tienes):` (en España, `Número, piso y puerta:`) |
| La calle es muy corta | `Calle y número:` |
| El código postal no corresponde al estado | `Código postal:` y `Estado:` |
| Teléfono | `Teléfono de contacto:` |
| Colonia | `Colonia:` |

## B · Respaldo, cuando J&T no encuentra el domicilio
**Cuándo:** J&T marca «dirección incompleta o incorrecta», o pasa 3 veces sin entregar. Hay unos 4 días antes de que lo devuelva.

Correcciones de Martin:
- Se sacó «respóndeme y yo lo sigo de cerca», porque no podemos hacer ese seguimiento. Ella lo resuelve directo con J&T.

```
Hola Daniela, buenos días.

¡Tu pedido #13250 ya está en tu ciudad! Muchas gracias por tu paciencia. J&T salió a entregarlo, pero no logró dar con tu domicilio.

Para que no se regrese, escríbeles por WhatsApp al 55 7100 1047 con tu número de guía JMX0000000000 y tu dirección completa, con colonia, código postal, referencias para encontrar tu casa y un teléfono de contacto. Así acuerdas la entrega directo con ellos.

Lo ideal es hacerlo hoy o mañana, porque J&T lo intenta solo por unos días.

Para lo que necesites, aquí estoy para servirte.

Quedo atenta,
Mariana
```

## Prueba en seco (17-nov, 250 pedidos del 16-nov)
- A le escribiría a 49 pedidos (20 %): 37 de México y 12 de España. A 32 de ellos les falta el teléfono: el 16 % de los pedidos no trae ninguno, porque en el checkout es opcional.
- Excepciones corregidas:
  - calles cortas que sí tienen número («Calle 2» con el número en la línea 2) ya no se marcan;
  - España pide «número, piso y puerta».
- Hay 25 pedidos de Colombia, Perú y Uruguay que quedan fuera por ahora.
- B: 2 casos hoy. **Excepción abierta:** no tenemos la guía de J&T (JMX), solo la del envío de origen (YT…). Cada aviso de J&T sí trae el teléfono de su oficina local.
