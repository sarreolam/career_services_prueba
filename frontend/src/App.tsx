import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import AlumnosEgresados from './pages/AlumnosEgresados';
import CareerServices from './pages/CareerServices';
import Contacto from './pages/Contacto';
import Empresas from './pages/Empresas';
import Eventos from './pages/Eventos';
import Inicio from './pages/Inicio';
import NoEncontrada from './pages/NoEncontrada';
import Recursos from './pages/Recursos';
import Servicios from './pages/Servicios';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="career-services" element={<CareerServices />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="alumnos-egresados" element={<AlumnosEgresados />} />
        <Route path="empresas" element={<Empresas />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="recursos" element={<Recursos />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}
