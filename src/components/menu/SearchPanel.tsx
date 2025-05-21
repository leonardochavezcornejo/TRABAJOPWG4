import React from 'react';
import '../../assets/juego.css';

interface SearchPanelProps {
  visible: boolean;
  onSearch: (query: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ visible, onSearch }) => {
  if (!visible) return null;

  return (
    <div className="search-panel position-absolute p-3">
      <h6 className="mb-2">Buscar juegos</h6>
      <input
        type="text"
        className="form-control"
        placeholder="Escribe para buscar..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchPanel;