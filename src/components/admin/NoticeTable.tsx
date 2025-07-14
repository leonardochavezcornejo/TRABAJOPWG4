import React, {useState, useEffect} from 'react';
import type { Noticia } from '../data/noticias';
import type { Game } from './AdminGameModal';

interface TablaNoticiasProps {
  noticias: Noticia[];    // Lista de noticias
  onEditar: (id: string) => void;  // Función para editar
  onBorrar: (id: string) => void;  // Función para borrar
}

const TablaNoticias: React.FC<TablaNoticiasProps> = ({ onEditar, onBorrar }) => {

  const [noticias, setNoticias] = useState<Noticia[]>([]); // Estado para noticias
  const [games, setGames] = useState<Game[]>([]); // Estado para juegos

  // Función para obtener las noticias desde la API
  const fetchNoticias = async () => {
    try {
      const response = await fetch('/api/admin/news');
      const data: Noticia[] = await response.json();
      setNoticias(data); // Actualiza el estado de noticias
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
    }
  };

  // Función para obtener los juegos desde la API
  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games');
      const data: Game[] = await response.json();
      setGames(data); // Actualiza el estado de juegos
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
    }
  };

  // Cargar noticias y juegos al montar el componente
  useEffect(() => {
    fetchNoticias();
    fetchGames();
  }, []);


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