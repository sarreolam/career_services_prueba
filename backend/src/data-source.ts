import 'dotenv/config';
import { DataSource } from 'typeorm';
import { configuracion } from './configuracion';

/**
 * Configuración que usa el CLI de TypeORM (migraciones).
 * Es un archivo aparte de app.module.ts porque el CLI se ejecuta
 * fuera de Nest y no puede leer la configuración del módulo.
 *
 * Las rutas apuntan a `src/*.ts` porque el CLI corre sobre TypeScript
 * directamente, sin compilar.
 */
export default new DataSource({
  type: 'postgres',
  host: configuracion.baseDeDatos.host,
  port: configuracion.baseDeDatos.puerto,
  username: configuracion.baseDeDatos.usuario,
  password: configuracion.baseDeDatos.contrasena,
  database: configuracion.baseDeDatos.nombre,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
