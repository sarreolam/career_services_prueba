import type { Campus, Cifra } from './tipos';

/** Enlaces externos. null = pendiente (el botón se muestra como "Próximamente"). */
export const ENLACES = {
  /** Conecta UP → Trabajos exclusivos (requiere iniciar sesión) */
  vacantesExclusivas: 'https://alumni.up.edu.mx/trabajo/trabajos-en-mexico',
  /** Conecta UP → Trabajos en la red (requiere iniciar sesión) */
  ofertasEnLaRed: 'https://alumni.up.edu.mx/trabajos/ofertas-en-la-red',
  /** Página del observatorio: el cliente la está construyendo aparte */
  observatorio: null as string | null,
  /** Tutoriales de registro para empresas: el cliente ya los tiene, falta recibirlos */
  tutorialesEmpresas: null as string | null,
};

export const NAVEGACION = [
  { etiqueta: 'Inicio', ruta: '/' },
  { etiqueta: 'Career Services', ruta: '/career-services' },
  { etiqueta: 'Servicios', ruta: '/servicios' },
  { etiqueta: 'Alumnos y Egresados', ruta: '/alumnos-egresados' },
  { etiqueta: 'Empresas', ruta: '/empresas' },
  { etiqueta: 'Eventos', ruta: '/eventos' },
  { etiqueta: 'Recursos', ruta: '/recursos' },
];

/** Nuestro impacto en cifras (información intercampi) */
export const CIFRAS: Cifra[] = [
  { valor: '+2,000', etiqueta: 'Empresas aliadas' },
  { valor: '+2,800', etiqueta: 'Ofertas laborales al año' },
  { valor: '+10,000', etiqueta: 'Postulaciones al año' },
  { valor: '+4,800', etiqueta: 'Usuarios nuevos por año' },
  { valor: '+150', etiqueta: 'Encuentros y experiencias profesionales al año' },
];

/** TODO: confirmar teléfonos y correos de Career Services con el cliente */
export const CAMPUS: Campus[] = [
  {
    nombre: 'Campus Ciudad de México',
    ciudad: 'Ciudad de México',
    direccion: 'Augusto Rodin 498, Insurgentes Mixcoac, Benito Juárez, CDMX.',
    telefono: '+52 (55) 5482 1600',
    correo: 'careerservices_mex@up.edu.mx',
  },
  {
    nombre: 'Campus Guadalajara',
    ciudad: 'Guadalajara',
    direccion: 'Calz. Circunvalación Poniente 49, Cd. Granja, Zapopan, Jalisco.',
    telefono: '+52 (33) 1368 2200',
    correo: 'careerservices_gdl@up.edu.mx',
  },
  {
    nombre: 'Campus Aguascalientes',
    ciudad: 'Aguascalientes',
    direccion: 'Josemaría Escrivá de Balaguer 101, Rústicos Calpulli, Aguascalientes, Ags.',
    telefono: '+52 (449) 910 6200',
    correo: 'careerservices_ags@up.edu.mx',
  },
];
