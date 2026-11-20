import { useSearchParams } from 'react-router-dom';
import { EnlaceFlecha } from '../components/Boton';
import { HeroInterno, TarjetaInfo } from '../components/Bloques';
import { ENLACES } from '../data/sitio';

type Vista = 'alumnos' | 'egresados';
type Pilar = { titulo: string; texto: string; enlace: string; ruta?: string; href?: string };

const VISTAS: Record<Vista, { titulo: string; pilares: Pilar[] }> = {
  alumnos: {
    titulo: 'Tu trayectoria profesional no empieza cuando te gradúas: empieza hoy.',
    pilares: [
      { titulo: 'Prepárate', texto: 'Perfecciona tu CV, aprende a proyectar tu marca personal y domina el arte del networking.', enlace: 'Ver asesoría', ruta: '/servicios' },
      { titulo: 'Explora', texto: 'Conoce a fondo cómo se mueven las industrias, las posiciones emergentes y las exigencias del mercado.', enlace: 'Ver recursos', ruta: '/recursos' },
      { titulo: 'Conecta', texto: 'Crea relaciones de valor con reclutadores, líderes de industria y mentores a través de nuestros eventos.', enlace: 'Ver eventos', ruta: '/eventos' },
      { titulo: 'Encuentra', texto: 'Postúlate a prácticas, internships, becas y tus primeras oportunidades laborales.', enlace: 'Explorar vacantes', href: ENLACES.vacantesExclusivas },
    ],
  },
  egresados: {
    titulo: 'Tu vínculo con la Universidad Panamericana trasciende las aulas.',
    pilares: [
      { titulo: 'Oportunidades de impacto', texto: 'Accede a posiciones ejecutivas y de liderazgo a través de nuestra plataforma de empleo.', enlace: 'Explorar vacantes', href: ENLACES.vacantesExclusivas },
      { titulo: 'Red Alumni', texto: 'Mantén tu red activa y genera alianzas de negocio o colaboración profesional con la comunidad UP.', enlace: 'Ver eventos de networking', ruta: '/eventos' },
      { titulo: 'Desarrollo continuo', texto: 'Actualiza tu perfil con talleres y herramientas para mantenerte competitivo ante el mercado cambiante.', enlace: 'Ver talleres', ruta: '/eventos' },
      { titulo: 'Evolución académica', texto: 'Descubre alternativas de formación continua y posgrados diseñados para potenciar tu carrera.', enlace: 'Ver recursos', ruta: '/recursos' },
    ],
  },
};

export default function AlumnosEgresados() {
  const [params, setParams] = useSearchParams();
  const vista: Vista = params.get('vista') === 'egresados' ? 'egresados' : 'alumnos';
  const datos = VISTAS[vista];

  // Filtro dinámico de entrada: [ SOY ALUMNO ] / [ SOY EGRESADO ]
  const selector = (
    <div role="tablist" aria-label="Selecciona tu perfil" className="inline-flex self-start rounded border border-borde bg-white p-1">
      {(['alumnos', 'egresados'] as Vista[]).map((v) => (
        <button
          key={v}
          role="tab"
          aria-selected={vista === v}
          onClick={() => setParams({ vista: v }, { replace: true })}
          className={`rounded px-4 py-2 text-[15px] font-semibold transition-colors ${
            vista === v ? 'bg-vino-700 text-white' : 'text-tinta hover:text-vino-700'
          }`}
        >
          {v === 'alumnos' ? 'Soy alumno' : 'Soy egresado'}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <HeroInterno etiqueta="Alumnos y Egresados" titulo={datos.titulo} arriba={selector} />
      <section className="seccion">
        <div className="contenedor flex flex-col gap-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {datos.pilares.map((p, i) => (
              <TarjetaInfo
                key={p.titulo}
                etiqueta={String(i + 1).padStart(2, '0')}
                titulo={p.titulo}
                pie={<EnlaceFlecha to={p.ruta} href={p.href}>{p.enlace}</EnlaceFlecha>}
              >
                {p.texto}
              </TarjetaInfo>
            ))}
          </div>
          <p className="text-sm text-tinta-suave">
            «Explorar vacantes» abre Conecta UP (alumni.up.edu.mx) y requiere iniciar sesión.
          </p>
        </div>
      </section>
    </>
  );
}
