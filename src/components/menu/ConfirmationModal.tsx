import React, { useEffect, useRef, useState } from 'react';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onClose }) => {
  const [message, setMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && modalRef.current) {
      // Simula mostrar el modal como Bootstrap
      modalRef.current.classList.add('show');
      modalRef.current.style.display = 'block';
    } else if (modalRef.current) {
      modalRef.current.classList.remove('show');
      modalRef.current.style.display = 'none';
    }
  }, [visible]);

  const handleConfirm = () => {
    setMessage('Gracias por confirmar tu compra.');
    setTimeout(() => {
      setMessage('');
      onClose(); // cerrar el modal después del mensaje
    }, 2000);
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      tabIndex={-1}
      style={{ display: 'none' }}
      role="dialog"
      aria-hidden={!visible}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-header border-0">
            <h5 className="modal-title w-100">¡Compra Exitosa!</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="success-icon" style={{ fontSize: '2rem', color: 'green' }}>✓</div>
            <p>Las claves han sido enviadas a tu correo.</p>
            <div className="mensaje-final">{message}</div>
          </div>
          <div className="modal-footer justify-content-center border-0">
            <button type="button" className="btn btn-success" onClick={handleConfirm}>
              Confirmar
            </button>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;