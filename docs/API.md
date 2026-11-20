# Referencia de la API

Todas las rutas van bajo el prefijo **`/api`**.

En desarrollo: `http://localhost:3000/api`

---

## Dos tipos de ruta

| Tipo | Prefijo | Token | Quién la usa |
|---|---|---|---|
| **Pública** | `/api/...` | No | El sitio web que ven los alumnos |
| **Panel** | `/api/admin/...` | Sí | El panel de Career Services |

Las rutas públicas devuelven **solo los registros con `visible = true`**. Las del panel devuelven todo, incluido lo oculto, más el dato de quién lo editó por última vez.

---

## Autenticación

### `POST /api/auth/login`

Sin token.

```json
{ "usuario": "admin", "contrasena": "tu_contrasena" }
```

Respuesta `200`:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "3246d0c4-67a6-4fbf-bf29-b8b35443b3df",
    "usuario": "admin",
    "nombre": "Administrador Career Services"
  }
}
```

Credenciales incorrectas → `401` con el mensaje `Usuario o contraseña incorrectos`.

El mensaje es el mismo si el usuario no existe y si la contraseña está mal, a propósito: decir cuál de los dos falló le confirmaría a un atacante qué usuarios existen.

El token dura lo que diga `JWT_EXPIRACION` en el `.env` (por defecto 8 horas).

### `GET /api/auth/yo`

Con token. Devuelve de quién es el token. El panel lo usa al cargar para saber si la sesión sigue viva.

```json
{ "id": "3246d0c4-...", "usuario": "admin", "nombre": "Administrador Career Services" }
```

### Cómo se manda el token

En el encabezado `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Sin él, o con uno inválido o expirado, cualquier ruta `/api/admin/*` responde `401`.

---

## Cifras

Sección "Nuestro impacto en cifras" del inicio.

### `GET /api/cifras` · pública

Devuelve las visibles, ordenadas por `orden` ascendente.

```json
[
  {
    "id": "6f9b8aaa-3c4e-47ba-a14a-a94492962954",
    "visible": true,
    "creadoEn": "2026-10-06T04:11:21.756Z",
    "actualizadoEn": "2026-10-06T04:11:21.756Z",
    "texto": "Más de 2,000 empresas aliadas",
    "orden": 1
  }
]
```

### `GET /api/admin/cifras` · con token

Todas, incluidas las ocultas, con `actualizadoPor`.

### `POST /api/admin/cifras` · con token

```json
{
  "texto": "Más de 3,000 empresas aliadas",
  "orden": 1,
  "visible": true
}
```

| Campo | Obligatorio | Reglas |
|---|---|---|
| `texto` | sí | máximo 200 caracteres |
| `orden` | no | entero ≥ 0, por defecto 0 |
| `visible` | no | booleano, por defecto `true` |

### `PATCH /api/admin/cifras/:id` · con token

Mismos campos, todos opcionales. Solo manda lo que cambia:

```json
{ "visible": false }
```

### `DELETE /api/admin/cifras/:id` · con token

```json
{ "mensaje": "Cifra eliminada" }
```

---

## Eventos

Sección "Eventos y experiencias", y el apartado "Próximos eventos" del inicio.

### `GET /api/eventos` · pública

Devuelve los visibles ordenados por fecha ascendente.

Filtros, como parámetros de consulta:

| Parámetro | Valores | Para qué |
|---|---|---|
| `categoria` | una de las seis categorías | Los filtros de la vista de eventos |
| `sede` | `Ciudad de México`, `Guadalajara`, `Aguascalientes`, `Intercampi` | Filtrar por campus |
| `enInicio` | `true` | Los que salen en el inicio |
| `soloFuturos` | `true` | Descarta los que ya pasaron |

Se pueden combinar:

```
GET /api/eventos?enInicio=true&soloFuturos=true
GET /api/eventos?categoria=Talleres%20estratégicos&sede=Guadalajara
```

Un valor que no esté en la lista responde `400`, no lo ignora en silencio.

### `GET /api/eventos/opciones` · pública

Las listas válidas de categorías, formatos y sedes:

```json
{
  "categorias": ["Ferias de empleo", "Reclutamiento directo", "Talleres estratégicos", "Conferencias", "Networking", "Eventos de industria"],
  "formatos": ["Presencial", "Híbrido", "En línea"],
  "sedes": ["Ciudad de México", "Guadalajara", "Aguascalientes", "Intercampi"]
}
```

Existe para que el frontend no repita estas listas y se desincronice cuando cambien. Úsalo para poblar los botones de filtro y los menús del panel.

### `GET /api/eventos/:id` · pública

Un evento. `404` si no existe, `400` si el id no es un UUID válido.

### `POST /api/admin/eventos` · con token

```json
{
  "titulo": "Feria de Empleo UP 2027",
  "descripcion": "El punto de encuentro anual entre la comunidad UP y las organizaciones líderes del mercado.",
  "categoria": "Ferias de empleo",
  "formato": "Híbrido",
  "fecha": "2027-03-11",
  "fechaFin": null,
  "horario": "9:00 – 16:00 h",
  "sede": "Guadalajara",
  "dirigidoA": "Alumnos de últimos semestres y egresados UP",
  "enlaceRegistro": "https://forms.up.edu.mx/feria2026",
  "enInicio": true,
  "visible": true
}
```

| Campo | Obligatorio | Reglas |
|---|---|---|
| `titulo` | sí | máximo 200 |
| `descripcion` | sí | texto libre |
| `categoria` | sí | una de las seis exactas |
| `formato` | sí | `Presencial`, `Híbrido` o `En línea` |
| `fecha` | sí | formato `AAAA-MM-DD` |
| `fechaFin` | no | `AAAA-MM-DD`, solo para eventos de varios días |
| `horario` | sí | texto libre, máximo 60: `"9:00 – 16:00 h"`, `"Consultar programa"` |
| `sede` | sí | una de las cuatro |
| `dirigidoA` | sí | máximo 200 |
| `enlaceRegistro` | no | URL válida, destino del botón "Confirmar mi asistencia" |
| `enInicio` | no | booleano, por defecto `false` |
| `visible` | no | booleano, por defecto `true` |

