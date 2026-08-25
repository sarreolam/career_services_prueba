import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacante } from './vacante.entity';

@Injectable()
export class VacantesService {
  constructor(
    @InjectRepository(Vacante)
    private repo: Repository<Vacante>,
  ) {}

  findAll(): Promise<Vacante[]> {
    return this.repo.find({ order: { creadaEn: 'DESC' } });
  }

  create(data: Partial<Vacante>): Promise<Vacante> {
    return this.repo.save(this.repo.create(data));
  }
}