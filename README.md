# 🌌 Cosmos Monorepo

Este es el repositorio **monorepo** de Cosmos, que contiene el backend y el frontend de la aplicación.  

---

## 🚀 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) v14+

---

## ⚙️ Instalación

1. Clona el repositorio y entra en la carpeta del proyecto:

git clone https://github.com/EngFelipe14/Cosmos.git
cd cosmos
Instala las dependencias en backend y frontend:

```bash

cd backend
npm install

cd ../frontend
npm install
```

🗄️ Configuración de base de datos
Dirígete a la carpeta /doc y abre PostgreSQL.

Ejecuta los siguientes scripts en orden:

db.sql → crea las tablas necesarias

insert.municipios.todo.sql → rellena las tablas con todos los municipios de Colombia

🔑 Variables de entorno
En la carpeta /backend, crea un archivo .env con el siguiente contenido:

```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=SuUsuario    # Solo cambia las de su DB, las otras deben permicer igual
DB_PASSWORD=password
DB_NAME=cosmos
GOOGLE_CLIENT_ID=1018415840565-tfgk0pvjstpqkie2jvkqecfkrv4efcqi.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
JWT_SECRET=662b7f1c88ba7f278bc7a8e874ac4b8d7a543fcf0f6a739d6c91c4b7d0daffcb
OPENWEATHER_KEY=c13706144f814c5a2790f1e568b56266
```

▶️ Ejecución
Levanta el backend en modo desarrollo:

```bash
cd backend
npm run dev
```

Luego levanta el frontend en otro terminal:

```bash
cd frontend
npm run dev
```

📂 Estructura del proyecto

![alt text](Cosmos/doc/image.png)

![alt text](Cosmos/doc/image-1.png)
