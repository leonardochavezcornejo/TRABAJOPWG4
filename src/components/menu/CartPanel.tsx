import React, { useEffect, useState } from 'react';
import type { Game } from '../admin/AdminGameModal';
import type { CartItem } from '../data/cart';
import '../../assets/juego.css';

interface CartPanelProps {
  visible: boolean;
  onClose: () => void;
  cart: { items: CartItem[], total: number };  // El carrito ahora contiene un arreglo de CartItem
  onRemove: (gameId: number) => void;  // Llamado al eliminar un juego del carrito
  onBuy: () => void;  // Llamado al realizar el pago
}


const CartPanel: React.FC<CartPanelProps> = ({ visible, onClose, cart, onRemove, onBuy }) => {
  const [total, setTotal] = useState(cart.total);

  useEffect(() => {
    // Recalcular el total cuando cambian los productos en el carrito
    const newTotal = cart.items.reduce((sum, item) => sum + (item.quantity * item.game.price), 0);
    setTotal(newTotal);
  }, [cart]);

  const handleRemove = async (gameId: number) => {
    // Realizar una solicitud DELETE al backend para eliminar el producto
    try {
      await fetch(`http://localhost:5000/api/cart/remove/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onRemove(gameId); // Llamar la función para actualizar el estado en el componente padre
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleBuy = async () => {
    // Confirmar el pedido y vaciar el carrito
    try {
      const response = await fetch('http://localhost:5000/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart.items }), // Enviar todos los productos del carrito
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
        {cart.items.length === 0 ? (
          <div className="mb-3 text-muted">Tu carrito está vacío.</div>
        ) : (
          <>
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
                    onClick={() => handleRemove(item.game.id)}
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