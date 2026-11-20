import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historia } from './historia.entity';
import { HistoriasService } from './historias.service';
import {
  HistoriasController,
  HistoriasAdminController,
} from './historias.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Historia]), AuthModule],
  controllers: [HistoriasController, HistoriasAdminController],
  providers: [HistoriasService],
})
export class HistoriasModule {}
