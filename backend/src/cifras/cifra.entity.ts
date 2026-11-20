import { Entity, Column } from 'typeorm';
import { EntidadBase } from '../comun/entidad-base';

/**
 * Sección "Nuestro impacto en cifras" del inicio.
 *
 * El texto va completo en un solo campo, como lo pide el documento de
 * arquitectura ("Más de 2,000 empresas aliadas"), para que Career Services
 * pueda redactarlo libremente sin pelear con un número y una etiqueta aparte.
 */
@Entity('cifras')
export class Cifra extends EntidadBase {
  @Column({ length: 200 })
  texto: string;

  /** Posición en la que aparece. Menor número, más arriba. */
  @Column({ default: 0 })
  orden: number;
}
