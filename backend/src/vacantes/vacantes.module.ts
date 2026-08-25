import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacante } from './vacante.entity';
import { VacantesService } from './vacantes.service';
import { VacantesController } from './vacantes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vacante])],
  controllers: [VacantesController],
  providers: [VacantesService],
})
export class VacantesModule {}