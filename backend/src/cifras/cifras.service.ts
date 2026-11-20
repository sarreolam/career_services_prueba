import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cifra } from './cifra.entity';
import { CrearCifraDto, EditarCifraDto } from './dto/guardar-cifra.dto';

@Injectable()
export class CifrasService {
  constructor(
    @InjectRepository(Cifra)
    private repo: Repository<Cifra>,
  ) {}

  /** Lo que ve el sitio público: solo lo visible, en orden. */
  listarPublicas(): Promise<Cifra[]> {
    return this.repo.find({
      where: { visible: true },
      order: { orden: 'ASC', creadoEn: 'ASC' },
    });
  }

  /** Lo que ve el panel: todo, incluido lo oculto. */
  listarTodas(): Promise<Cifra[]> {
    return this.repo.find({
      order: { orden: 'ASC', creadoEn: 'ASC' },
      relations: ['actualizadoPor'],
    });
  }

  async buscarUna(id: string): Promise<Cifra> {
    const cifra = await this.repo.findOneBy({ id });
    if (!cifra) throw new NotFoundException(`No existe la cifra ${id}`);
    return cifra;
  }

  crear(datos: CrearCifraDto, usuarioId: string): Promise<Cifra> {
    const cifra = this.repo.create({
      ...datos,
      actualizadoPor: { id: usuarioId } as any,
    });
    return this.repo.save(cifra);
  }

  async editar(id: string, datos: EditarCifraDto, usuarioId: string): Promise<Cifra> {
    const cifra = await this.buscarUna(id);
    Object.assign(cifra, datos);
    cifra.actualizadoPor = { id: usuarioId } as any;
    return this.repo.save(cifra);
  }

  async eliminar(id: string): Promise<{ mensaje: string }> {
    const cifra = await this.buscarUna(id);
    await this.repo.remove(cifra);
    return { mensaje: 'Cifra eliminada' };
  }
}
