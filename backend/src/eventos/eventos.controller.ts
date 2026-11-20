import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CrearEventoDto, EditarEventoDto } from './dto/guardar-evento.dto';
import { FiltrarEventosDto } from './dto/filtrar-eventos.dto';
import {
  CATEGORIAS_EVENTO,
  FORMATOS_EVENTO,
  SEDES,
} from './evento.entity';
import { GuardiaAdmin } from '../auth/guardia-admin';
import type { UsuarioDelToken } from '../auth/guardia-admin';
import { UsuarioActual } from '../auth/usuario-actual.decorador';

@Controller('eventos')
export class EventosController {
  constructor(private servicio: EventosService) {}

  /**
   * Las listas de categorías, formatos y sedes viven en el backend
   * para que el frontend no tenga que repetirlas y desincronizarse.
   * Ruta declarada antes de ':id' para que no la capture como un id.
   */
  @Get('opciones')
  opciones() {
    return {
      categorias: CATEGORIAS_EVENTO,
      formatos: FORMATOS_EVENTO,
      sedes: SEDES,
    };
  }

  @Get()
  listar(@Query() filtros: FiltrarEventosDto) {
    return this.servicio.listarPublicos(filtros);
  }

  @Get(':id')
  buscarUno(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicio.buscarUno(id);
  }
}

@Controller('admin/eventos')
@UseGuards(GuardiaAdmin)
export class EventosAdminController {
  constructor(private servicio: EventosService) {}

  @Get()
  listar() {
    return this.servicio.listarTodos();
  }

  @Get(':id')
  buscarUno(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicio.buscarUno(id);
  }

  @Post()
  crear(@Body() datos: CrearEventoDto, @UsuarioActual() usuario: UsuarioDelToken) {
    return this.servicio.crear(datos, usuario.sub);
  }

  @Patch(':id')
  editar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() datos: EditarEventoDto,
    @UsuarioActual() usuario: UsuarioDelToken,
  ) {
    return this.servicio.editar(id, datos, usuario.sub);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicio.eliminar(id);
  }
}
