import React, { useState, useEffect } from 'react';
import '../../assets/estiloAdminNoticias.css';
import 'bootstrap/dist/css/bootstrap.min.css';


interface GameData {
  id?: string;
  title: string;
  category: string;
  price: number;
  discount: number;
  description: string;
}

interface AdminGameModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: GameData | null;
  onSave: (game: GameData) => void; 
}

const AdminGameModal: React.FC<AdminGameModalProps> = ({ visible, onClose, initialData, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState('');

 
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);
      setPrice(initialData.price);
      setDiscount(initialData.discount);
      setDescription(initialData.description);
    } else {
      // Si no hay datos, reiniciar el formulario
      setTitle('');
      setCategory('');
      setPrice(0);
      setDiscount(0);
      setDescription('');
    }
  }, [initialData, visible]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const game: GameData = {
      id: initialData?.id,  // Solo pasa el ID si existe (edición)
      title,
      category,
      price,
      discount,
      description
    };

    // Si hay ID, actualizamos el juego, si no, lo agregamos
    try {
      let response;
      if (initialData?.id) {
        // Editar el juego (PUT)
        response = await fetch(`http://localhost:3000/api/admin/games/${initialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(game)
        });
      } else {
        // Agregar el juego (POST)
        response = await fetch('http://localhost:3000/api/admin/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(game)
        });
      }

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Mensaje de éxito
        onSave(game); // Actualiza la lista de juegos
        onClose(); // Cierra el modal
      } else {
        alert(data.message || 'Error al guardar el juego');
      }
    } catch (error) {
      console.error('Error al guardar el juego:', error);
      alert('Error al guardar el juego');
    }
  };

  if (!visible) return null;

  return (
    <div className="modal d-block" onClick={onClose} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            {/* Encabezado negro */}
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">{initialData ? 'Editar Juego' : 'Agregar Juego'}</h5>
              <button
                type="button"
                className="btn-close"
                style={{ filter: 'invert(1)' }}
                onClick={onClose}
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="title" className="form-label">Título</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <input
                    type="text"
                    id="category"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="price" className="form-label">Precio ($)</label>
                  <input
                    type="number"
                    id="price"
                    className="form-control"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="discount" className="form-label">Descuento (%)</label>
                  <input
                    type="number"
                    id="discount"
                    className="form-control"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                  id="description"
                  className="form-control"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary mx-2">Guardar</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default AdminGameModal;
export type { GameData };