import React from 'react';
import '../../assets/estiloAdminNoticias.css';

interface EditNoticeProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (id: string, title: string, content: string) => void;
  initialData: {
    id: string;
    title: string;
    content: string;
  };
}

const EditNotice: React.FC<EditNoticeProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = React.useState(initialData.title);
  const [content, setContent] = React.useState(initialData.content);

  React.useEffect(() => {
    setTitle(initialData.title);
    setContent(initialData.content);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Llamada a la función onSubmit con los valores actuales
    onSubmit(initialData.id, title, content);

    // Enviar la solicitud PUT al backend
    try {
      const response = await fetch(`http://localhost:5000/api/admin/news/${initialData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }), // Enviamos los nuevos datos
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Mostrar mensaje de éxito
        onClose(); // Cerrar el modal
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al editar la noticia'); // Mostrar mensaje de error
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      alert('Error al editar la noticia');
    }
  };

  if (!visible) return null;


  return (
    <div className="modal-custom" onClick={onClose}>
      <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Noticia</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contenido</label>
            <textarea
              className="form-control"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNotice;