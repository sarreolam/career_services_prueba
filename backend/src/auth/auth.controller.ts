import { Controller, Post, Get, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GuardiaAdmin } from './guardia-admin';
import type { UsuarioDelToken } from './guardia-admin';
import { UsuarioActual } from './usuario-actual.decorador';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  /** POST /api/auth/login — entrega el token del panel de administración. */
  @Post('login')
  @HttpCode(200)
  login(@Body() datos: LoginDto) {
    return this.auth.login(datos);
  }

  /**
   * GET /api/auth/yo — devuelve quién es el dueño del token.
   * El panel lo usa al cargar, para saber si la sesión sigue viva.
   */
  @Get('yo')
  @UseGuards(GuardiaAdmin)
  yo(@UsuarioActual() usuario: UsuarioDelToken) {
    return { id: usuario.sub, usuario: usuario.usuario, nombre: usuario.nombre };
  }
}
