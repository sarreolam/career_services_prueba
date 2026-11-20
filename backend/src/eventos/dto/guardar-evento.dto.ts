import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsIn,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsUrl,
} from 'class-validator';
import {
  CATEGORIAS_EVENTO,
  FORMATOS_EVENTO,
  SEDES,
} from '../evento.entity';
import type { CategoriaEvento, FormatoEvento, Sede } from '../evento.entity';

export class CrearEventoDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MaxLength(200)
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsIn(CATEGORIAS_EVENTO, {
    message: `La categoría debe ser una de: ${CATEGORIAS_EVENTO.join(', ')}`,
  })
  categoria: CategoriaEvento;

  @IsIn(FORMATOS_EVENTO, {
    message: `El formato debe ser uno de: ${FORMATOS_EVENTO.join(', ')}`,
  })
  formato: FormatoEvento;

  @IsDateString({}, { message: 'La fecha debe venir como AAAA-MM-DD' })
  fecha: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de cierre debe venir como AAAA-MM-DD' })
  fechaFin?: string;

  @IsString()
  @IsNotEmpty({ message: 'El horario es obligatorio' })
  @MaxLength(60)
  horario: string;

  @IsIn(SEDES, { message: `La sede debe ser una de: ${SEDES.join(', ')}` })
  sede: Sede;

  @IsString()
  @IsNotEmpty({ message: 'Hay que indicar a quién va dirigido' })
  @MaxLength(200)
  dirigidoA: string;

  @IsOptional()
  @IsUrl({}, { message: 'El enlace de registro debe ser una URL válida' })
  @MaxLength(500)
  enlaceRegistro?: string;

  /** Marca el evento para el apartado "Próximos eventos" del inicio. */
  @IsOptional()
  @IsBoolean()
  enInicio?: boolean;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

export class EditarEventoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titulo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsIn(CATEGORIAS_EVENTO)
  categoria?: CategoriaEvento;

  @IsOptional()
  @IsIn(FORMATOS_EVENTO)
  formato?: FormatoEvento;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  horario?: string;

  @IsOptional()
  @IsIn(SEDES)
  sede?: Sede;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  dirigidoA?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  enlaceRegistro?: string;

  @IsOptional()
  @IsBoolean()
  enInicio?: boolean;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}
