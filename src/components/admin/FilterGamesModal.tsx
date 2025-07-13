import React, { useState } from 'react';
import '../../assets/estiloAdminNoticias.css';

interface FilterData {
  categoria: string;
  precioMin: string;
  precioMax: string;
}

interface FilterGamesModalProps {
  visible: boolean;
  onClose: () => void;
  onFilter: (filters: FilterData) => void;
}

const FilterGamesModal: React.FC<FilterGamesModalProps> = ({ visible, onClose, onFilter }) => {
  // Eliminar fecha
  const [categoria, setCategoria] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Llamar a la API para obtener los juegos filtrados
    try {
      const response = await fetch(`http://localhost:3000/api/admin/games/filter?categoria=${categoria}&precioMin=${precioMin}&precioMax=${precioMax}`);
      const data = await response.json();

      if (response.ok) {
        onFilter({ categoria, precioMin, precioMax }); // Pasa los filtros a los componentes superiores
        onClose(); // Cierra el modal
      } else {
        alert(data.message || 'Error al filtrar los juegos');
      }
    } catch (error) {
      console.error('Error al aplicar el filtro:', error);
      alert('Error al aplicar el filtro');
    }
  };


  if (!visible) return null;

  return (
    <div className="modal-custom" onClick={onClose}>
      <div className="modal-content-custom modal-medium" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Filtrar Juegos</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Categoría */}
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoría</label>
              <select className="form-select" id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option value="">Todas</option>
                <option value="accion">Acción</option>
                <option value="aventura">Aventura</option>
                <option value="rpg">RPG</option>
              </select>
            </div>

            {/* Rango de precio */}
            <div className="mb-3">
              <label className="form-label">Rango de Precio</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input type="number" className="form-control" placeholder="Mín" value={precioMin} onChange={e => setPrecioMin(e.target.value)} />
                <span className="input-group-text">-</span>
                <input type="number" className="form-control" placeholder="Máx" value={precioMax} onChange={e => setPrecioMax(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Aplicar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterGamesModal;