import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cifra } from './cifra.entity';
import { CifrasService } from './cifras.service';
import { CifrasController, CifrasAdminController } from './cifras.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cifra]), AuthModule],
  controllers: [CifrasController, CifrasAdminController],
  providers: [CifrasService],
})
export class CifrasModule {}
