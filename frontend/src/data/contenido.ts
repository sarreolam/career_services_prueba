import type { Recurso, Testimonio } from './tipos';

/* Testimonios: el documento pide 3 (Alumno | Egresado | Empresa). Pendientes del cliente. */
export const TESTIMONIOS: Testimonio[] = [
  { id: 't-alumno', perfil: 'Alumno', cita: null, nombre: null, detalle: null },
  { id: 't-egresado', perfil: 'Egresado', cita: null, nombre: null, detalle: null },
  { id: 't-empresa', perfil: 'Empresa', cita: null, nombre: null, detalle: null },
];

/* Recursos profesionales (guías prácticas) — títulos del documento de arquitectura */
export const GUIAS: Recurso[] = [
  { id: 'cv', titulo: 'Estrategias para redactar un CV de alto impacto', resumen: null, url: null },
  { id: 'linkedin', titulo: 'Optimización de perfil laboral en LinkedIn', resumen: null, url: null },
  { id: 'entrevistas', titulo: 'Técnicas para dominar entrevistas por competencias', resumen: null, url: null },
  { id: 'ia', titulo: 'Uso responsable de Inteligencia Artificial en la búsqueda de empleo', resumen: null, url: null },
  { id: 'networking', titulo: 'Estrategia y etiqueta para un networking efectivo', resumen: null, url: null },
];

export const TEMAS_OBSERVATORIO = [
  'Tendencias de contratación y perfiles en demanda.',
  'Sectores estratégicos y proyecciones de empleabilidad local y nacional.',
  'Competencias profesionales emergentes.',
  'Análisis y referencias del panorama laboral.',
];
