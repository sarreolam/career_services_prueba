import { useEffect, useState } from 'react';
import { apiGet } from './lib/api';

type Vacante = {
  id: string;
  titulo: string;
  empresa: string;
  descripcion?: string;
};

export default function App() {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<Vacante[]>('/vacantes')
      .then(setVacantes)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Vacantes</h1>

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
        )}

        <ul className="space-y-3">
          {vacantes.map((v) => (
            <li key={v.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-900">{v.titulo}</p>
              <p className="text-sm text-slate-500">{v.empresa}</p>
            </li>
          ))}
        </ul>

        {!error && vacantes.length === 0 && (
          <p className="text-slate-400">Sin vacantes todavía.</p>
        )}
      </div>
    </div>
  );
}