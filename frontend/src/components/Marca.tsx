import { Link } from 'react-router-dom';

/**
 * Tahalí: banda diagonal del sistema gráfico UP (Manual de Marca, Anexo 3).
 * Se usa como acento junto a etiquetas y como elemento decorativo detrás de fotos.
 */
export function Tahali({ className = 'h-4 w-2.5 bg-dorado-500' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{ clipPath: 'polygon(40% 0, 100% 0, 60% 100%, 0 100%)' }}
    />
  );
}

/**
 * LOGO PROVISIONAL — todavía no existe logo oficial de Career Services.
 * Reemplazar por el lockup oficial (Marca Institucional + descriptor) cuando el cliente lo entregue.
 */
export function LogoProvisional({ tono = 'oscuro' }: { tono?: 'oscuro' | 'claro' }) {
  const claro = tono === 'claro';
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Career Services UP — Inicio">
      <Tahali className={`h-9 w-5 ${claro ? 'bg-dorado-300' : 'bg-vino-700'}`} />
      <span className="flex flex-col whitespace-nowrap leading-tight">
        <span className={`font-serif text-[17px] font-semibold sm:text-[19px] ${claro ? 'text-white' : 'text-vino-700'}`}>
          Career Services
        </span>
        <span className={`eyebrow text-[10px] ${claro ? 'text-dorado-300' : 'text-tinta-suave'}`}>
          Universidad Panamericana
        </span>
      </span>
    </Link>
  );
}

/**
 * Espacio reservado para fotografía. El manual pide fotos reales de la comunidad UP,
 * con luz natural y sin filtros; mientras no las tengamos se muestra este marcador.
 */
export function FotoProvisional({
  className = '',
  tono = 'claro',
  etiqueta = 'Foto provisional',
}: {
  className?: string;
  tono?: 'claro' | 'oscuro';
  etiqueta?: string;
}) {
  const oscuro = tono === 'oscuro';
  return (
    <div
      role="img"
      aria-label={etiqueta}
      className={`relative flex items-end overflow-hidden ${oscuro ? 'bg-vino-700' : 'bg-dorado-100'} ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(115deg, transparent 0 22px, ${
          oscuro ? 'rgba(216,194,154,0.10)' : 'rgba(185,151,91,0.14)'
        } 22px 24px)`,
      }}
    >
      <span className={`eyebrow m-4 text-[10px] ${oscuro ? 'text-dorado-300' : 'text-dorado-500'}`}>
        {etiqueta} · usar foto real UP
      </span>
    </div>
  );
}

/** Foto con la banda diagonal detrás (composición del hero) */
export function FotoConTahali({ tono = 'claro' }: { tono?: 'claro' | 'oscuro' }) {
  return (
    <div className="relative mx-auto w-full max-w-[460px] py-8 pr-10">
      <Tahali className={`absolute inset-y-0 right-0 w-40 ${tono === 'oscuro' ? 'bg-dorado-500' : 'bg-vino-700'}`} />
      <FotoProvisional
        tono={tono === 'oscuro' ? 'oscuro' : 'claro'}
        className="relative aspect-[5/4] w-full shadow-sm"
      />
    </div>
  );
}
