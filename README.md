# Motor de Servicio al Cliente · Alegres México — v1.0

Responde a las clientas de Alegres México (VisionPure y AlbaMed) con la voz de **Mariana**, gestiona con **Jie** (Megafulfill) lo que hace falta para resolver cada caso y lleva el **control de stock** de AlbaMed. Lo operan **Karla** (el día a día) y **Martin** (las decisiones), cada uno con su propio Claude Code sobre esta misma carpeta.

> **¿Primera vez?** Si eres Karla, parte por [`KARLA-EMPEZAR.md`](KARLA-EMPEZAR.md). Si eres Claude, parte por [`CLAUDE.md`](CLAUDE.md).

## Qué hace
| | |
|---|---|
| **Correos de clientas** | Lee cada correo, lo clasifica y redacta la respuesta con las reglas de voz y los moldes aprobados. La respuesta a «¿dónde está mi pedido?» sale sola. El resto queda listo en el Notion de Karla para que ella marque **✔ Enviar**. |
| **Gestiones con Jie** | Cambios de dirección, reenvíos y consultas. Arma el mensaje para el grupo de WhatsApp, sigue la respuesta y, cuando Jie confirma, deja listo el correo para la clienta. |
| **Lista de Karla** | «✅ Tareas de Karla» en Notion, al día cada hora: una fila por pedido, sin duplicados. Su visto quiere decir «listo». |
| **Control de stock** | Sheet «Alegres Mexico» con la venta y el despacho diarios, más lo que dicen Jie y Kevin (el fabricante). Responde: ¿alcanza el stock? y ¿Jie está despachando? |
| **Revisor** | Ningún texto para una clienta sale sin pasar `scripts/revisar_borrador.py` (y su par en Supabase). |

## Quién decide qué
- **Karla:** aprueba los correos de moldes ya aprobados, arregla fallas, mejora los flujos y anota el stock.
- **Martin:** aprueba los moldes nuevos, la plata, la salud y lo legal. No se le sugieren pedidos ni pagos.
- **Claude:** prepara, revisa y propone. Nada sale hacia afuera (clienta, Jie, Kevin) sin el OK de una persona.

## La carpeta
| | |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Instrucciones para Claude: lo primero que lee |
| [`EN-QUE-ESTAMOS.md`](EN-QUE-ESTAMOS.md) | Pendientes de hoy |
| [`00-REGLAS/`](00-REGLAS) | Voz de Mariana, criterio de soluciones y **memoria del motor** (lo que ya se corrigió) |
| [`10-FLUJOS/`](10-FLUJOS) | Qué hacer en cada tipo de caso |
| [`20-CASOS/`](20-CASOS) | Moldes y casos aprobados por Martin (el ejemplo manda sobre la teoría) |
| [`30-PROPUESTAS/`](30-PROPUESTAS) | Borradores que esperan aprobación (moldes, redes sociales) |
| [`40-STOCK/`](40-STOCK) | Control de stock: el Sheet, la rutina de Karla y el WeChat con Kevin |
| [`SISTEMA.md`](SISTEMA.md) | Mapa técnico: cada flujo de n8n, cada tabla de Supabase y cómo se conectan |
| [`CONEXIONES.md`](CONEXIONES.md) | Cómo habla el motor con Jie, Karla, Martin, Finanzas y Shopify |
| [`scripts/`](scripts) | Revisor de borradores y de redes, compilador de guiones |

## Las piezas (resumen; el detalle está en `SISTEMA.md`)
- **Supabase** (`sac-multitienda`): correos, la cola de respuestas, las órdenes, el rastreo, las gestiones con Jie y la configuración.
- **n8n:**
  - WF-R1 redacta y WF-R2 envía;
  - K1 encola lo que Karla aprueba, K2 lee sus marcas y K3 mantiene su lista;
  - otro flujo actualiza el stock cada día.
- **Notion:** «✅ Tareas de Karla».
- **Google Sheets:** «Alegres Mexico», con las pestañas STOCK.
- **WhatsApp** (solo lectura): grupo Alegres Store con Jie.
- **WeChat:** grupo con Kevin. No se lee; lo acordado se anota en el Sheet.

## Cómo se trabaja entre dos
1. Al empezar: `git pull`.
2. Después de cambiar una regla, un molde o el mapa: commit con un mensaje simple en español y `git push`.
3. Si alguien corrige algo que sirve para siempre, se anota en `00-REGLAS/memoria-del-motor.md`.

## Versiones
Ver [`CAMBIOS.md`](CAMBIOS.md).

*Repositorio privado. Contiene nombres de pila de clientas y datos internos: no hacerlo público.*
