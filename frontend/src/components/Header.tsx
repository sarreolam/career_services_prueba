import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVEGACION } from '../data/sitio';
import { Boton } from './Boton';
import { Icono } from './Icono';
import { LogoProvisional } from './Marca';

export function Header() {
  const [abierto, setAbierto] = useState(false);

  const claseEnlace = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 ${
      isActive ? 'text-vino-700 after:bg-dorado-500' : 'text-tinta hover:text-vino-700 after:bg-transparent'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-borde bg-white/95 backdrop-blur-sm">
      <div className="contenedor flex h-[76px] items-center justify-between gap-3">
        <LogoProvisional />

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {NAVEGACION.map((item) => (
            <NavLink key={item.ruta} to={item.ruta} end={item.ruta === '/'} className={claseEnlace}>
              {item.etiqueta}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Contacto: siempre visible (requisito del documento) */}
          <Boton to="/contacto" variante="vino" className="px-3.5 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-[15px]">
            Contacto
          </Boton>
          <button
            type="button"
            className="rounded p-2 text-vino-700 lg:hidden"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={abierto}
            onClick={() => setAbierto((v) => !v)}
          >
            <Icono nombre={abierto ? 'cerrar' : 'menu'} className="size-6" />
          </button>
        </div>
      </div>

      {abierto && (
        <nav aria-label="Principal móvil" className="border-t border-borde bg-white lg:hidden">
          <ul className="contenedor flex flex-col py-2">
            {NAVEGACION.map((item) => (
              <li key={item.ruta}>
                <NavLink
                  to={item.ruta}
                  end={item.ruta === '/'}
                  onClick={() => setAbierto(false)}
                  className={({ isActive }) =>
                    `block border-l-2 py-3 pl-4 font-semibold ${isActive ? 'border-dorado-500 text-vino-700' : 'border-transparent text-tinta'}`
                  }
                >
                  {item.etiqueta}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
