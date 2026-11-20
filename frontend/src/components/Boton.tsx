import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icono } from './Icono';

type Variante = 'primario' | 'vino' | 'secundario' | 'claro';

const ESTILOS: Record<Variante, string> = {
  primario: 'bg-dorado-500 text-tinta hover:bg-dorado-300',
  vino: 'bg-vino-700 text-white hover:bg-vino-900',
  secundario: 'border-[1.5px] border-vino-700 text-vino-700 hover:bg-vino-700 hover:text-white',
  claro: 'border-[1.5px] border-dorado-300 text-white hover:bg-white/10',
};

interface Props {
  children: ReactNode;
  variante?: Variante;
  /** Ruta interna (React Router) */
  to?: string;
  /** Enlace externo. null = pendiente → se muestra deshabilitado como "Próximamente" */
  href?: string | null;
  className?: string;
}

export function Boton({ children, variante = 'primario', to, href, className = '' }: Props) {
  const base = `inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-[15px] font-semibold transition-colors ${ESTILOS[variante]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }

  if (href === null) {
    return (
      <span
        aria-disabled="true"
        title="Enlace pendiente: se activará cuando el cliente lo entregue"
        className={`${base} cursor-not-allowed opacity-60`}
      >
        {children}
        <span className="text-xs font-normal opacity-80">(próximamente)</span>
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
      {children}
      <Icono nombre="externo" className="size-4" />
    </a>
  );
}

/** Enlace de texto con flecha (dentro de tarjetas) */
export function EnlaceFlecha({ children, to, href }: { children: ReactNode; to?: string; href?: string }) {
  const clase = 'group inline-flex items-center gap-1.5 text-[15px] font-semibold text-vino-700';
  const icono = href ? 'externo' : 'flecha-derecha';
  const contenido = (
    <>
      {children}
      <Icono nombre={icono} className="size-4 transition-transform group-hover:translate-x-0.5" />
    </>
  );
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clase}>
        {contenido}
      </a>
    );
  return (
    <Link to={to ?? '/'} className={clase}>
      {contenido}
    </Link>
  );
}
