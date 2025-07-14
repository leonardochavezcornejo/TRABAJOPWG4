import React, { useState, useEffect } from 'react';
import type { Noticia } from '../data/noticias';
import type { Game } from './AdminGameModal';

interface TablaNoticiasProps {
  noticias: Noticia[];    // Lista de noticias
  onEditar: (id: string) => void;  // Función para editar
  onBorrar: (id: string) => void;  // Función para borrar
}

const TablaNoticias: React.FC<TablaNoticiasProps> = ({ noticias, onEditar, onBorrar }) => {
  const [games, setGames] = useState<Game[]>([]); // Estado para juegos

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

  // Cargar juegos al montar el componente
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>Título</th>
            <th>Contenido</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {noticias.length > 0 && noticias.map((noticia) => {
            // Buscar el juego relacionado por título
            const juegoRelacionado = games.find(g => noticia.title.toLowerCase().includes(g.title.toLowerCase()));

            // Formatear la fecha
            const formattedDate = new Date(noticia.createdAt).toLocaleDateString("es-ES");

            return (
              <tr key={noticia.id}>
                <td>{noticia.title}</td>
                <td>{noticia.content}</td>
                <td>{formattedDate}</td>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaNoticias;
