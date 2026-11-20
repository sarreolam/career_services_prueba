import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historia } from './historia.entity';
import { CrearHistoriaDto, EditarHistoriaDto } from './dto/guardar-historia.dto';

@Injectable()
export class HistoriasService {
  constructor(
    @InjectRepository(Historia)
    private repo: Repository<Historia>,
  ) {}

  listarPublicas(): Promise<Historia[]> {
    return this.repo.find({
      where: { visible: true },
      order: { orden: 'ASC', creadoEn: 'DESC' },
    });
  }

  listarTodas(): Promise<Historia[]> {
    return this.repo.find({
      order: { orden: 'ASC', creadoEn: 'DESC' },
      relations: ['actualizadoPor'],
    });
  }

  async buscarUna(id: string): Promise<Historia> {
    const historia = await this.repo.findOneBy({ id });
    if (!historia) throw new NotFoundException(`No existe la historia ${id}`);
    return historia;
  }

  crear(datos: CrearHistoriaDto, usuarioId: string): Promise<Historia> {
    const historia = this.repo.create({
      ...datos,
      actualizadoPor: { id: usuarioId } as any,
    });
    return this.repo.save(historia);
  }

  async editar(
    id: string,
    datos: EditarHistoriaDto,
    usuarioId: string,
  ): Promise<Historia> {
    const historia = await this.buscarUna(id);
    Object.assign(historia, datos);
    historia.actualizadoPor = { id: usuarioId } as any;
    return this.repo.save(historia);
  }

  async eliminar(id: string): Promise<{ mensaje: string }> {
    const historia = await this.buscarUna(id);
    await this.repo.remove(historia);
    return { mensaje: 'Historia eliminada' };
  }
}
