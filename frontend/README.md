# Frontend — Career Services UP (borrador)

Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router 7.
Basado en el Figma "v2 · Borrador corregido" y el Manual de Marca UP.

## Correr con Docker

Como se agregaron dependencias nuevas (`react-router-dom` y las fuentes `@fontsource/*`),
hay que reconstruir el contenedor y renovar el volumen de `node_modules`:

```bash
docker compose up -d --build -V frontend
```

Luego abre http://localhost:5173

## Estructura

```
src/
  index.css            Tokens de marca (colores, tipografías) en @theme de Tailwind
  main.tsx             Fuentes + BrowserRouter
  App.tsx              Rutas
  components/          Header, Footer, Boton, TarjetaEvento, bloques reutilizables, marca (tahalí, logo provisional)
  pages/               Una página por sección del documento de arquitectura
  data/                Contenido estático (tipos.ts define la forma de cada dato)
  lib/api.ts           Helper para llamar al backend (aún no se usa)
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/career-services` | Career Services |
| `/servicios` | Servicios |
| `/alumnos-egresados?vista=alumnos\|egresados` | Alumnos y Egresados (filtro de entrada) |
| `/empresas` | Empresas |
| `/eventos` | Eventos y Experiencias (filtros funcionales) |
| `/recursos` | Recursos y Mercado Laboral |
| `/contacto` | Contacto (3 campus) |

## Dónde cambiar cosas

- **Enlaces externos** (Conecta UP, observatorio, tutoriales): `src/data/sitio.ts` → `ENLACES`.
  Un enlace en `null` muestra el botón como "próximamente".
- **Cifras y datos de campus:** `src/data/sitio.ts`.
- **Eventos:** `src/data/eventos.ts`. Solo "Feria de Empleo UP 2026" viene del documento; el resto tiene `esEjemplo: true`.
- **Testimonios y guías:** `src/data/contenido.ts` (pendientes del cliente).

## Pasar a datos reales (siguiente fase)

Los tipos de `src/data/tipos.ts` (`Evento`, `Testimonio`, `Recurso`, `Cifra`) están pensados
para convertirse en entidades de TypeORM. Cuando existan los endpoints en NestJS,
se reemplaza el import estático por `apiGet<Evento[]>('/eventos')` desde `src/lib/api.ts`.

## Pendientes de marca

- Logo oficial de Career Services (hoy: `LogoProvisional` en `components/Marca.tsx`).
- Licencias web de Laurentian y Seravek (hoy: Source Serif 4 y Source Sans 3).
- Fotografías reales de la comunidad UP (hoy: `FotoProvisional`).
