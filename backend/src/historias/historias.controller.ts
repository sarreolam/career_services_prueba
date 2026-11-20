import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HistoriasService } from './historias.service';
import { CrearHistoriaDto, EditarHistoriaDto } from './dto/guardar-historia.dto';
import { GuardiaAdmin } from '../auth/guardia-admin';
import type { UsuarioDelToken } from '../auth/guardia-admin';
import { UsuarioActual } from '../auth/usuario-actual.decorador';

@Controller('historias')
export class HistoriasController {
  constructor(private servicio: HistoriasService) {}

  @Get()
  listar() {
    return this.servicio.listarPublicas();
  }
}

@Controller('admin/historias')
@UseGuards(GuardiaAdmin)
export class HistoriasAdminController {
  constructor(private servicio: HistoriasService) {}

  @Get()
  listar() {
    return this.servicio.listarTodas();
  }

  @Get(':id')
  buscarUna(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicio.buscarUna(id);
  }

  @Post()
  crear(
    @Body() datos: CrearHistoriaDto,
    @UsuarioActual() usuario: UsuarioDelToken,
  ) {
    return this.servicio.crear(datos, usuario.sub);
  }

  @Patch(':id')
  editar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() datos: EditarHistoriaDto,
    @UsuarioActual() usuario: UsuarioDelToken,
  ) {
    return this.servicio.editar(id, datos, usuario.sub);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicio.eliminar(id);
  }
}
