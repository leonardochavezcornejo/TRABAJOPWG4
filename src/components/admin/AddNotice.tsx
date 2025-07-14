import React, { useState } from 'react';
import '../../assets/estiloAdminNoticias.css';

interface AddNoticeProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string, image: string) => void; // Actualizar para aceptar 3 argumentos
}

const AddNotice: React.FC<AddNoticeProps> = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(''); // Campo para la URL de la imagen
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && image.trim()) {  // Validar que todos los campos estén completos
      try {
        // Llamada a la API para agregar la noticia
        const response = await fetch('http://localhost:5000/api/admin/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, image }), // Ahora enviamos el campo `image`
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message); // Mostrar mensaje de éxito
          onSubmit(title, content, image); // Ahora pasamos 3 argumentos a `onSubmit`
          setTitle('');
          setContent('');
          setImage(''); // Limpiar el campo de la imagen
          onClose();
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Error al agregar noticia');
        }
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        setErrorMessage('Error al realizar la solicitud');
      }
    } else {
      setErrorMessage('Todos los campos son obligatorios'); // Agregado para validar si faltan campos
    }
  };

  if (!visible) return null;

  return (
    <div className="modal-custom" onClick={onClose}>
      <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
        <h3>Añadir Noticia</h3>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Mostrar error si existe */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newNewsTitle" className="form-label">Título</label>
            <input
              type="text"
              id="newNewsTitle"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newNewsContent" className="form-label">Contenido</label>
            <textarea
              id="newNewsContent"
              className="form-control"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="newNewsImage" className="form-label">Imagen (URL)</label>
            <input
              type="text"
              id="newNewsImage"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Agregar Noticia</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
