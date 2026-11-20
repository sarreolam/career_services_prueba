import { HeroInterno } from '../components/Bloques';
import { Icono } from '../components/Icono';
import { FotoProvisional, Tahali } from '../components/Marca';
import { CAMPUS } from '../data/sitio';

export default function Contacto() {
  return (
    <>
      <HeroInterno
        etiqueta="Contacto"
        titulo="Estamos para acompañarte"
        descripcion="Comunícate con el equipo de Career Services de tu campus."
        conFoto={false}
      />
      <section className="seccion">
        <div className="contenedor grid gap-8 md:grid-cols-3">
          {CAMPUS.map((c) => (
            <article key={c.nombre} className="flex flex-col overflow-hidden rounded border border-borde bg-white">
              <FotoProvisional className="aspect-[2/1] w-full" etiqueta={`Foto ${c.nombre}`} />
              <div className="flex flex-col gap-3.5 p-7">
                <h2 className="flex items-center gap-2.5 text-[22px] text-vino-700">
                  <Tahali className="h-[18px] w-2.5 bg-dorado-500" />
                  {c.nombre}
                </h2>
                <address className="flex flex-col gap-3 not-italic">
                  <p className="flex items-start gap-2.5">
                    <Icono nombre="ubicacion" className="mt-1 size-[18px] text-vino-700" />
                    {c.direccion}
                  </p>
                  <a href={`tel:${c.telefono.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2.5 hover:text-vino-700">
                    <Icono nombre="telefono" className="size-[18px] text-vino-700" />
                    {c.telefono}
                  </a>
                  <a href={`mailto:${c.correo}`} className="flex items-center gap-2.5 break-all hover:text-vino-700">
                    <Icono nombre="correo" className="size-[18px] text-vino-700" />
                    {c.correo}
                  </a>
                </address>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
