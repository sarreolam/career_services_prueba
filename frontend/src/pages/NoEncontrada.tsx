import { Boton } from '../components/Boton';
import { Etiqueta } from '../components/Bloques';

export default function NoEncontrada() {
  return (
    <section className="bg-crema">
      <div className="contenedor flex flex-col items-start gap-5 py-24">
        <Etiqueta>Error 404</Etiqueta>
        <h1 className="titulo-h1 text-vino-700">No encontramos esta página</h1>
        <p className="text-lg text-tinta-suave">Puede que el enlace haya cambiado o ya no exista.</p>
        <Boton to="/" variante="vino">Volver al inicio</Boton>
      </div>
    </section>
  );
}
