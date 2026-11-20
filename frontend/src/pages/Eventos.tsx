import { useState } from 'react';
import { HeroInterno } from '../components/Bloques';
import { TarjetaEvento } from '../components/TarjetaEvento';
import { CATEGORIAS_EVENTO, EVENTOS } from '../data/eventos';
import type { CategoriaEvento } from '../data/tipos';

export default function Eventos() {
  const [filtro, setFiltro] = useState<CategoriaEvento | 'Todos'>('Todos');
  const lista = filtro === 'Todos' ? EVENTOS : EVENTOS.filter((e) => e.categoria === filtro);

  return (
    <>
      <HeroInterno
        etiqueta="Eventos y experiencias"
        titulo="Conecta. Aprende. Da el siguiente paso."
        descripcion="Descubre las actividades que tenemos preparadas para potenciar tus capacidades y ampliar tu red de contactos."
        conFoto={false}
      />

      <section className="pb-16 pt-14 md:pb-24">
        <div className="contenedor flex flex-col gap-10">
          <div role="group" aria-label="Filtros de búsqueda" className="flex flex-wrap gap-2.5">
            {(['Todos', ...CATEGORIAS_EVENTO] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filtro === c}
                onClick={() => setFiltro(c)}
                className={`rounded border px-4 py-2 text-[15px] font-semibold transition-colors ${
                  filtro === c ? 'border-vino-700 bg-vino-700 text-white' : 'border-borde bg-white text-tinta hover:border-vino-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {lista.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {lista.map((e) => (
                <TarjetaEvento key={e.id} evento={e} />
              ))}
            </div>
          ) : (
            <p className="rounded border border-borde bg-crema p-8 text-center text-tinta-suave">
              Por ahora no hay eventos en esta categoría.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
