import 'dotenv/config';
import fuente from './data-source';
import { Usuario } from './usuarios/usuario.entity';
import { Cifra } from './cifras/cifra.entity';
import { Evento } from './eventos/evento.entity';
import { Historia } from './historias/historia.entity';
import { UsuariosService } from './usuarios/usuarios.service';

/**
 * Carga inicial de la base de datos.
 *
 * Se ejecuta con:  npm run semilla
 *
 * Es idempotente: si una tabla ya tiene registros, la deja como está.
 * Correrlo dos veces no duplica nada.
 */

/** Cifras tal como vienen en el documento de arquitectura. */
const CIFRAS = [
  'Más de 2,000 empresas aliadas',
  'Más de 2,800 ofertas laborales al año',
  'Más de 10,000 postulaciones al año',
  'Más de 4,800 usuarios nuevos por año',
  'Más de 150 encuentros y experiencias profesionales al año',
  'Presencia en 3 sedes: Ciudad de México, Guadalajara y Aguascalientes',
];

/**
 * El primer evento es la ficha tipo del documento de arquitectura.
 * Los demás son ejemplos para poder probar los filtros: reemplázalos
 * desde el panel con los eventos reales del semestre.
 */
const EVENTOS = [
  {
    titulo: 'Feria de Empleo UP 2027',
    descripcion:
      'El punto de encuentro anual entre la comunidad UP y las organizaciones líderes del mercado.',
    categoria: 'Ferias de empleo' as const,
    formato: 'Híbrido' as const,
    fecha: '2027-03-11',
    fechaFin: null,
    horario: '9:00 – 16:00 h',
    sede: 'Guadalajara' as const,
    dirigidoA: 'Alumnos de últimos semestres y egresados UP',
    enlaceRegistro: null,
    enInicio: true,
  },
  {
    titulo: 'EJEMPLO · Taller: CV de alto impacto',
    descripcion:
      'Sesión práctica para estructurar un currículum que pase los filtros automáticos de selección.',
    categoria: 'Talleres estratégicos' as const,
    formato: 'Presencial' as const,
    fecha: '2027-02-23',
    fechaFin: null,
    horario: '16:00 – 18:00 h',
    sede: 'Ciudad de México' as const,
    dirigidoA: 'Alumnos de todos los semestres',
    enlaceRegistro: null,
    enInicio: true,
  },
  {
    titulo: 'EJEMPLO · Reclutamiento directo: sector financiero',
    descripcion:
      'Entrevistas en sitio con instituciones financieras que buscan perfiles de analista.',
    categoria: 'Reclutamiento directo' as const,
    formato: 'Presencial' as const,
    fecha: '2027-03-04',
    fechaFin: null,
    horario: '10:00 – 14:00 h',
    sede: 'Ciudad de México' as const,
    dirigidoA: 'Egresados con hasta 3 años de experiencia',
    enlaceRegistro: null,
    enInicio: true,
  },
  {
    titulo: 'EJEMPLO · Semana de la industria manufacturera',
    descripcion:
      'Cinco días de presentaciones de marca empleadora con las principales manufactureras del Bajío.',
    categoria: 'Eventos de industria' as const,
    formato: 'Presencial' as const,
    fecha: '2027-04-19',
    fechaFin: '2027-04-23',
    horario: 'Consultar programa',
    sede: 'Aguascalientes' as const,
    dirigidoA: 'Alumnos de ingeniería y egresados',
    enlaceRegistro: null,
    enInicio: false,
  },
];

/** Marcadas como EJEMPLO: no son testimonios reales. */
const HISTORIAS = [
  {
    tipo: 'Alumno' as const,
    nombre: 'EJEMPLO · Nombre del alumno',
    detalle: 'Carrera · Semestre',
    testimonio:
      'Testimonio pendiente. Reemplázalo desde el panel de administración con un caso real de un alumno.',
    orden: 1,
  },
  {
    tipo: 'Egresado' as const,
    nombre: 'EJEMPLO · Nombre del egresado',
    detalle: 'Carrera · Generación',
    testimonio:
      'Testimonio pendiente. Reemplázalo desde el panel de administración con un caso real de un egresado.',
    orden: 2,
  },
  {
    tipo: 'Empresa' as const,
    nombre: 'EJEMPLO · Nombre de la empresa',
    detalle: 'Giro · Aliada desde el año',
    testimonio:
      'Testimonio pendiente. Reemplázalo desde el panel de administración con un caso real de una empresa aliada.',
    orden: 3,
  },
];

async function sembrar() {
  await fuente.initialize();
  console.log('Conectado a la base de datos.\n');

  const repoUsuarios = fuente.getRepository(Usuario);
  const repoCifras = fuente.getRepository(Cifra);
  const repoEventos = fuente.getRepository(Evento);
  const repoHistorias = fuente.getRepository(Historia);

  // ---------- Usuario administrador ----------
  const nombreUsuario = process.env.ADMIN_USUARIO ?? 'admin';
  const contrasena = process.env.ADMIN_CONTRASENA;

  if (!contrasena) {
    throw new Error(
      'Falta ADMIN_CONTRASENA en el archivo .env. Define una contraseña antes de correr la semilla.',
    );
  }

  let admin = await repoUsuarios.findOneBy({ usuario: nombreUsuario });

  if (admin) {
    console.log(`Usuario "${nombreUsuario}" ya existe, no se toca.`);
  } else {
    admin = await repoUsuarios.save(
      repoUsuarios.create({
        usuario: nombreUsuario,
        nombre: process.env.ADMIN_NOMBRE ?? 'Administrador Career Services',
        contrasenaHash: await UsuariosService.encriptar(contrasena),
      }),
    );
    console.log(`Usuario administrador creado: ${nombreUsuario}`);
  }

  // ---------- Cifras ----------
  if ((await repoCifras.count()) > 0) {
    console.log('La tabla cifras ya tiene datos, no se toca.');
  } else {
    await repoCifras.save(
      CIFRAS.map((texto, i) =>
        repoCifras.create({ texto, orden: i + 1, actualizadoPor: admin }),
      ),
    );
    console.log(`${CIFRAS.length} cifras insertadas.`);
  }

  // ---------- Eventos ----------
  if ((await repoEventos.count()) > 0) {
    console.log('La tabla eventos ya tiene datos, no se toca.');
  } else {
    await repoEventos.save(
      EVENTOS.map((e) => repoEventos.create({ ...e, actualizadoPor: admin })),
    );
    console.log(`${EVENTOS.length} eventos insertados.`);
  }

  // ---------- Historias ----------
  if ((await repoHistorias.count()) > 0) {
    console.log('La tabla historias ya tiene datos, no se toca.');
  } else {
    await repoHistorias.save(
      HISTORIAS.map((h) => repoHistorias.create({ ...h, actualizadoPor: admin })),
    );
    console.log(`${HISTORIAS.length} historias insertadas.`);
  }

  console.log('\nListo.');
  console.log(
    'Los registros con "EJEMPLO ·" en el título son de relleno para probar.\n' +
      'Reemplázalos desde el panel de administración antes de publicar el sitio.',
  );

  await fuente.destroy();
}

sembrar().catch((error) => {
  console.error('\nLa semilla falló:', error.message);
  process.exit(1);
});
