import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

/**
 * Columnas que comparten las tres tablas de contenido editable
 * (cifras, eventos, historias).
 *
 * No es una tabla: TypeORM copia estas columnas dentro de cada tabla
 * que extienda esta clase. Así no repetimos lo mismo tres veces.
 */
export abstract class EntidadBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Interruptor de publicación.
   * Permite ocultar algo del sitio sin borrarlo de la base.
   */
  @Column({ default: true })
  visible: boolean;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  /**
   * Quién fue el último en editar este registro (el `id_user` que pediste).
   * Si se borra el usuario, el registro se conserva y esta columna queda en null.
   */
  @ManyToOne(() => Usuario, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'actualizado_por_id' })
  actualizadoPor: Usuario | null;
}
