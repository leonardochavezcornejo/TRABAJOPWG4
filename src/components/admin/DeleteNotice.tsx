import React from 'react';
import '../../assets/estiloAdminNoticias.css';

interface DeleteNoticeProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  id: string;
}

const DeleteNotice: React.FC<DeleteNoticeProps> = ({ visible, onClose, onConfirm, }) => {
  if (!visible) return null;

const handleDelete = () => {
  onConfirm(); 
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