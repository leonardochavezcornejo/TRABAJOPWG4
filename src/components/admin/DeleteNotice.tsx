import React from 'react';
import '../../assets/estiloAdminNoticias.css';

interface DeleteNoticeProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteNotice: React.FC<DeleteNoticeProps> = ({ visible, onClose, onConfirm }) => {
  if (!visible) return null;

  const handleDelete = async () => {
    try {
      // Realizamos la solicitud DELETE al backend para eliminar la noticia
      const response = await fetch('http://localhost:5000/api/admin/news/{id}', {  // Reemplaza `{id}` por el ID de la noticia
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Mensaje de éxito
        onConfirm(); // Llamamos a onConfirm para actualizar la lista de noticias o cualquier acción adicional
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al eliminar noticia');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      alert('Error al eliminar noticia');
    }
  };

  return (
    <div
      id="deleteNewsConfirmModal"
      className="modal-custom"
      onClick={() => onClose()}
    >
      <div
        className="modal-content-custom"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Confirmar Eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar esta noticia?</p>
        <button
          id="confirmDeleteNewsBtn"
          className="btn btn-danger"
          onClick={handleDelete}  // Llamamos a handleDelete en lugar de onConfirm
        >
          Sí, eliminar
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteNotice;