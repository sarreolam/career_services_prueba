import { CAMPUS, ENLACES } from '../data/sitio';
import { Boton } from './Boton';
import { LogoProvisional } from './Marca';

export function Footer() {
  return (
    <footer className="bg-vino-900 text-white">
      <div className="contenedor flex flex-col gap-10 pb-8 pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[300px_1fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-5">
            <LogoProvisional tono="claro" />
            <p className="text-sm leading-relaxed text-dorado-100">
              Somos el puente entre la excelencia de nuestros alumnos y egresados y las organizaciones líderes del
              entorno nacional e internacional.
            </p>
            {/* Contacto: siempre visible (requisito del documento) */}
            <Boton to="/contacto" variante="primario">
              Contacto
            </Boton>
          </div>

          {CAMPUS.map((c) => (
            <address key={c.nombre} className="flex flex-col gap-2.5 text-sm not-italic">
              <p className="text-[15px] font-semibold text-dorado-300">{c.nombre}</p>
              <p className="leading-relaxed text-white/80">{c.direccion}</p>
              <a href={`tel:${c.telefono.replace(/[^+\d]/g, '')}`} className="hover:text-dorado-300">
                Tel: {c.telefono}
              </a>
              <a href={`mailto:${c.correo}`} className="break-all hover:text-dorado-300">
                {c.correo}
              </a>
            </address>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-dorado-300/30 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-dorado-100">
            <li>
              <a href="#" className="hover:text-white">Aviso de privacidad</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Términos institucionales</a>
            </li>
            <li>
              <a href={ENLACES.vacantesExclusivas} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Bolsa de trabajo (Conecta UP)
              </a>
            </li>
          </ul>
          <p className="text-dorado-300">© {new Date().getFullYear()} Universidad Panamericana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
