import type { ReactNode } from 'react';
import { FotoConTahali, Tahali } from './Marca';
import type { Cifra, Testimonio } from '../data/tipos';

/** Etiqueta pequeña con tahalí (eyebrow) */
export function Etiqueta({ children, tono = 'claro' }: { children: ReactNode; tono?: 'claro' | 'oscuro' }) {
  return (
    <p className={`eyebrow flex items-center gap-2.5 ${tono === 'oscuro' ? 'text-dorado-300' : 'text-dorado-500'}`}>
      <Tahali className={`h-4 w-2.5 ${tono === 'oscuro' ? 'bg-dorado-300' : 'bg-dorado-500'}`} />
      {children}
    </p>
  );
}

/** Encabezado de sección: etiqueta + título + descripción */
export function EncabezadoSeccion({
  etiqueta,
  titulo,
  descripcion,
  centrado = false,
  tono = 'claro',
}: {
  etiqueta: string;
  titulo: string;
  descripcion?: string;
  centrado?: boolean;
  tono?: 'claro' | 'oscuro';
}) {
  return (
    <div className={`flex max-w-[720px] flex-col gap-3.5 ${centrado ? 'mx-auto items-center text-center' : ''}`}>
      <Etiqueta tono={tono}>{etiqueta}</Etiqueta>
      <h2 className={`titulo-h2 ${tono === 'oscuro' ? 'text-white' : 'text-vino-700'}`}>{titulo}</h2>
      {descripcion && (
        <p className={`text-lg leading-relaxed ${tono === 'oscuro' ? 'text-dorado-100' : 'text-tinta-suave'}`}>
          {descripcion}
        </p>
      )}
    </div>
  );
}

/** Tarjeta de información con barra dorada */
export function TarjetaInfo({
  etiqueta,
  titulo,
  children,
  pie,
}: {
  etiqueta?: string;
  titulo: string;
  children?: ReactNode;
  pie?: ReactNode;
}) {
  return (
    <article className="flex h-full flex-col gap-3.5 rounded border border-borde bg-white p-7">
      <span className="h-[3px] w-10 bg-dorado-500" aria-hidden="true" />
      {etiqueta && <p className="eyebrow text-dorado-500">{etiqueta}</p>}
      <h3 className="titulo-h3 text-vino-700">{titulo}</h3>
      {children && <div className="leading-relaxed text-tinta-suave">{children}</div>}
      {pie && <div className="mt-auto pt-1">{pie}</div>}
    </article>
  );
}

export function ItemCifra({ cifra }: { cifra: Cifra }) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-dorado-500 px-5 py-5">
      <p className="font-serif text-4xl font-semibold leading-none text-dorado-300 md:text-[44px]">{cifra.valor}</p>
      <p className="text-[15px] font-semibold leading-snug text-white">{cifra.etiqueta}</p>
    </div>
  );
}

export function TarjetaTestimonio({ testimonio }: { testimonio: Testimonio }) {
  const t = testimonio;
  return (
    <figure className="flex h-full flex-col gap-5 rounded border border-borde bg-white p-8">
      <span className="eyebrow self-start rounded-sm bg-dorado-100 px-2.5 py-1 text-[11px] text-vino-700">
        {t.perfil}
      </span>
      <blockquote className="font-serif text-lg font-semibold italic leading-normal text-tinta">
        «{t.cita ?? `[Testimonio pendiente: narrativa inspiradora de ${t.perfil.toLowerCase()}, proporcionada por el cliente.]`}»
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3.5">
        <span className="size-12 shrink-0 rounded-full bg-dorado-100" aria-hidden="true" />
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold text-vino-700">{t.nombre ?? '[Nombre y apellido]'}</span>
          <span className="text-sm text-tinta-suave">{t.detalle ?? '[Carrera / Empresa]'}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Hero de páginas internas (fondo crema) */
export function HeroInterno({
  etiqueta,
  titulo,
  descripcion,
  arriba,
  conFoto = true,
}: {
  etiqueta: string;
  titulo: string;
  descripcion?: string;
  arriba?: ReactNode;
  conFoto?: boolean;
}) {
  return (
    <section className="bg-crema">
      <div className={`contenedor grid items-center gap-12 py-16 md:py-20 ${conFoto ? 'lg:grid-cols-[1fr_440px] lg:gap-16' : ''}`}>
        <div className={`flex flex-col gap-5 ${conFoto ? '' : 'max-w-[820px]'}`}>
          {arriba}
          <Etiqueta>{etiqueta}</Etiqueta>
          <h1 className="titulo-h1 text-vino-700">{titulo}</h1>
          {descripcion && <p className="text-lg leading-relaxed text-tinta-suave">{descripcion}</p>}
        </div>
        {conFoto && <FotoConTahali tono="claro" />}
      </div>
    </section>
  );
}
