import { Boton, EnlaceFlecha } from '../components/Boton';
import { EncabezadoSeccion, Etiqueta, ItemCifra, TarjetaInfo } from '../components/Bloques';
import { FotoConTahali, Tahali } from '../components/Marca';
import { TarjetaEvento } from '../components/TarjetaEvento';
import { EVENTOS } from '../data/eventos';
import { CIFRAS, ENLACES } from '../data/sitio';

const ACCESOS = [
  {
    etiqueta: 'Para ti',
    titulo: 'Alumnos y Egresados',
    texto: 'Descubre oportunidades a tu medida, potencia tus habilidades y da el siguiente paso en el mercado laboral con seguridad.',
    enlace: 'Ir a Alumnos y Egresados',
    ruta: '/alumnos-egresados',
  },
  {
    etiqueta: 'Para tu organización',
    titulo: 'Empresas',
    texto: 'Conecta con el talento de la UP y fortalece tu estrategia de atracción con perfiles de alto impacto.',
    enlace: 'Ir a Empresas',
    ruta: '/empresas',
  },
  {
    etiqueta: 'Agenda',
    titulo: 'Eventos y Experiencias',
    texto: 'Estar presente es clave. Participa en ferias de empleo, talleres prácticos, conferencias y encuentros clave con la industria.',
    enlace: 'Ver eventos',
    ruta: '/eventos',
  },
];

export default function Inicio() {
  const destacados = EVENTOS.filter((e) => e.destacado).slice(0, 3);

  return (
    <>
      {/* Mensaje principal */}
      <section className="bg-vino-900">
        <div className="contenedor grid items-center gap-12 py-20 md:py-24 lg:grid-cols-[1fr_460px] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Etiqueta tono="oscuro">Career Services · Universidad Panamericana</Etiqueta>
            <h1 className="titulo-h1 text-white">
              Tu talento, conectado con el <em className="font-semibold text-dorado-300">futuro que buscas.</em>
            </h1>
            <p className="max-w-[640px] text-lg leading-relaxed text-dorado-100">
              En Career Services de la Universidad Panamericana impulsamos tu trayectoria profesional. Somos el puente
              entre la excelencia de nuestros alumnos y egresados y las organizaciones líderes que buscan perfiles
              capaces de transformar e innovar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Boton to="/alumnos-egresados?vista=alumnos">Soy alumno</Boton>
              <Boton to="/alumnos-egresados?vista=egresados" variante="claro">Soy egresado</Boton>
              <Boton to="/empresas" variante="claro">Soy empresa</Boton>
            </div>
            <p className="text-sm text-dorado-300">Ciudad de México · Guadalajara · Aguascalientes</p>
          </div>
          <FotoConTahali tono="oscuro" />
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="seccion bg-crema">
        <div className="contenedor flex flex-col gap-12">
          <EncabezadoSeccion etiqueta="Accesos rápidos" titulo="Encuentra lo que necesitas según tu perfil" />
          <div className="grid gap-8 md:grid-cols-3">
            {ACCESOS.map((a) => (
              <TarjetaInfo key={a.titulo} etiqueta={a.etiqueta} titulo={a.titulo} pie={<EnlaceFlecha to={a.ruta}>{a.enlace}</EnlaceFlecha>}>
                {a.texto}
              </TarjetaInfo>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro impacto en cifras */}
      <section className="seccion bg-vino-900">
        <div className="contenedor flex flex-col gap-12">
          <EncabezadoSeccion etiqueta="Respaldo institucional" titulo="Nuestro impacto en cifras" centrado tono="oscuro" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {CIFRAS.map((c) => (
              <ItemCifra key={c.etiqueta} cifra={c} />
            ))}
          </div>
          <p className="text-center text-sm text-dorado-300">Información intercampi.</p>
        </div>
      </section>

      {/* Próximos eventos */}
      <section className="seccion">
        <div className="contenedor flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <EncabezadoSeccion
              etiqueta="Eventos y experiencias"
              titulo="Próximos eventos"
              descripcion="Las fechas y experiencias más relevantes para impulsar tu trayectoria."
            />
            <Boton to="/eventos" variante="secundario" className="self-start md:self-auto">
              Ver todos los eventos
            </Boton>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destacados.map((e) => (
              <TarjetaEvento key={e.id} evento={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner a Conecta UP */}
      <section className="pb-16 md:pb-24">
        <div className="contenedor">
          <div className="relative flex flex-col gap-8 overflow-hidden rounded bg-vino-700 px-8 py-12 md:px-16 md:py-14 lg:flex-row lg:items-center lg:justify-between">
            <Tahali className="pointer-events-none absolute -right-10 inset-y-0 hidden w-48 bg-vino-900/40 lg:block" />
            <div className="relative flex max-w-[680px] flex-col gap-4">
              <Etiqueta tono="oscuro">Bolsa de trabajo exclusiva</Etiqueta>
              <h2 className="titulo-h2 text-white">Da el siguiente paso en tu trayectoria profesional.</h2>
              <p className="text-lg leading-relaxed text-dorado-100">
                Explora oportunidades diseñadas para el perfil UP en Conecta UP, la plataforma de vacantes de la
                Universidad.
              </p>
            </div>
            <div className="relative flex flex-col items-start gap-3 lg:items-end">
              <Boton href={ENLACES.vacantesExclusivas}>Explorar vacantes</Boton>
              <Boton to="/contacto" variante="claro">Contacto</Boton>
              <p className="text-sm text-dorado-300">Requiere iniciar sesión en Conecta UP</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
