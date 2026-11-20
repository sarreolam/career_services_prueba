import { Entity, Column, Index } from 'typeorm';
import { EntidadBase } from '../comun/entidad-base';

/** Los seis filtros de búsqueda que pide el documento de arquitectura. */
export const CATEGORIAS_EVENTO = [
  'Ferias de empleo',
  'Reclutamiento directo',
  'Talleres estratégicos',
  'Conferencias',
  'Networking',
  'Eventos de industria',
] as const;
export type CategoriaEvento = (typeof CATEGORIAS_EVENTO)[number];

export const FORMATOS_EVENTO = ['Presencial', 'Híbrido', 'En línea'] as const;
export type FormatoEvento = (typeof FORMATOS_EVENTO)[number];

export const SEDES = [
  'Ciudad de México',
  'Guadalajara',
  'Aguascalientes',
  'Intercampi',
] as const;
export type Sede = (typeof SEDES)[number];

/**
 * Sección "Eventos y experiencias".
 * Los campos salen de la ficha tipo del documento de arquitectura.
 */
@Entity('eventos')
export class Evento extends EntidadBase {
  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Index()
  @Column({ type: 'varchar', length: 40 })
  categoria: CategoriaEvento;

  @Column({ type: 'varchar', length: 20 })
  formato: FormatoEvento;

  /**
   * Fecha de inicio. Tipo `date` (sin hora) porque la hora se captura
   * aparte como texto libre.
   */
  @Column({ type: 'date' })
  fecha: string;

  /**
   * Fecha de cierre, solo para eventos de varios días
   * ("20 – 24 de abril"). Null si es de un solo día.
   */
  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin: string | null;

  /**
   * Horario como texto libre: "9:00 – 16:00 h", "Consultar programa".
   * Se guarda así a propósito, porque el documento muestra formatos
   * que no caben en un campo de hora.
   */
  @Column({ length: 60 })
  horario: string;

  @Column({ type: 'varchar', length: 40 })
  sede: Sede;

  /** "Alumnos de últimos semestres y egresados UP". */
  @Column({ name: 'dirigido_a', length: 200 })
  dirigidoA: string;

  /** Destino del botón "Confirmar mi asistencia". */
  @Column({ name: 'enlace_registro', type: 'varchar', length: 500, nullable: true })
  enlaceRegistro: string | null;

  /**
   * La columna extra que pediste: marca los eventos que aparecen en el
   * apartado "Próximos eventos" del inicio. El documento pide tres.
   */
  @Index()
  @Column({ name: 'en_inicio', default: false })
  enInicio: boolean;
}
