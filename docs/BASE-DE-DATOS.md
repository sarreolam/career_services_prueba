# Base de datos y migraciones

Cómo cambiar el esquema de la base de datos sin romperle nada a tu compañero ni al servidor.

---

## Índice

1. [La regla fundamental](#1-la-regla-fundamental)
2. [Los comandos](#2-los-comandos)
3. [Agregar una columna](#3-agregar-una-columna)
4. [Crear una tabla nueva](#4-crear-una-tabla-nueva)
5. [Tipos de columna](#5-tipos-de-columna)
6. [Relaciones entre tablas](#6-relaciones-entre-tablas)
7. [Cuando una migración falla](#7-cuando-una-migración-falla)
8. [Consultas útiles](#8-consultas-útiles)
9. [Respaldos](#9-respaldos)
10. [Checklist](#10-checklist)

---

## 1. La regla fundamental

**Nunca creamos ni modificamos tablas a mano con SQL.** Todo pasa por migraciones.

Una migración es un archivo de TypeScript, versionado en Git, que describe un cambio del esquema. Como vive en el repositorio, corre igual en tu máquina, en la de tu compañero y en la VPS. Es la única garantía real de que las tres bases tengan **la misma estructura**, aunque tengan datos distintos.

El flujo es siempre el mismo:

```
Editas la entidad  →  generas la migración  →  la lees  →  la aplicas  →  la commiteas
```

Cuando tu compañero hace `git pull` y levanta los contenedores, las migraciones pendientes se aplican solas. Eso lo hace esta línea de `app.module.ts`:

```ts
migrationsRun: true,
```

Y lo que lo hace seguro es esta otra:

```ts
synchronize: false,
```

`synchronize: true` haría que TypeORM ajustara las tablas automáticamente al cambiar una entidad. Es cómodo pero **borra columnas y datos sin avisar**. En este proyecto está apagado a propósito y no debe encenderse.

> ### Nunca edites una migración que ya subiste a Git
>
> Si ya corrió en otra máquina, su nombre quedó registrado en la tabla `migrations` y no se volverá a ejecutar. Editarla no tiene efecto ahí y deja las bases desalineadas.
>
> Si te equivocaste, **genera una migración nueva que corrija**.

---

## 2. Los comandos

Todos se corren con los contenedores arriba:

```bash
# Ver qué migraciones hay y cuáles ya corrieron
docker compose exec backend npm run migracion:ver

# Generar una migración a partir de los cambios en las entidades
docker compose exec backend npm run migracion:generar -- src/migrations/NombreDescriptivo

# Aplicar las pendientes
docker compose exec backend npm run migracion:correr

# Deshacer la última
docker compose exec backend npm run migracion:revertir

# Crear una migración vacía para escribir el SQL a mano
docker compose exec backend npm run migracion:crear -- src/migrations/NombreDescriptivo
```

El nombre va en PascalCase y describe el cambio: `AgregaCupoAEventos`, `CreaTablaRecursos`, `QuitaColumnaOrdenDeCifras`.

Después de generar una migración, los archivos quedan como propiedad de root. Si VS Code no te deja editarlos:

```bash
sudo chown -R $USER:$USER backend
```

---

## 3. Agregar una columna

El caso más frecuente. Ejemplo: agregar cupo máximo a los eventos.

### Paso 1 — Edita la entidad

En `backend/src/eventos/evento.entity.ts`:

```ts
/** Cupo máximo de asistentes. Null significa sin límite. */
@Column({ name: 'cupo_maximo', type: 'int', nullable: true })
cupoMaximo: number | null;
```

### Paso 2 — Genera la migración

```bash
docker compose exec backend npm run migracion:generar -- src/migrations/AgregaCupoAEventos
```

### Paso 3 — Léela antes de aplicarla

Abre el archivo nuevo en `backend/src/migrations/`. Debe tener algo así:

```sql
ALTER TABLE "eventos" ADD "cupo_maximo" integer
```

**Lee siempre este archivo.** Si ves un `DROP TABLE` o un `DROP COLUMN` que no esperabas, no lo apliques: revisa qué cambiaste en las entidades.

### Paso 4 — Aplícala y verifica

```bash
docker compose exec backend npm run migracion:correr
docker compose exec db psql -U career -d career_services -c "\d eventos"
```

### Paso 5 — Actualiza el resto de la cadena

Una columna nueva casi nunca es solo la columna. Revisa:

1. **El DTO** en `eventos/dto/guardar-evento.dto.ts`, para que el panel pueda mandar el valor:
   ```ts
   @IsOptional()
   @IsInt()
   @Min(1)
   cupoMaximo?: number;
   ```
   Si no lo agregas aquí, la validación global lo **rechaza** con `property cupoMaximo should not exist`.

2. **El tipo del frontend** en `frontend/src/lib/tipos.ts`:
   ```ts
   cupoMaximo: number | null;
   ```

### Paso 6 — Commitea

```bash
sudo chown -R $USER:$USER backend
git add .
git commit -m "migración: cupo máximo en eventos"
git push
```

La migración y el código que la necesita viajan **en el mismo commit**. Separarlos deja a tu compañero con código que espera una columna que su base no tiene.

> ### Cuidado al agregar una columna obligatoria a una tabla con datos
>
> PostgreSQL no sabe qué poner en los registros que ya existen y la migración falla.
>
> Dos salidas: usa `nullable: true`, o dale un valor por defecto:
> ```ts
> @Column({ default: 0 })
> cupoMaximo: number;
> ```

---

## 4. Crear una tabla nueva

Ejemplo: la sección de recursos profesionales que falta del documento de arquitectura.

### Paso 1 — La entidad

Crea la carpeta `backend/src/recursos/` y dentro `recurso.entity.ts`:

```ts
import { Entity, Column } from 'typeorm';
import { EntidadBase } from '../comun/entidad-base';

export const TIPOS_RECURSO = ['Guía', 'Video', 'Plantilla'] as const;
export type TipoRecurso = (typeof TIPOS_RECURSO)[number];

@Entity('recursos')
export class Recurso extends EntidadBase {
  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 20 })
  tipo: TipoRecurso;

  @Column({ name: 'url_archivo', type: 'varchar', length: 500, nullable: true })
  urlArchivo: string | null;

  @Column({ default: 0 })
  orden: number;
}
```

Extender `EntidadBase` te da gratis `id`, `visible`, `creadoEn`, `actualizadoEn` y `actualizadoPor`. Úsalo para cualquier tabla de contenido editable.

### Paso 2 — Genera, lee y aplica

```bash
docker compose exec backend npm run migracion:generar -- src/migrations/CreaRecursos
# lee el archivo generado
docker compose exec backend npm run migracion:correr
docker compose exec db psql -U career -d career_services -c "\d recursos"
```

### Paso 3 — Los otros tres archivos del módulo

Copia la estructura de `cifras/`, que es la más simple:

| Archivo | Qué hace |
|---|---|
| `recursos.service.ts` | La lógica: listar, buscar, crear, editar, eliminar |
| `recursos.controller.ts` | Las rutas. Dos controladores: público y `admin/` |
| `recursos.module.ts` | Une los tres y los registra |
| `dto/guardar-recurso.dto.ts` | Qué campos acepta y con qué reglas |

### Paso 4 — Regístralo en `app.module.ts`

```ts
import { RecursosModule } from './recursos/recursos.module';
```

Y agrégalo al arreglo `imports`.

**Si se te olvida este paso, las rutas simplemente no existen** y vas a ver `404` sin ninguna pista en los logs. Es el error más común al agregar un módulo.

### Paso 5 — Reinicia y prueba

```bash
docker compose restart backend
curl http://localhost:3000/api/recursos
```

Prueba la API con `curl` **antes** de tocar React. Depurar frontend y backend al mismo tiempo es el doble de difícil.

---

## 5. Tipos de columna

| Decorador | Genera | Para qué |
|---|---|---|
| `@Column({ length: 200 })` | `varchar(200)` | Texto corto: títulos, nombres |
| `@Column({ type: 'text' })` | `text` | Texto largo: descripciones, testimonios |
| `@Column({ type: 'int' })` | `integer` | Números enteros |
| `@Column({ type: 'decimal', precision: 10, scale: 2 })` | `decimal` | Dinero |
| `@Column({ default: true })` | `boolean` | Banderas: visible, destacado |
| `@Column({ type: 'date' })` | `date` | Solo fecha, sin hora |
| `@Column({ type: 'timestamp' })` | `timestamp` | Fecha y hora |
| `@CreateDateColumn()` | `timestamp` | Se llena solo al crear |
| `@UpdateDateColumn()` | `timestamp` | Se actualiza solo al editar |

Modificadores:

- `nullable: true` — permite vacíos
- `unique: true` — impide duplicados
- `default: valor` — valor si no se especifica
- `name: 'en_snake_case'` — nombre real de la columna en la base
- `select: false` — no sale en las consultas normales (así está `contrasena_hash`)

### Dos trampas a tener en cuenta

**1. Una columna nullable necesita `type` explícito.** Si el tipo de TypeScript es una unión como `string | null`, TypeORM no puede deducir el tipo SQL y falla con `Data type "Object" ... is not supported`:

```ts
// ✗ falla al generar la migración
@Column({ length: 500, nullable: true })
imagenUrl: string | null;

// ✓ correcto
@Column({ type: 'varchar', length: 500, nullable: true })
imagenUrl: string | null;
```

**2. En este proyecto las columnas van en `snake_case`.** Las propiedades de TypeScript van en `camelCase` y el `name` hace la traducción:

```ts
@Column({ name: 'dirigido_a', length: 200 })
dirigidoA: string;
```

Mantén la convención: en la base `snake_case`, en el código `camelCase`.

---

## 6. Relaciones entre tablas

Ejemplo: una vacante pertenece a una empresa; una empresa tiene muchas vacantes.

```ts
// empresa.entity.ts
@OneToMany(() => Vacante, (vacante) => vacante.empresa)
vacantes: Vacante[];
```

```ts
// vacante.entity.ts
@ManyToOne(() => Empresa, (empresa) => empresa.vacantes, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'empresa_id' })
empresa: Empresa;
```

El lado `@ManyToOne` es el que lleva la llave foránea en la base.

Qué pasa al borrar el registro padre lo decide `onDelete`:

| Valor | Efecto |
|---|---|
| `'CASCADE'` | Borra también los hijos |
| `'SET NULL'` | Conserva los hijos y pone la columna en null |
| `'RESTRICT'` | Impide borrar el padre si tiene hijos |

En este proyecto, `actualizadoPor` usa `SET NULL`: si se borra un usuario, su historial de ediciones no arrastra el contenido.

> ### Las relaciones hay que pedirlas explícitamente
>
> ```ts
> this.repo.find();                              // evento.actualizadoPor → undefined
> this.repo.find({ relations: ['actualizadoPor'] }); // ahora sí viene
> ```
>
> Es una de las confusiones más frecuentes con TypeORM: la columna existe y tiene el valor, pero el objeto llega vacío porque no se pidió la relación.

---

## 7. Cuando una migración falla

### `No changes in database schema were found`

TypeORM no vio ningún cambio. Causas, en orden de probabilidad:

1. El archivo no termina exactamente en `.entity.ts`
2. La entidad está fuera de `src/`
3. Olvidaste el decorador `@Entity('nombre_tabla')`
4. Ya generaste esa migración antes

### `Data type "Object" ... is not supported`

Una columna nullable sin `type` explícito. Ver la sección de tipos.

### `relation "..." already exists`

La tabla existe pero la migración no está registrada. Pasa si alguien corrió el proyecto con `synchronize: true` alguna vez. En desarrollo, lo más rápido es empezar de cero:

```bash
docker compose down -v
docker compose up -d
docker compose exec backend npm run semilla
```

En la VPS **no** hagas esto: marca la migración como aplicada a mano después de verificar que el esquema coincide.

### La migración se aplicó pero estaba mal

Si todavía **no** la subiste a Git:

```bash
docker compose exec backend npm run migracion:revertir
rm backend/src/migrations/EL_ARCHIVO.ts
# corrige la entidad y vuelve a generar
```

Si ya la subiste y alguien la corrió: no la toques. Genera una migración nueva que corrija.

---

## 8. Consultas útiles

```bash
docker compose exec db psql -U career -d career_services
```

```sql
\dt                           -- listar tablas
\d eventos                    -- estructura de una tabla
\di                           -- listar índices
SELECT * FROM migrations;     -- qué migraciones ya corrieron
\q                            -- salir
```

Revisar contenido:

```sql
-- Los tres eventos que salen en el inicio
SELECT titulo, fecha, sede FROM eventos
WHERE en_inicio = true AND visible = true
ORDER BY fecha;

-- Cifras en el orden en que se muestran
SELECT orden, texto FROM cifras WHERE visible = true ORDER BY orden;

-- Qué está oculto del sitio
SELECT 'evento' AS tipo, titulo FROM eventos WHERE visible = false
UNION ALL
SELECT 'historia', nombre FROM historias WHERE visible = false;

-- Quién editó qué y cuándo
SELECT e.titulo, u.usuario, e.actualizado_en
FROM eventos e
LEFT JOIN usuarios u ON u.id = e.actualizado_por_id
ORDER BY e.actualizado_en DESC
LIMIT 10;

-- Eventos pasados que siguen publicados (candidatos a ocultar)
SELECT titulo, fecha FROM eventos
WHERE fecha < CURRENT_DATE AND visible = true
ORDER BY fecha DESC;
```

---

## 9. Respaldos

Saca un respaldo **antes** de cualquier migración que borre o transforme columnas.

```bash
# Respaldar
docker compose exec db pg_dump -U career career_services > respaldo_$(date +%F).sql

# Restaurar (la -T es necesaria para que acepte la entrada)
docker compose exec -T db psql -U career -d career_services < respaldo_2026-10-05.sql
```

Los `.sql` están en el `.gitignore`: un respaldo con datos reales no se sube a GitHub.

> ### La base de datos no se "sube" a la VPS
>
> Lo que se sube es el **código y las migraciones**. La base de producción nace vacía en el servidor y acumula los datos reales que Career Services captura ahí.
>
> Copiar una base local encima de la de producción pisa datos reales que solo existían allá. Si necesitas datos realistas en local, la dirección correcta es siempre **de producción hacia abajo**, nunca al revés.

---

## 10. Checklist

Al agregar o cambiar algo en la base:

- [ ] Entidad editada o creada con `@Entity('nombre_en_plural')`
- [ ] Columna nullable con `type` explícito
- [ ] Migración generada
- [ ] Migración **leída** antes de aplicarse
- [ ] Migración aplicada y verificada con `\d tabla`
- [ ] DTO actualizado (si el panel va a mandar ese campo)
- [ ] Tipo del frontend actualizado en `lib/tipos.ts`
- [ ] Módulo registrado en `app.module.ts` (si es tabla nueva) ← el olvido más común
- [ ] Endpoints probados con `curl`
- [ ] Migración y código commiteados **juntos**

### Convenciones del proyecto

| Elemento | Convención | Ejemplo |
|---|---|---|
| Tabla | plural, snake_case | `eventos`, `historias` |
| Columna | snake_case | `dirigido_a`, `en_inicio` |
| Clase de entidad | singular, PascalCase | `Evento` |
| Propiedad | camelCase | `dirigidoA` |
| Archivo de entidad | kebab-case + sufijo | `evento.entity.ts` |
| Ruta pública | plural, minúsculas | `/api/eventos` |
| Ruta de panel | `admin/` + plural | `/api/admin/eventos` |
| Migración | verbo + qué | `AgregaCupoAEventos` |
