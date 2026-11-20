import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private repo: Repository<Usuario>,
  ) {}

  /** Cuántas vueltas de bcrypt. 10 es el estándar razonable. */
  private static readonly VUELTAS = 10;

  static async encriptar(contrasena: string): Promise<string> {
    return bcrypt.hash(contrasena, UsuariosService.VUELTAS);
  }

  /**
   * Busca un usuario incluyendo su hash de contraseña.
   * El hash está marcado `select: false` en la entidad, por eso hay que
   * pedirlo explícitamente con addSelect. Solo auth.service lo usa.
   */
  async buscarParaLogin(usuario: string): Promise<Usuario | null> {
    return this.repo
      .createQueryBuilder('u')
      .addSelect('u.contrasenaHash')
      .where('u.usuario = :usuario', { usuario })
      .getOne();
  }

  async buscarPorId(id: string): Promise<Usuario> {
    const usuario = await this.repo.findOneBy({ id });
    if (!usuario) throw new NotFoundException('El usuario no existe');
    return usuario;
  }

  async listar(): Promise<Usuario[]> {
    return this.repo.find({ order: { creadoEn: 'ASC' } });
  }

  async crear(datos: {
    usuario: string;
    contrasena: string;
    nombre: string;
  }): Promise<Usuario> {
    const nuevo = this.repo.create({
      usuario: datos.usuario,
      nombre: datos.nombre,
      contrasenaHash: await UsuariosService.encriptar(datos.contrasena),
    });
    return this.repo.save(nuevo);
  }

  async cambiarContrasena(id: string, contrasena: string): Promise<void> {
    await this.buscarPorId(id);
    await this.repo.update(id, {
      contrasenaHash: await UsuariosService.encriptar(contrasena),
    });
  }
}
