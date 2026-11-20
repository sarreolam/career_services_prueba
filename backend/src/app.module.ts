import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuracion } from './configuracion';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CifrasModule } from './cifras/cifras.module';
import { EventosModule } from './eventos/eventos.module';
import { HistoriasModule } from './historias/historias.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuracion.baseDeDatos.host,
      port: configuracion.baseDeDatos.puerto,
      username: configuracion.baseDeDatos.usuario,
      password: configuracion.baseDeDatos.contrasena,
      database: configuracion.baseDeDatos.nombre,
      autoLoadEntities: true,

      // Las tablas SIEMPRE se crean con migraciones, nunca automáticamente.
      // Dejar esto en true borra datos sin avisar al cambiar una entidad.
      synchronize: false,

      // Al arrancar, aplica las migraciones que falten.
      // Es lo que hace que tu compañero clone el repo y obtenga el
      // mismo esquema sin ejecutar nada a mano.
      migrations: [__dirname + '/migrations/*{.js,.ts}'],
      migrationsRun: true,
    }),

    AuthModule,
    UsuariosModule,
    CifrasModule,
    EventosModule,
    HistoriasModule,
  ],
})
export class AppModule {}
