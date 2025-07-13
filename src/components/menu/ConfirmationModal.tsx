import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  userId: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onClose, userId }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!visible) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: [] })  // Puedes pasar los productos en el carrito si es necesario
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Gracias por confirmar tu compra. Las claves han sido enviadas a tu correo.');
        setTimeout(() => {
          setMessage('');
          onClose();
          navigate('/'); // Redirigir al usuario a la página de inicio o alguna página de éxito
        }, 2000);
      } else {
        setMessage('Error en la compra. Intenta nuevamente.');
        setLoading(false);
      }
    } catch (error) {
      setMessage('Error al procesar el pago.');
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-hidden={!visible}>
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
            <button
              type="button"
              className="btn btn-success"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Confirmar'}
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