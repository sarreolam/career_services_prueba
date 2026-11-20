import { Boton, EnlaceFlecha } from '../components/Boton';
import { EncabezadoSeccion, Etiqueta, HeroInterno, TarjetaInfo } from '../components/Bloques';
import { Icono } from '../components/Icono';
import { GUIAS, TEMAS_OBSERVATORIO } from '../data/contenido';
import { ENLACES } from '../data/sitio';

export default function Recursos() {
  return (
    <>
      <HeroInterno
        etiqueta="Recursos y mercado laboral"
        titulo="Información estratégica para decisiones profesionales con fundamento."
        descripcion="Explora nuestro espacio de conocimiento sobre tendencias de contratación, herramientas de vanguardia y análisis de entorno."
        conFoto={false}
      />

      <section className="seccion">
        <div className="contenedor flex flex-col gap-12">
          <EncabezadoSeccion etiqueta="1 · Recursos profesionales" titulo="Guías prácticas" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {GUIAS.map((g, i) => (
              <TarjetaInfo
                key={g.id}
                etiqueta={`Guía 0${i + 1}`}
                titulo={g.titulo}
                pie={g.url ? <EnlaceFlecha href={g.url}>Leer guía</EnlaceFlecha> : <span className="text-sm text-tinta-suave">Guía próximamente</span>}
              >
                {g.resumen ?? '[Resumen breve de la guía — contenido pendiente]'}
              </TarjetaInfo>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion bg-vino-900">
        <div className="contenedor grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            <Etiqueta tono="oscuro">2 · Mercado laboral y observatorio</Etiqueta>
            <h2 className="titulo-h2 text-white">Análisis estratégico</h2>
            <p className="leading-relaxed text-dorado-300">
              El observatorio vive en una página aparte. Este botón se vinculará cuando esté lista.
            </p>
            <Boton href={ENLACES.observatorio}>Ir al observatorio</Boton>
          </div>
          <ul className="flex flex-col gap-4 rounded bg-vino-700 p-8">
            {TEMAS_OBSERVATORIO.map((t) => (
              <li key={t} className="flex items-start gap-3 text-white">
                <Icono nombre="check" className="mt-0.5 size-[18px] text-dorado-300" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
