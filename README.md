# Career Services UP

Sitio web del departamento de Career Services de la Universidad Panamericana.

Es un sitio **informativo**: los alumnos no inician sesión. Lo único con acceso restringido es el panel de administración, donde Career Services edita cifras, eventos e historias.

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + Vite + TailwindCSS 4 |
| Backend | NestJS 11 + TypeORM |
| Base de datos | PostgreSQL 16 |
| Entorno | Docker Compose |

Documentación relacionada:
- **[docs/BASE-DE-DATOS.md](docs/BASE-DE-DATOS.md)** — cómo cambiar una tabla y hacer migraciones
- **[docs/API.md](docs/API.md)** — todos los endpoints con ejemplos

---

## 1. Requisitos

Solo hacen falta dos cosas:

| Herramienta | Para qué |
|---|---|
| **Docker Desktop** | Corre todo. Indispensable. |
| **Git** | Clonar el repositorio. |

Node.js y PostgreSQL **no** se instalan: viven dentro de los contenedores.

Opcional pero recomendado: **VS Code** con la extensión **WSL** (si usas Windows) y un cliente de base de datos como **DBeaver** o **TablePlus**.

### Si usas Windows: lee esto primero

El proyecto se trabaja dentro de **WSL2 (Ubuntu)**, no en PowerShell ni en CMD.

1. Instala WSL2 desde PowerShell **como administrador** y reinicia:
   ```powershell
   wsl --install
   ```

2. En Docker Desktop: `Settings` → `Resources` → `WSL Integration` → activa **Ubuntu** → `Apply & Restart`

3. Abre la terminal de **Ubuntu** (menú Inicio → "Ubuntu"). Todos los comandos de este documento van ahí.

> ### Regla de oro de WSL
>
> El proyecto debe vivir en el disco de Linux (`/home/tu-usuario/...`), **nunca** en `/mnt/c/Users/...`.
>
> En la carpeta de Windows, Docker va diez veces más lento y la recarga en caliente deja de funcionar.
>
> Esos archivos sí se ven desde el Explorador: escribe `\\wsl$\Ubuntu\home\tu-usuario` en la barra de direcciones.

---

## 2. Instalación (primera vez)

```bash
cd ~
git clone https://github.com/USUARIO/career-services-up.git
cd career-services-up
cp .env.example .env
```

**Abre el `.env` y cambia tres valores antes de continuar:**

| Variable | Qué poner |
|---|---|
| `POSTGRES_PASSWORD` | Cualquier contraseña |
| `JWT_SECRET` | Genéralo con `openssl rand -base64 48` |
| `ADMIN_CONTRASENA` | La contraseña con la que entrarás al panel |

Luego levanta todo:

```bash
docker compose up --build
```

La primera vez tarda entre 3 y 10 minutos: descarga PostgreSQL y Node, e instala dependencias. Las siguientes veces arranca en segundos.

**Las tablas se crean solas.** El backend aplica las migraciones pendientes al arrancar, así que no hay nada que ejecutar a mano.

### Carga el contenido inicial

En **otra terminal**, con los contenedores ya corriendo:

```bash
docker compose exec backend npm run semilla
```

Esto crea el usuario del panel y mete las cifras del documento de arquitectura. Es idempotente: correrlo dos veces no duplica nada.

### Comprueba que quedó

```bash
docker compose ps
```

Los tres servicios deben decir `running`, y `cs_db` debe decir `healthy`.

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Panel de administración | http://localhost:5173/panel-interno |
| API | http://localhost:3000/api |
| Base de datos | `localhost:5432` |

Prueba la cadena completa:

```bash
curl http://localhost:3000/api/cifras
```

Si devuelve las seis cifras en JSON, el backend y la base están conectados. Abre http://localhost:5173 y deberían aparecer también ahí: eso confirma que el frontend llega al backend.

---

## 3. Comandos del día a día

### Encender y apagar

```bash
docker compose up -d              # enciende en segundo plano
docker compose down               # apaga (LOS DATOS SE CONSERVAN)
docker compose restart backend    # reinicia un solo servicio
```

> ### Cuidado con `down -v`
>
> ```bash
> docker compose down -v    # ← ESTO BORRA LA BASE DE DATOS COMPLETA
> ```
>
> La bandera `-v` elimina el volumen `pgdata`, donde vive PostgreSQL. **No hay forma de recuperar los datos.**
>
> Para apagar normalmente, siempre `docker compose down` a secas.
>
> Apagar la computadora, reiniciar Docker Desktop o cerrar la terminal **no** borran nada.

### Ver los logs

