// Esta linea va PRIMERO, antes de cualquier otro import.
// `configuracion.ts` lee process.env en cuanto se importa, asi que el .env
// tiene que estar cargado antes. Dentro de Docker las variables ya vienen
// del env_file, pero fuera de Docker (npm run start) sin esto falla.
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { configuracion } from './configuracion';

async function arrancar() {
  const app = await NestFactory.create(AppModule);

  // Todas las rutas quedan bajo /api, para no chocar con las del frontend.
  app.setGlobalPrefix('api');

  // Validación automática de todo lo que entra por el cuerpo de las peticiones.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // descarta campos no declarados en el DTO
      forbidNonWhitelisted: true, // y responde 400 si los manda
      transform: true, // convierte tipos según el DTO
    }),
  );

  app.enableCors({
    origin: configuracion.origenesPermitidos,
    credentials: true,
  });

  // '0.0.0.0' es obligatorio dentro de Docker. Sin esto el servidor
  // solo escucha dentro del contenedor y el navegador no lo alcanza.
  await app.listen(configuracion.puerto, '0.0.0.0');

  console.log(`API escuchando en http://localhost:${configuracion.puerto}/api`);
}

arrancar();
