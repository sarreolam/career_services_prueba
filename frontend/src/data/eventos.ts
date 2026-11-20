import type { CategoriaEvento, Evento } from './tipos';

export const CATEGORIAS_EVENTO: CategoriaEvento[] = [
  'Ferias de empleo',
  'Reclutamiento directo',
  'Talleres estratégicos',
  'Conferencias',
  'Networking',
  'Eventos de industria',
];

/*
 * Solo "Feria de Empleo UP 2026" viene del documento de arquitectura.
 * El resto son ejemplos (esEjemplo: true) para mostrar cómo se ve la ficha.
 * Más adelante esto se reemplaza por GET /eventos.
 */
export const EVENTOS: Evento[] = [
  {
    id: 'feria-empleo-2026',
    titulo: 'Feria de Empleo UP 2026',
    descripcion:
      'El punto de encuentro anual entre la comunidad UP Guadalajara y las organizaciones líderes del mercado.',
    categoria: 'Ferias de empleo',
    formato: 'Presencial / Híbrido',
    fecha: null,
    hora: null,
    dirigidoA: 'Alumnos de últimos semestres y Egresados UP',
    destacado: true,
    esEjemplo: false,
  },
  {
    id: 'taller-cv-linkedin',
    titulo: 'Taller de CV y LinkedIn',
    descripcion:
      'Sesión práctica para optimizar la forma en que te presentas ante el mercado laboral.',
    categoria: 'Talleres estratégicos',
    formato: 'Presencial',
    fecha: null,
    hora: null,
    dirigidoA: 'Alumnos UP',
    destacado: true,
    esEjemplo: true,
  },
  {
    id: 'networking-industria',
    titulo: 'Encuentro de networking con la industria',
    descripcion:
      'Espacio para crear relaciones de valor con reclutadores, líderes de industria y mentores.',
    categoria: 'Networking',
    formato: 'Presencial',
    fecha: null,
    hora: null,
    dirigidoA: 'Alumnos y Egresados UP',
    destacado: true,
    esEjemplo: true,
  },
  {
    id: 'reclutamiento-campus',
    titulo: 'Sesión de reclutamiento en campus',
    descripcion: 'Proceso de selección en campus para prácticas e internships.',
    categoria: 'Reclutamiento directo',
    formato: 'Presencial',
    fecha: null,
    hora: null,
    dirigidoA: 'Alumnos de últimos semestres',
    destacado: false,
    esEjemplo: true,
  },
  {
    id: 'conferencia-tendencias',
    titulo: 'Conferencia: tendencias del mercado laboral',
    descripcion:
      'Charla con especialistas sobre posiciones emergentes y competencias más valoradas.',
    categoria: 'Conferencias',
    formato: 'Híbrido',
    fecha: null,
    hora: null,
    dirigidoA: 'Alumnos y Egresados UP',
    destacado: false,
    esEjemplo: true,
  },
  {
    id: 'encuentro-sectorial',
    titulo: 'Encuentro sectorial',
    descripcion: 'Conoce retos, cultura laboral y oportunidades de un sector estratégico.',
    categoria: 'Eventos de industria',
    formato: 'Presencial',
    fecha: null,
    hora: null,
    dirigidoA: 'Alumnos y Egresados UP',
    destacado: false,
    esEjemplo: true,
  },
];
