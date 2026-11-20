import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';

/** Lo que el panel puede mandar al crear una cifra. */
export class CrearCifraDto {
  @IsString()
  @IsNotEmpty({ message: 'El texto es obligatorio' })
  @MaxLength(200, { message: 'El texto no puede pasar de 200 caracteres' })
  texto: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

/** Al editar, todos los campos son opcionales. */
export class EditarCifraDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  texto?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}
