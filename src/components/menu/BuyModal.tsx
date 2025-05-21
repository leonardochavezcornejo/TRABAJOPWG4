import React from 'react';

interface BuyModalProps {
  visible: boolean;
  onClose: () => void;
}

const BuyModal: React.FC<BuyModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="modal d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <form>
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
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Número de tarjeta</label>
                <input type="text" className="form-control" />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">CVC</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Fecha de caducidad</label>
                  <input type="month" className="form-control" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">Pagar ✔</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
