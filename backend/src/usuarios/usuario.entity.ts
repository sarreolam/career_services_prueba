import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Usuarios del panel de administración.
 *
 * El sitio público NO tiene inicio de sesión: estos usuarios existen
 * solo para que Career Services edite cifras, eventos e historias.
 */
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Nombre de acceso. Único en toda la tabla. */
  @Column({ unique: true, length: 60 })
  usuario: string;

  /**
   * Hash bcrypt de la contraseña. NUNCA la contraseña en texto plano.
   * Se excluye de las consultas por defecto (`select: false`), así que
   * para leerla hay que pedirla explícitamente. Ver usuarios.service.ts.
   */
  @Column({ name: 'contrasena_hash', select: false })
  contrasenaHash: string;

  /** Nombre visible de la persona, para mostrarlo en el panel. */
  @Column({ length: 120 })
  nombre: string;

  /** Permite revocar el acceso sin borrar el usuario ni su historial de ediciones. */
  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;
}
