import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Evento } from './evento.entity';
import { CrearEventoDto, EditarEventoDto } from './dto/guardar-evento.dto';
import { FiltrarEventosDto } from './dto/filtrar-eventos.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private repo: Repository<Evento>,
  ) {}

  /** Fecha de hoy en formato AAAA-MM-DD, para comparar con la columna `date`. */
  private static hoy(): string {
    return new Date().toISOString().slice(0, 10);
  }

  listarPublicos(filtros: FiltrarEventosDto): Promise<Evento[]> {
    const where: Record<string, unknown> = { visible: true };

    if (filtros.categoria) where.categoria = filtros.categoria;
    if (filtros.sede) where.sede = filtros.sede;
    if (filtros.enInicio === 'true') where.enInicio = true;
    if (filtros.soloFuturos === 'true') {
      where.fecha = MoreThanOrEqual(EventosService.hoy());
    }

    return this.repo.find({ where, order: { fecha: 'ASC' } });
  }

  listarTodos(): Promise<Evento[]> {
    return this.repo.find({
      order: { fecha: 'DESC' },
      relations: ['actualizadoPor'],
    });
  }

  async buscarUno(id: string): Promise<Evento> {
    const evento = await this.repo.findOneBy({ id });
    if (!evento) throw new NotFoundException(`No existe el evento ${id}`);
    return evento;
  }

  crear(datos: CrearEventoDto, usuarioId: string): Promise<Evento> {
    const evento = this.repo.create({
      ...datos,
      actualizadoPor: { id: usuarioId } as any,
    });
    return this.repo.save(evento);
  }

  async editar(
    id: string,
    datos: EditarEventoDto,
    usuarioId: string,
  ): Promise<Evento> {
    const evento = await this.buscarUno(id);
    Object.assign(evento, datos);
    evento.actualizadoPor = { id: usuarioId } as any;
    return this.repo.save(evento);
  }

  async eliminar(id: string): Promise<{ mensaje: string }> {
    const evento = await this.buscarUno(id);
    await this.repo.remove(evento);
    return { mensaje: 'Evento eliminado' };
  }
}
