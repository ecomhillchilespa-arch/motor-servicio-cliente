# Karla: cómo empezar a trabajar en el motor con Claude

Con esto vas a tener en tu Mac lo mismo que Martin: la misma carpeta, las mismas reglas, los mismos moldes y lo que ya aprendimos. Le hablas a Claude como si fuera un compañero que conoce todo el servicio al cliente de Alegres. Toma unos 30 minutos y se hace una sola vez.

## 1. Lo que necesitas antes
- **Tu Mac**, con la app de **Claude** instalada (claude.ai/download) y tu sesión iniciada.
- **WhatsApp de escritorio** en tu Mac, con tu cuenta, para que Claude pueda leer el grupo Alegres Store. Solo lo lee, nunca escribe.
- **Una cuenta de GitHub** (github.com, es gratis). Mándale tu nombre de usuario a Martin.

## 2. Bajar la carpeta del motor
1. Martin te agrega al repositorio. Te llega un correo de GitHub: aprieta «Accept invitation».
2. Instala **GitHub Desktop** (desktop.github.com) y entra con tu cuenta de GitHub.
3. En GitHub Desktop: **File → Clone repository**, elige `motor-servicio-cliente` y guárdalo en tu carpeta de usuario.

## 3. Abrir la carpeta en Claude
1. Abre la app de Claude y entra en la pestaña **Code**.
2. Elige la carpeta `motor-servicio-cliente` que acabas de bajar.
3. Escribe: «Hola, soy Karla. Haz git pull y dime en qué está el motor hoy.»

Claude lee solo las reglas de voz, los moldes, el mapa del sistema y la memoria. No tienes que explicarle nada desde cero.

## 4. Conectar las herramientas (con tu usuario)
En claude.ai, entra a **Settings → Connectors** y conecta:
- **Notion**, con tu cuenta. Es donde está tu lista «✅ Tareas de Karla».
- **Supabase**. Martin te invita a la organización con tu correo; acepta la invitación y después conéctalo.
- **n8n**. Martin te crea un usuario en el n8n de la tienda y te dice cómo conectarlo.

La primera vez que Claude intente leer el WhatsApp, tu Mac puede pedir permiso de «Acceso total al disco». Dáselo a Claude, porque sin eso no ve el grupo.

## 5. Qué puedes pedirle
- «Revisa por qué se duplicó esta tarea» o «esto no funcionó, arréglalo».
- «Esta clienta preguntó X y no hay respuesta aprobada. Arma una propuesta para Martin.»
- «Corrige este texto: en vez de decir X, que diga Y.» Si es dentro de un molde aprobado, queda al tiro.
- «¿Qué tengo pendiente hoy?» o «¿Qué le falta responder a Jie?»

**Lo que decide Martin** (Claude te lo deja como propuesta y le avisa): moldes nuevos, plata y reembolsos, salud y legal.

## 6. Para no pisarnos con Martin
- Al empezar, pídele a Claude «haz git pull».
- Cuando cambies algo, pídele «guarda y sube el cambio». Claude hace el commit y el push.
- Si corriges algo que sirve para siempre, dile «anótalo en la memoria del motor».

## 7. Lo de siempre en tu Notion (no cambia)
- Tu visto al lado de la tarea significa «listo». Sigue igual.
- Los **correos para la clienta** son la única excepción: para que salgan, marca **✔ Enviar**. Si solo los archivas, vuelven con una nota.
- No cambies el nombre de las columnas, porque el motor las busca por nombre.
