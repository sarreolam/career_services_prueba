/**
 * Lectura central de variables de entorno.
 * Si una variable obligatoria falta, el servidor falla al arrancar
 * con un mensaje claro, en lugar de romperse después sin explicación.
 */
function requerida(nombre: string): string {
  const valor = process.env[nombre];
  if (!valor) {
    throw new Error(
      `Falta la variable de entorno ${nombre}. Revisa tu archivo .env (puedes copiarlo de .env.example).`,
    );
  }
  return valor;
}

export const configuracion = {
  puerto: parseInt(process.env.PORT ?? '3000', 10),

  baseDeDatos: {
    host: process.env.DB_HOST ?? 'db',
    puerto: parseInt(process.env.DB_PORT ?? '5432', 10),
    usuario: requerida('POSTGRES_USER'),
    contrasena: requerida('POSTGRES_PASSWORD'),
    nombre: requerida('POSTGRES_DB'),
  },

  jwt: {
    secreto: requerida('JWT_SECRET'),
    expiracion: process.env.JWT_EXPIRACION ?? '8h',
  },

  /** Orígenes del frontend autorizados a llamar a esta API. */
  origenesPermitidos: (process.env.CORS_ORIGENES ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
};
