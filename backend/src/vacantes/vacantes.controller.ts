import { Controller, Get, Post, Body } from '@nestjs/common';
import { VacantesService } from './vacantes.service';

@Controller('vacantes')
export class VacantesController {
  constructor(private readonly service: VacantesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: { titulo: string; empresa: string; descripcion?: string }) {
    return this.service.create(body);
  }
}