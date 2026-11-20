import { IsIn, IsOptional, IsBooleanString } from 'class-validator';
import { CATEGORIAS_EVENTO, SEDES } from '../evento.entity';
import type { CategoriaEvento, Sede } from '../evento.entity';

/**
 * Filtros que acepta GET /api/eventos como parámetros de consulta.
 * Ejemplo: /api/eventos?categoria=Conferencias&soloFuturos=true
 */
export class FiltrarEventosDto {
  @IsOptional()
  @IsIn(CATEGORIAS_EVENTO)
  categoria?: CategoriaEvento;

  @IsOptional()
  @IsIn(SEDES)
  sede?: Sede;

  /** true devuelve solo los tres marcados para el inicio. */
  @IsOptional()
  @IsBooleanString()
  enInicio?: string;

  /** true descarta los eventos cuya fecha ya pasó. */
  @IsOptional()
  @IsBooleanString()
  soloFuturos?: string;
}
