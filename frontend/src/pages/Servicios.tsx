import { Boton, EnlaceFlecha } from '../components/Boton';
import { Etiqueta, HeroInterno, TarjetaInfo } from '../components/Bloques';
import { Icono } from '../components/Icono';
import { ENLACES } from '../data/sitio';

const ASESORIA = [
  'Estructuración de CV estratégico.',
  'Optimización de perfil en LinkedIn.',
  'Simulación de entrevistas de selección.',
  'Proyección de tu marca personal.',
  'Estrategias de búsqueda activa y posicionamiento.',
];

export default function Servicios() {
  return (
    <>
      <HeroInterno etiqueta="Servicios" titulo="Impulso integral para alumnos y egresados" />

      {/* Bolsa de trabajo exclusiva → Conecta UP */}
      <section className="seccion bg-vino-900">
        <div className="contenedor grid items-center gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Etiqueta tono="oscuro">Bolsa de trabajo exclusiva</Etiqueta>
            <h2 className="titulo-h2 text-white">Encuentra tu siguiente oportunidad</h2>
            <p className="text-lg leading-relaxed text-dorado-100">
              Explora oportunidades diseñadas para el perfil UP en empresas líderes. Encuentra desde prácticas
              profesionales e internships hasta posiciones operativas o directivas.
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <Boton href={ENLACES.vacantesExclusivas} className="w-full">Explorar vacantes disponibles</Boton>
            <Boton href={ENLACES.ofertasEnLaRed} variante="claro" className="w-full">Ver también ofertas en la red</Boton>
            <p className="text-sm text-dorado-300">
              Ambos botones abren Conecta UP (alumni.up.edu.mx). Se requiere iniciar sesión para ver las vacantes.
            </p>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <Etiqueta>Asesoría y acompañamiento profesional</Etiqueta>
            <h2 className="titulo-h2 text-vino-700">Optimiza la forma en que te presentas ante el mercado.</h2>
          </div>
          <div className="rounded bg-crema p-8">
            <p className="mb-4 text-[15px] font-semibold text-vino-700">Te guiamos en:</p>
            <ul className="flex flex-col gap-3.5">
              {ASESORIA.map((a) => (
                <li key={a} className="flex items-center gap-3">
                  <Icono nombre="check" className="size-[18px] text-vino-700" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="seccion bg-crema">
        <div className="contenedor grid gap-8 md:grid-cols-2">
          <TarjetaInfo etiqueta="Formación" titulo="Capacitación y talleres dinámicos" pie={<EnlaceFlecha to="/eventos">Ver talleres</EnlaceFlecha>}>
            Participa en sesiones diseñadas para desarrollar las competencias blandas y técnicas más valoradas por las
            organizaciones.
          </TarjetaInfo>
          <TarjetaInfo etiqueta="Vinculación" titulo="Encuentros y ferias de empleo" pie={<EnlaceFlecha to="/eventos">Ver próximas ferias</EnlaceFlecha>}>
            Espacios cara a cara con reclutadores para acelerar tu inserción o crecimiento laboral.
          </TarjetaInfo>
        </div>
      </section>
    </>
  );
}
