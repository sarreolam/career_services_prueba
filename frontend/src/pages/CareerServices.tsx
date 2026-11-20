import { Boton } from '../components/Boton';
import { EncabezadoSeccion, HeroInterno, TarjetaInfo, TarjetaTestimonio } from '../components/Bloques';
import { FotoProvisional, Tahali } from '../components/Marca';
import { TESTIMONIOS } from '../data/contenido';
import { CAMPUS } from '../data/sitio';

const PROPUESTA = [
  ['01', 'Preparar', 'Desarrollamos las herramientas y competencias clave para destacar en el entorno laboral cambiante.'],
  ['02', 'Conectar', 'Generamos espacios directos de interacción entre profesionales, empresas y vacantes estratégicas.'],
  ['03', 'Insertar', 'Facilitamos el acceso a prácticas, becas, internships y posiciones clave de inicio o aceleración laboral.'],
  ['04', 'Desarrollar', 'Brindamos acompañamiento constante para edificar carreras profesionales sostenibles, éticas y con propósito.'],
];

export default function CareerServices() {
  return (
    <>
      <HeroInterno
        etiqueta="¿Quiénes somos?"
        titulo="Construimos puentes entre la academia y el entorno profesional."
        descripcion="Somos el área especializada en empleabilidad e integración profesional de la Universidad Panamericana. Acompañamos a nuestra comunidad en cada etapa de su crecimiento laboral y facilitamos alianzas estratégicas con las organizaciones más relevantes del entorno nacional e internacional."
      />

      {/* Misión y visión — no vienen en el documento; pendientes del cliente */}
      <section className="seccion">
        <div className="contenedor grid gap-8 md:grid-cols-2">
          {['Misión', 'Visión'].map((t) => (
            <TarjetaInfo key={t} etiqueta="Pendiente del cliente" titulo={t}>
              [Texto de {t.toLowerCase()} de Career Services — no viene en el documento de arquitectura; solicitarlo al
              cliente.]
            </TarjetaInfo>
          ))}
        </div>
      </section>

      <section className="seccion bg-crema">
        <div className="contenedor flex flex-col gap-12">
          <EncabezadoSeccion etiqueta="Nuestra propuesta de valor" titulo="Te acompañamos en cada etapa" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROPUESTA.map(([n, t, d]) => (
              <TarjetaInfo key={t} etiqueta={n} titulo={t}>
                {d}
              </TarjetaInfo>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor flex flex-col gap-12">
          <EncabezadoSeccion
            etiqueta="Presencia nacional"
            titulo="Ciudad de México | Guadalajara | Aguascalientes"
            descripcion="Una visión de empleabilidad con alcance nacional y la flexibilidad necesaria para atender las demandas específicas de cada región y mercado."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {CAMPUS.map((c) => (
              <div key={c.ciudad} className="flex flex-col gap-4">
                <FotoProvisional className="aspect-[17/10] w-full rounded" etiqueta={`Foto campus ${c.ciudad}`} />
                <p className="flex items-center gap-2.5 font-serif text-[22px] font-semibold text-vino-700">
                  <Tahali className="h-[18px] w-2.5 bg-dorado-500" />
                  {c.ciudad}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion bg-crema">
        <div className="contenedor flex flex-col items-center gap-12">
          <EncabezadoSeccion
            etiqueta="Historias de impacto"
            titulo="Trayectorias que inspiran"
            descripcion="Testimonios de nuestra comunidad: alumnos, egresados y empresas."
            centrado
          />
          <div className="grid w-full gap-8 md:grid-cols-3">
            {TESTIMONIOS.map((t) => (
              <TarjetaTestimonio key={t.id} testimonio={t} />
            ))}
          </div>
          {/* TODO: definir a dónde lleva (página de historias o sección ampliada) */}
          <Boton href={null} variante="secundario">
            Descubre más historias de éxito
          </Boton>
        </div>
      </section>
    </>
  );
}
