import React from 'react';
import type { Noticia } from '../data/noticias';
import { games } from '../data/games';

interface TablaNoticiasProps {
  noticias: Noticia[];
  onEditar: (id: string) => void;
  onBorrar: (id: string) => void;
}

const TablaNoticias: React.FC<TablaNoticiasProps> = ({ noticias, onEditar, onBorrar }) => {
  return (
    <div className="table-responsive">
      {/* Mostrar la primera noticia como tarjeta con encabezado e imagen del juego */}
      {noticias.length > 0 && (() => {
        const noticia = noticias[0];
        const juegoRelacionado = games.find(g => noticia.title.toLowerCase().includes(g.title.toLowerCase()));
        return (
          <div key={noticia.id} className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">{noticia.title}</h4>
            </div>
            {juegoRelacionado && (
              <img
                src={juegoRelacionado.images[0]}
                alt={juegoRelacionado.title}
                className="card-img-top noticia-img-estrecha"
                style={{ maxHeight: 520, objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <p className="card-text">{noticia.content}</p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{noticia.fecha}</small>
                <span className="badge bg-success">{noticia.estado}</span>
                <div>
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
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      {/* Mostrar el resto de noticias como tarjetas debajo */}
      {noticias.slice(1).map(noticia => {
        const juegoRelacionado = games.find(g => noticia.title.toLowerCase().includes(g.title.toLowerCase()));
        return (
          <div key={noticia.id} className="card mb-3 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">{noticia.title}</h5>
            </div>
            {juegoRelacionado && (
              <img
                src={juegoRelacionado.images[0]}
                alt={juegoRelacionado.title}
                className="card-img-top noticia-img-estrecha"
                style={{ maxHeight: 400, objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <p className="card-text">{noticia.content}</p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{noticia.fecha}</small>
                <span className="badge bg-success">{noticia.estado}</span>
                <div>
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
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TablaNoticias;