import type { Evento } from '../data/tipos';
import { Icono, type NombreIcono } from './Icono';
import { FotoProvisional } from './Marca';

function formatearFecha(iso: string | null) {
  if (!iso) return '[Por confirmar]';
  return new Date(`${iso}T12:00:00`).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Ficha tipo por evento (documento de arquitectura, sección 6) */
export function TarjetaEvento({ evento }: { evento: Evento }) {
  const datos: [NombreIcono, string, string][] = [
    ['ubicacion', 'Formato', evento.formato],
    ['calendario', 'Fecha', formatearFecha(evento.fecha)],
    ['reloj', 'Hora', evento.hora ?? '[Por confirmar]'],
    ['personas', 'Dirigido a', evento.dirigidoA],
  ];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded border border-borde bg-white">
      <div className="relative">
        <FotoProvisional className="aspect-[2/1] w-full" etiqueta="Foto del evento" />
        <span className="eyebrow absolute left-4 top-4 rounded-sm bg-vino-700 px-2.5 py-1 text-[11px] text-white">
          {evento.categoria}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3.5 p-6">
        <h3 className="titulo-h3 text-vino-700">
          {evento.titulo}
          {evento.esEjemplo && <span className="ml-2 align-middle font-sans text-xs font-normal text-tinta-suave">(ejemplo)</span>}
        </h3>
        <p className="text-sm leading-relaxed text-tinta-suave">{evento.descripcion}</p>
        <ul className="flex flex-col gap-2 text-sm">
          {datos.map(([icono, etiqueta, valor]) => (
            <li key={etiqueta} className="flex items-start gap-2">
              <Icono nombre={icono} className="mt-0.5 size-4 text-vino-700" />
              <span>
                <strong className="font-semibold">{etiqueta}:</strong> {valor}
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-auto rounded border-[1.5px] border-vino-700 px-6 py-3 text-[15px] font-semibold text-vino-700 transition-colors hover:bg-vino-700 hover:text-white"
          title="Pendiente: definir cómo se confirma la asistencia (registro / enlace externo)"
        >
          Confirmar mi asistencia
        </button>
      </div>
    </article>
  );
}
