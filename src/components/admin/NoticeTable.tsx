import React from 'react';
import type { Noticia } from '../data/noticias';

interface TablaNoticiasProps {
  noticias: Noticia[];
  onEditar: (id: string) => void;
  onBorrar: (id: string) => void;
}

const TablaNoticias: React.FC<TablaNoticiasProps> = ({ noticias, onEditar, onBorrar }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped text-center bg-white">
        <thead className="table-light">
          <tr><th>Título</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {noticias.map(noticia => (
            <tr key={noticia.id}>
              <td>{noticia.title}</td>
              <td>{noticia.fecha}</td>
              <td>{noticia.estado}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEditar(noticia.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onBorrar(noticia.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaNoticias;