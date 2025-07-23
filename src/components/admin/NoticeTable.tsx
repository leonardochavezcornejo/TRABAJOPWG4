import React from 'react';
import type { Noticia } from '../data/noticias';


interface TablaNoticiasProps {
  noticias: Noticia[]; 
  onEditar: (id: string) => void;
  onBorrar: (id: string) => void;
}

const TablaNoticias: React.FC<TablaNoticiasProps> = ({ noticias, onEditar, onBorrar }) => {
  // Ya no necesitas estado interno ni useEffect

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
          {noticias.length > 0 && noticias.map((noticia) => {
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