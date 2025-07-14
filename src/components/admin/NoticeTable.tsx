import React, { useState, useEffect } from 'react';
import type { Noticia } from '../data/noticias';


interface TablaNoticiasProps {
  noticias: Noticia[];
  onEditar: (id: number) => void;
  onBorrar: (id: number) => void; 
}

const TablaNoticias: React.FC<TablaNoticiasProps> = ({ onEditar, onBorrar }) => {
  const [noticiasData, setNoticiasData] = useState<Noticia[]>([]); // Estado para noticias

  // Función para obtener las noticias desde la API
  const fetchNoticias = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/news');
      const data: Noticia[] = await response.json();
      setNoticiasData(data); // Actualiza el estado de noticias
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
    }
  };

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchNoticias();
  }, []);


  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>Título</th>
            <th>Contenido</th>
            <th>Fecha</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {noticiasData.length > 0 && noticiasData.map((noticia) => {
            // Verifica que la noticia tiene los datos correctos
            console.log(noticia);  // Verifica los datos

            const formattedDate = new Date(noticia.createdAt).toLocaleDateString("es-ES");

            return (
              <tr key={noticia.id}>
                <td>{noticia.title}</td>
                <td>{noticia.content}</td>
                <td>{formattedDate}</td>
                <td>
                  <img src={noticia.image} alt={noticia.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEditar(Number(noticia.id))} 
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onBorrar(Number(noticia.id))} 
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