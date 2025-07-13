import React, { useEffect, useState } from 'react';
import type { Game } from '../types';
import '../../assets/juego.css';

interface CartPanelProps {
  visible: boolean;
  onClose: () => void;
  items: Game[];
  onRemove: (id: number) => void;
  onBuy: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ visible, onClose, items, onRemove, onBuy }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Recalcular el total cuando se agregan o eliminan productos
    const newTotal = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
  }, [items]);

  const handleRemove = async (id: number) => {
    // Realizar una solicitud DELETE al backend para eliminar el producto
    try {
      await fetch(`http://localhost:3000/api/cart/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onRemove(id); // Llamar la función para actualizar el estado en el componente padre
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleBuy = async () => {
    // Confirmar el pedido y vaciar el carrito
    try {
      const response = await fetch('http://localhost:3000/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Pedido confirmado con éxito');
        onBuy(); // Llamar la función para actualizar el estado en el componente padre
      } else {
        alert(data.message || 'Error al confirmar el pedido');
      }
    } catch (error) {
      console.error('Error al confirmar el pedido:', error);
    }
  };

  if (!visible) return null;

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
                    onClick={() => handleRemove(item.id)}
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
        <button className="btn btn-success me-2" onClick={handleBuy}>
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