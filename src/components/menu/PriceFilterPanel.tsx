import React from 'react';
import '../../assets/juego.css';

interface PriceFilterPanelProps {
  visible: boolean;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const PriceFilterPanel: React.FC<PriceFilterPanelProps> = ({ visible, onChange, min, max }) => {
  if (!visible) return null;

  return (
    <div className="search-panel position-absolute p-3" style={{ top: '80px', right: '20px' }}>
      <h6 className="mb-3">Filtrar por precio</h6>
      <div>
        <div className="d-flex justify-content-between mb-2">
          <span>${min}</span>
          <span>${max}</span>
        </div>
        <input
          type="range"
          className="form-range"
          min={min}
          max={max}
          step={5}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
        <div className="d-flex justify-content-between">
          <small>Mín</small>
          <small>Máx</small>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterPanel;