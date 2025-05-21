import React from 'react';
import type { Game } from '../types';
import '../../assets/juego.css';

interface CartPanelProps {
  visible: boolean;
  onClose: () => void;
  items: Game[];
  onRemove: (id: number) => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ visible, onClose, items, onRemove }) => {
  if (!visible) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-panel">
      <div className="card-body">
        <h5 className="card-title">Carrito de Compras</h5>
        {items.length === 0 ? (
          <div className="mb-3 text-muted">Tu carrito está vacío.</div>
        ) : (
          <>
            <ul className="list-group mb-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.title}</strong>
                    <div>${item.price.toFixed(2)}</div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onRemove(item.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <span>${total.toFixed(2)}</span>
            </div>
          </>
        )}
        <button className="btn btn-success me-2">Confirmar pedido</button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CartPanel;