Si levantaste con `-d`, los logs no se ven solos. Se piden:

```bash
docker compose logs -f backend          # backend en vivo
docker compose logs -f frontend         # frontend en vivo
docker compose logs -f --tail=30 db     # base de datos, últimas 30 líneas
docker compose logs -f                  # los tres mezclados
```

`Ctrl+C` sale de los logs **sin apagar nada**.

Qué esperar en cada uno:

- **Backend**: `Nest application successfully started` y la lista de rutas registradas.
- **Frontend**: al guardar un archivo debe aparecer `[vite] hmr update /src/...`. Si no aparece, el proyecto está en `/mnt/c/`.

### Entrar a los contenedores

```bash
docker compose exec backend sh                                 # shell del backend
docker compose exec db psql -U career -d career_services       # consola de PostgreSQL
```

Dentro de `psql`: `\dt` lista las tablas, `\d eventos` describe una, `\q` sale.

### Instalar librerías

Siempre **dentro** del contenedor, para que el `package.json` quede sincronizado:

```bash
docker compose exec backend npm install nombre-libreria
docker compose exec frontend npm install nombre-libreria
```

Después reconstruye para que quede en la imagen:

```bash
docker compose up -d --build
```

---

## 4. Trabajar en equipo

### Antes de empezar a programar

```bash
git pull
docker compose up -d --build
```

El `--build` importa: si el otro instaló una librería, sin esto tu contenedor no la tendrá. Las migraciones nuevas se aplican solas al arrancar.

### Al terminar

```bash
git add .
git status --short     # revisa qué se va a subir
git commit -m "descripción del cambio"
git push
```

Si `git status` muestra cientos o miles de archivos, algo se está colando (casi siempre `node_modules`). Párale y revisa el `.gitignore`.

### Qué NO se sube nunca

| Archivo | Por qué |
|---|---|
| `.env` | Contraseñas y el secreto de los tokens |
| `frontend/.env.production` | La ruta real del panel |
| `node_modules/` | Se instala solo en los contenedores |
| `dist/` | Código compilado |

Comprueba que el `.env` está protegido:

```bash
git check-ignore -v .env
```

Ese comando **tiene** que devolver una línea. Si no devuelve nada, tus credenciales se irían a GitHub.

---

## 5. Estructura del proyecto

```
career-services-up/
├── docker-compose.yml       # define los 3 servicios
├── .env                     # credenciales (NO se sube)
├── .env.example             # plantilla (sí se sube)
├── docs/
│   ├── BASE-DE-DATOS.md     # migraciones y cambios de esquema
│   └── API.md               # referencia de endpoints
│
├── backend/                 # NestJS + TypeORM
│   ├── Dockerfile           # produccion (imagen compilada)
│   ├── Dockerfile.dev       # desarrollo (recarga en caliente)
│   └── src/
│       ├── main.ts              # arranque, CORS, validación global
│       ├── app.module.ts        # registro de módulos y conexión
│       ├── configuracion.ts     # lectura de variables de entorno
│       ├── data-source.ts       # config del CLI de migraciones
│       ├── semilla.ts           # carga inicial de datos
│       ├── migrations/          # historial del esquema
│       ├── comun/               # columnas compartidas
│       ├── auth/                # login y protección del panel
│       ├── usuarios/
│       ├── cifras/
│       ├── eventos/
│       └── historias/
│
└── frontend/                # React + Vite + Tailwind
    ├── Dockerfile           # produccion (Nginx)
    ├── Dockerfile.dev
    ├── .env.development     # apunta al backend local
    └── src/
        ├── index.css        # tokens de color y tipografía
        ├── rutas.ts         # rutas del sitio en un solo lugar
        ├── lib/
        │   ├── api.ts       # ÚNICO punto de salida al backend
        │   └── tipos.ts     # espejo de las entidades
        └── paginas/
            ├── SitioPublico.tsx
            └── Admin.tsx    # panel de Career Services
```

### Cómo se hablan entre ellos

```
Navegador  ──localhost:5173──>  frontend
Navegador  ──localhost:3000──>  backend
backend    ──────db:5432──────>  db
```

Lo que corre en el **navegador** usa `localhost`.
Lo que corre **dentro de Docker** usa el nombre del servicio (`db`, `backend`).

Confundir esos dos es el error más común al empezar: si pones `DB_HOST=localhost` en el `.env`, el backend busca Postgres dentro de su propio contenedor y no lo encuentra.

### Las cuatro tablas

