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
import { CifrasService } from './cifras.service';
import { CrearCifraDto, EditarCifraDto } from './dto/guardar-cifra.dto';
import { GuardiaAdmin } from '../auth/guardia-admin';
import type { UsuarioDelToken } from '../auth/guardia-admin';
import { UsuarioActual } from '../auth/usuario-actual.decorador';

/** Rutas PÚBLICAS: las consume el sitio, sin token. */
@Controller('cifras')
export class CifrasController {
  constructor(private servicio: CifrasService) {}

  @Get()
  listar() {
    return this.servicio.listarPublicas();
  }
}

/** Rutas del PANEL: todas exigen token de administrador. */
@Controller('admin/cifras')
@UseGuards(GuardiaAdmin)
export class CifrasAdminController {
  constructor(private servicio: CifrasService) {}

  @Get()
  listar() {
    return this.servicio.listarTodas();
  }

  @Get(':id')
  buscarUna(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicio.buscarUna(id);
  }

  @Post()
  crear(@Body() datos: CrearCifraDto, @UsuarioActual() usuario: UsuarioDelToken) {
    return this.servicio.crear(datos, usuario.sub);
  }

  @Patch(':id')
  editar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() datos: EditarCifraDto,
    @UsuarioActual() usuario: UsuarioDelToken,
  ) {
    return this.servicio.editar(id, datos, usuario.sub);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicio.eliminar(id);
  }
}
