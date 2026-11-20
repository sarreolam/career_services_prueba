import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsIn,
  IsInt,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';
import { TIPOS_HISTORIA } from '../historia.entity';
import type { TipoHistoria } from '../historia.entity';

export class CrearHistoriaDto {
  @IsIn(TIPOS_HISTORIA, {
    message: `El tipo debe ser uno de: ${TIPOS_HISTORIA.join(', ')}`,
  })
  tipo: TipoHistoria;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(120)
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El detalle es obligatorio (carrera, generación o giro)' })
  @MaxLength(160)
  detalle: string;

  @IsString()
  @IsNotEmpty({ message: 'El testimonio es obligatorio' })
  testimonio: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imagenUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

export class EditarHistoriaDto {
  @IsOptional()
  @IsIn(TIPOS_HISTORIA)
  tipo?: TipoHistoria;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  detalle?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  testimonio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imagenUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}
