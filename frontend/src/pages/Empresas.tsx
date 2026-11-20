import { Boton } from '../components/Boton';
import { EncabezadoSeccion, Etiqueta, HeroInterno, TarjetaInfo } from '../components/Bloques';
import { FotoProvisional } from '../components/Marca';
import { ENLACES } from '../data/sitio';

const COLABORACION = [
  ['Publicación de vacantes', 'Difunde tus aperturas en un entorno enfocado exclusivamente en talento de alto rendimiento.'],
  ['Reclutamiento directo', 'Diseña esquemas a la medida para conectar con perfiles de alumnos o egresados clave.'],
  ['Ferias y experiencias de empleo', 'Posiciona tu organización en los eventos institucionales con mayor convocatoria.'],
  ['Convenios institucionales', 'Entabla relaciones estratégicas de largo plazo con la universidad.'],
  ['Presentaciones de marca e industria', 'Imparte charlas para dar a conocer tu cultura laboral, retos de sector y oportunidades.'],
  ['Posicionamiento de marca empleadora', 'Haz que tu organización sea la primera opción profesional para las nuevas generaciones.'],
];

export default function Empresas() {
  return (
    <>
      <HeroInterno
        etiqueta="Empresas"
        titulo="Encuentra en la UP el talento que transformará tu organización"
        descripcion="Conectamos a tu empresa con el perfil reflexivo, ético e innovador de los alumnos y egresados de la Universidad Panamericana. Potenciamos tu estrategia de reclutamiento con profesionales preparados para aportar valor desde el primer día."
      />

      <section className="seccion">
        <div className="contenedor flex flex-col gap-12">
          <EncabezadoSeccion etiqueta="Vinculación empresarial" titulo="¿Cómo podemos colaborar?" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {COLABORACION.map(([t, d], i) => (
              <TarjetaInfo key={t} etiqueta={String(i + 1).padStart(2, '0')} titulo={t}>
                {d}
              </TarjetaInfo>
            ))}
          </div>
        </div>
      </section>

      {/* Vincular mi organización + tutoriales (concepto: el cliente ya los tiene) */}
      <section className="seccion bg-vino-900">
        <div className="contenedor flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex max-w-[680px] flex-col gap-4">
              <Etiqueta tono="oscuro">Registro de empresas</Etiqueta>
              <h2 className="titulo-h2 text-white">Vincula tu organización con Career Services</h2>
              <p className="text-lg leading-relaxed text-dorado-100">
                Sigue los tutoriales para registrar tu empresa y comenzar a publicar oportunidades.
              </p>
            </div>
            <Boton href={ENLACES.tutorialesEmpresas}>Vincular mi organización</Boton>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col gap-3 rounded bg-vino-700 p-6">
                <FotoProvisional tono="oscuro" className="aspect-[2/1] w-full rounded-sm" etiqueta="Video / imagen del tutorial" />
                <p className="eyebrow text-dorado-300">Tutorial 0{n}</p>
                <p className="leading-relaxed text-white">[Contenido pendiente: tutorial de registro proporcionado por el cliente]</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
