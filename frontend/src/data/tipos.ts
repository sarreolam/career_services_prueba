/*
 * Tipos de contenido del sitio.
 * Están pensados para que, más adelante, cada uno corresponda a una
 * entidad de TypeORM y a un endpoint de NestJS (GET /eventos, /testimonios…).
 * Mientras tanto, los datos viven en archivos estáticos dentro de /data.
 */

export type CategoriaEvento =
  | 'Ferias de empleo'
  | 'Reclutamiento directo'
  | 'Talleres estratégicos'
  | 'Conferencias'
  | 'Networking'
  | 'Eventos de industria';

export interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: CategoriaEvento;
  formato: string;
  /** Fecha ISO (AAAA-MM-DD). null = por confirmar */
  fecha: string | null;
  /** Ej. "10:00 – 14:00 hrs". null = por confirmar */
  hora: string | null;
  dirigidoA: string;
  /** Se muestra en el Inicio (máximo 3) */
  destacado: boolean;
  /** true = contenido de ejemplo, no es un evento real todavía */
  esEjemplo: boolean;
}

export type PerfilTestimonio = 'Alumno' | 'Egresado' | 'Empresa';

export interface Testimonio {
  id: string;
  perfil: PerfilTestimonio;
  /** null = pendiente de recibir del cliente */
  cita: string | null;
  nombre: string | null;
  detalle: string | null;
}

export interface Recurso {
  id: string;
  titulo: string;
  resumen: string | null;
  url: string | null;
}

export interface Cifra {
  valor: string;
  etiqueta: string;
}

export interface Campus {
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  correo: string;
}
