import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { UsuarioDelToken } from './guardia-admin';

/**
 * Atajo para leer el usuario autenticado dentro de un controlador:
 *
 *   @Patch(':id')
 *   editar(@UsuarioActual() usuario: UsuarioDelToken) { ... }
 *
 * Solo funciona en rutas protegidas con GuardiaAdmin.
 */
export const UsuarioActual = createParamDecorator(
  (_dato: unknown, contexto: ExecutionContext): UsuarioDelToken => {
    return contexto.switchToHttp().getRequest().usuario;
  },
);