Dos notas sobre el diseño de los campos:

- **`fecha` es tipo `date`, sin hora.** La hora se captura aparte en `horario` como texto libre, porque el documento de arquitectura muestra formatos como "Consultar programa" que no caben en un campo de hora.
- **`enInicio` es la marca del inicio.** El documento pide tres eventos destacados ahí; nada en la base lo limita a tres, es una decisión editorial de quien administra.

### `PATCH /api/admin/eventos/:id` · con token

Mismos campos, todos opcionales.

### `DELETE /api/admin/eventos/:id` · con token

---

## Historias

Sección "Historias de impacto": un testimonio de alumno, uno de egresado y uno de empresa.

### `GET /api/historias` · pública

### `GET /api/admin/historias` · con token

### `POST /api/admin/historias` · con token

```json
{
  "tipo": "Egresado",
  "nombre": "Rodrigo Villalpando",
  "detalle": "Ingeniería Industrial · Generación 2021",
  "testimonio": "Cambiar de industria a los tres años de egresado parecía imposible...",
  "imagenUrl": null,
  "orden": 2,
  "visible": true
}
```

| Campo | Obligatorio | Reglas |
|---|---|---|
| `tipo` | sí | `Alumno`, `Egresado` o `Empresa` |
| `nombre` | sí | máximo 120 |
| `detalle` | sí | máximo 160. Carrera y semestre, generación, o giro de la empresa |
| `testimonio` | sí | texto libre |
| `imagenUrl` | no | máximo 500. Null mientras no haya fotografía |
| `orden` | no | entero ≥ 0 |
| `visible` | no | booleano, por defecto `true` |

### `PATCH /api/admin/historias/:id` · con token

### `DELETE /api/admin/historias/:id` · con token

---

## Errores

Todos vienen con el mismo formato:

```json
{
  "statusCode": 400,
  "message": ["La categoría debe ser una de: Ferias de empleo, ..."],
  "error": "Bad Request"
}
```

`message` puede ser una cadena o un arreglo (cuando falló la validación de varios campos). El cliente de API del frontend ya normaliza las dos formas.

| Código | Qué pasó | Qué revisar |
|---|---|---|
| `400` | Validación falló | El mensaje dice exactamente qué campo y por qué |
| `401` | Falta el token, es inválido o expiró | Vuelve a iniciar sesión |
| `404` | El id no existe | Que el UUID sea el correcto |
| `500` | Error del servidor | `docker compose logs -f backend` |

### La validación es estricta a propósito

Un campo que no esté declarado en el DTO se **rechaza**, no se ignora:

```bash
curl -X POST http://localhost:3000/api/admin/cifras \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"texto":"Prueba","campoInventado":"hola"}'
```

```json
{ "statusCode": 400, "message": ["property campoInventado should not exist"] }
```

Esto atrapa errores de dedo temprano, en lugar de guardar datos a medias. Si agregas una columna a una entidad, **tienes que agregarla también al DTO** o el panel no podrá mandarla.

---

## Probar todo desde la terminal

```bash
# 1. Público: no necesita nada
curl http://localhost:3000/api/cifras
curl "http://localhost:3000/api/eventos?enInicio=true"
curl http://localhost:3000/api/eventos/opciones
curl http://localhost:3000/api/historias

# 2. Sin token, una ruta de admin debe dar 401
curl -i http://localhost:3000/api/admin/cifras

# 3. Login y guardar el token en una variable
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","contrasena":"TU_CONTRASENA"}' \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['token'])")

echo $TOKEN   # debe imprimir algo largo que empieza con eyJ

# 4. Ahora sí, con token
curl http://localhost:3000/api/auth/yo -H "Authorization: Bearer $TOKEN"
curl http://localhost:3000/api/admin/eventos -H "Authorization: Bearer $TOKEN"

# 5. Crear algo
curl -X POST http://localhost:3000/api/admin/cifras \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"texto":"Más de 200 convenios activos","orden":7}'

# 6. Ocultarlo del sitio sin borrarlo (usa el id que devolvió el paso anterior)
curl -X PATCH http://localhost:3000/api/admin/cifras/EL_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"visible":false}'

# 7. Borrarlo
curl -X DELETE http://localhost:3000/api/admin/cifras/EL_ID \
  -H "Authorization: Bearer $TOKEN"
```

La variable `$TOKEN` solo vive en esa terminal. Si abres otra, vuelve a hacer el paso 3.

---

## Desde el frontend

Nunca escribas una URL a mano en un componente. Todo pasa por `frontend/src/lib/api.ts`:

```tsx
import { api } from '../lib/api';
import type { Evento } from '../lib/tipos';

// Los tres eventos del inicio
const destacados = await api.eventos({ enInicio: true, soloFuturos: true });

// Con filtro de categoría
const talleres = await api.eventos({ categoria: 'Talleres estratégicos' });
```

Y para el panel, con el token ya incluido automáticamente:

```tsx
import { apiAdmin } from '../lib/api';

const todos = await apiAdmin.listar<Evento>('eventos');
const nuevo = await apiAdmin.crear<Evento>('eventos', datos);
await apiAdmin.editar<Evento>('eventos', id, { visible: false });
await apiAdmin.eliminar('eventos', id);
```

Así, cambiar de backend local a producción es cambiar una sola variable (`VITE_API_URL`) y no buscar URLs por todo el código.
