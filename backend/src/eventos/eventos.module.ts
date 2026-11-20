import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './evento.entity';
import { EventosService } from './eventos.service';
import { EventosController, EventosAdminController } from './eventos.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Evento]), AuthModule],
  controllers: [EventosController, EventosAdminController],
  providers: [EventosService],
})
export class EventosModule {}
