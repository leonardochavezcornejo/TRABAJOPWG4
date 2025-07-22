import React from 'react';
import type { CartItem } from '../data/cart';
import '../../assets/juego.css';

interface CartPanelProps {
  visible: boolean;
  onClose: () => void;
  cart: { items: CartItem[]; total: number }; // Recibe el carrito completo con los items y el total
  onRemove: (gameId: number) => void; // Función para eliminar un juego
  onBuy: () => void; // Función para confirmar la compra
}

const CartPanel: React.FC<CartPanelProps> = ({ visible, onClose, cart, onRemove, onBuy }) => {
  if (!visible) return null; // Si no es visible, no se muestra el componente

  return (
    <div className="cart-panel">
      <div className="card-body">
        <h5 className="card-title">Carrito de Compras</h5>
        {cart.items.length === 0 ? (
          <div className="mb-3 text-muted">Tu carrito está vacío.</div>
        ) : (
          <>
            {/* Lista de items en el carrito */}
            <ul className="list-group mb-3">
              {cart.items.map((item) => (
                <li
                  key={item.game.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.game.title}</strong>
                    <div>
                      ${item.game.price.toFixed(2)} x {item.quantity} = ${(item.game.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onRemove(item.game.id)} // Llama a la función onRemove pasada desde App
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            {/* Muestra el total del carrito */}
            <div className="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </>
        )}
        {/* Botones de acción */}
        <button className="btn btn-success me-2" onClick={onBuy}>
          Confirmar pedido
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CartPanel;