| Tabla | Qué guarda | Quién la edita |
|---|---|---|
| `cifras` | "Nuestro impacto en cifras" del inicio | Panel |
| `eventos` | Eventos y experiencias, con la marca para el inicio | Panel |
| `historias` | Historias de impacto (alumno, egresado, empresa) | Panel |
| `usuarios` | Accesos al panel | Semilla / a mano |

Las tres primeras comparten cuatro columnas que vienen de `comun/entidad-base.ts`:

- `visible` — oculta algo del sitio sin borrarlo
- `creadoEn` / `actualizadoEn` — fechas automáticas
- `actualizadoPor` — quién fue el último en editar (el `id_user` del diseño)

El contenido editorial fijo (propuesta de valor, sedes, textos de las secciones) **no** está en la base de datos: vive en el código del frontend, porque no cambia solo y no merece una tabla.

---

## 6. El panel de administración

Vive en una ruta discreta que se configura en `frontend/.env.development`:

```
VITE_RUTA_ADMIN=/panel-interno
```

En producción se cambia por algo difícil de adivinar y ese archivo no se sube al repositorio.

> **La URL discreta no es la seguridad del panel.**
>
> Ayuda a que nadie entre por casualidad, pero lo que protege de verdad es el token: cada ruta `/api/admin/*` del backend lo exige y responde `401` sin él. Puedes comprobarlo:
>
> ```bash
> curl -i http://localhost:3000/api/admin/cifras
> ```
>
> La URL es una cortina. La contraseña es la cerradura.

Las contraseñas se guardan como hash bcrypt, nunca en texto plano, y la columna está marcada para no salir en las consultas normales.

### Agregar otro usuario al panel

Por ahora se hace desde el contenedor:

```bash
docker compose exec backend sh
```

Y dentro, con Node:

```javascript
node -e "
const bcrypt = require('bcryptjs');
bcrypt.hash('la_contrasena_nueva', 10).then(console.log);
"
```

Copia el hash que imprime y inserta el usuario:

```bash
docker compose exec db psql -U career -d career_services -c \
  "INSERT INTO usuarios (usuario, contrasena_hash, nombre) VALUES ('nombre.apellido', 'EL_HASH_QUE_COPIASTE', 'Nombre Completo');"
```

Para revocar un acceso sin perder el historial de quién editó qué:

```bash
docker compose exec db psql -U career -d career_services -c \
  "UPDATE usuarios SET activo = false WHERE usuario = 'nombre.apellido';"
```

---

## 7. Problemas comunes

**El frontend no refleja mis cambios**
El proyecto está en `/mnt/c/`. Muévelo a `/home/tu-usuario/`.

**`port is already allocated`**
Algo en tu máquina ocupa ese puerto (muy común: PostgreSQL instalado en Windows en el 5432). En el `.env` cambia `DB_PUERTO_LOCAL=5433` y vuelve a levantar.

**`ECONNREFUSED` o `getaddrinfo` al conectar a la base**
Tu `.env` dice `DB_HOST=localhost`. Debe decir `DB_HOST=db`.

**`Falta la variable de entorno ...`**
No copiaste el `.env`, o le falta una variable. Compáralo con `.env.example`.

**Error de CORS en la consola del navegador**
El origen del frontend no está en `CORS_ORIGENES` del `.env`. Debe ir sin diagonal al final.

**El panel dice "Verificando sesión" y no avanza**
El backend no responde. Revisa `docker compose logs -f backend`.

**Entro al panel y al recargar me saca**
El token expiró. Lo controla `JWT_EXPIRACION` en el `.env` (por defecto `8h`).

**`npm` menciona rutas con `C:` o intenta escribir en `C:\WINDOWS`**
Estás usando el Node de Windows desde WSL. Instálalo dentro de Ubuntu:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
which node    # debe decir /home/... y NO /mnt/c/...
```

**VS Code no me deja hacer push ("configure your user.name")**
VS Code está usando el Git de Windows. Ciérralo y ábrelo desde la terminal de Ubuntu con `code .`. Abajo a la izquierda debe decir **WSL: Ubuntu**.

**No puedo editar archivos que generó el contenedor**
Quedaron como propiedad de root:
```bash
sudo chown -R $USER:$USER backend frontend
```

**Quiero empezar de cero**
```bash
docker compose down -v      # borra la base
docker compose up --build
docker compose exec backend npm run semilla
```

---

## 8. Lo que falta

- Pantallas de edición dentro del panel (cifras, eventos, historias)
- Las vistas públicas completas según el documento de arquitectura
- Vista de Recursos y mercado laboral
- Enlace a la plataforma Reqlut para las vacantes
- Fotografías reales
- Despliegue en la VPS: Nginx como reverse proxy, HTTPS con Certbot, respaldos automáticos
