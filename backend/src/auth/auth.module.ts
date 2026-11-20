import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GuardiaAdmin } from './guardia-admin';
import { configuracion } from '../configuracion';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      secret: configuracion.jwt.secreto,
      // El tipo de `expiresIn` es muy estricto ("8h", "30m", un número...).
      // Como el valor viene de una variable de entorno, no se puede
      // verificar en tiempo de compilación.
      signOptions: { expiresIn: configuracion.jwt.expiracion as any },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GuardiaAdmin],
  // Los demás módulos importan AuthModule para poder usar GuardiaAdmin.
  exports: [GuardiaAdmin, JwtModule],
})
export class AuthModule {}
