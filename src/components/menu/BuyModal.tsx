import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

interface BuyModalProps {
  visible: boolean;
  onClose: () => void;
}

const BuyModal: React.FC<BuyModalProps> = ({ visible, onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    cvc: '',
    expiryDate: ''
  });

  // Maneja los cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validación simple del formulario
  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== '');
  };

  // Enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setShowConfirmation(true);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  if (!visible) return null;


  return (
    <>
      <div className="modal d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Datos de Facturación</h5>
                <button type="button" className="btn-close" onClick={onClose} />
              </div>
              <div className="modal-body">
                <div className="text-center mb-3">
                  <img src="/img/logo.png" alt="Logo" style={{ maxWidth: '100px' }} />
                  <p className="text-muted mt-2">
                    Por favor, asegúrate de ingresar correctamente los datos de tu tarjeta para evitar retrasos en el pago.
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Número de tarjeta</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="form-control"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      className="form-control"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de caducidad</label>
                    <input
                      type="month"
                      name="expiryDate"
                      className="form-control"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success" disabled={!isFormValid()}>
                  Pagar ✔
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmationModal
        visible={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          onClose(); // cerrar ambos modales
        }}
      />
    </>
  );
};

export default BuyModal;

