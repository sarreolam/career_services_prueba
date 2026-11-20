import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarios: UsuariosService,
    private jwt: JwtService,
  ) {}

  async login(datos: LoginDto) {
    const usuario = await this.usuarios.buscarParaLogin(datos.usuario);

    // Mismo mensaje para usuario inexistente y contraseña incorrecta:
    // decir cuál de los dos falló le confirmaría a un atacante
    // qué usuarios existen.
    const generico = new UnauthorizedException('Usuario o contraseña incorrectos');

    if (!usuario || !usuario.activo) throw generico;

    const coincide = await bcrypt.compare(datos.contrasena, usuario.contrasenaHash);
    if (!coincide) throw generico;

    const token = await this.jwt.signAsync({
      sub: usuario.id,
      usuario: usuario.usuario,
      nombre: usuario.nombre,
    });

    return {
      token,
      usuario: {
        id: usuario.id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
      },
    };
  }
}
