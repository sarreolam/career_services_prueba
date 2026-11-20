import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

export type UsuarioDelToken = { sub: string; usuario: string; nombre: string };

/**
 * Protege las rutas del panel de administración.
 *
 * Lee el encabezado `Authorization: Bearer <token>`, verifica la firma
 * y deja los datos del usuario en `request.usuario`.
 *
 * Se aplica con @UseGuards(GuardiaAdmin) sobre un controlador o una ruta.
 */
@Injectable()
export class GuardiaAdmin implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const peticion = contexto.switchToHttp().getRequest<Request>();
    const encabezado = peticion.headers.authorization;

    if (!encabezado?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Falta el token de acceso');
    }

    const token = encabezado.slice('Bearer '.length);

    try {
      const datos = await this.jwt.verifyAsync<UsuarioDelToken>(token);
      (peticion as any).usuario = datos;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
