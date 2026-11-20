import { Entity, Column } from 'typeorm';
import { EntidadBase } from '../comun/entidad-base';

export const TIPOS_HISTORIA = ['Alumno', 'Egresado', 'Empresa'] as const;
export type TipoHistoria = (typeof TIPOS_HISTORIA)[number];

/**
 * Sección "Historias de impacto".
 * El documento pide tres testimonios: alumno, egresado y empresa.
 */
@Entity('historias')
export class Historia extends EntidadBase {
  @Column({ type: 'varchar', length: 20 })
  tipo: TipoHistoria;

  /** Nombre de la persona o de la empresa. */
  @Column({ length: 120 })
  nombre: string;

  /** Carrera y semestre, generación, o giro y antigüedad de la empresa. */
  @Column({ length: 160 })
  detalle: string;

  @Column({ type: 'text' })
  testimonio: string;

  /** Ruta o URL de la fotografía. Queda en null mientras no haya material. */
  @Column({ name: 'imagen_url', type: 'varchar', length: 500, nullable: true })
  imagenUrl: string | null;

  @Column({ default: 0 })
  orden: number;
}
