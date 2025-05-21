import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/juego.css';

interface NavbarProps {
  onFilterCategory: (cat: string) => void;
  onToggleCart: () => void;
  onToggleSearch: () => void;
  onTogglePrice: () => void;
}
const Navbar: React.FC<NavbarProps> = ({
  onFilterCategory,
  onToggleCart,
  onToggleSearch,
  onTogglePrice
}) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand text-white me-4" onClick={() => onFilterCategory('All')}>GameStore</a>
      <div className="navbar-nav">
        <a className="nav-link" onClick={() => onFilterCategory('Mejor valorados')}>Mejor Valorados</a>
        <a className="nav-link" onClick={() => onFilterCategory('Más vendidos')}>Más vendidos</a>
        <a className="nav-link" onClick={() => onFilterCategory('Gratuitos')}>Gratuitos</a>
        <a className="nav-link" onClick={() => onFilterCategory('Multijugador')}>Multijugador</a>
        <a className="nav-link" onClick={() => onFilterCategory('Acceso anticipado')}>Acceso anticipado</a>
      </div>


      <div className="ms-auto d-flex">
        <button className="btn btn-outline-light me-2" onClick={onToggleCart}>Carrito</button>
        <button className="btn btn-outline-light me-2" onClick={onToggleSearch}>Buscar</button>
        <button className="btn btn-outline-light me-2" onClick={onTogglePrice}>Filtrar por precio</button>
        <button className="btn btn-outline-light mx-2" onClick={() => navigate('/edit-profile')}>
          Perfil
        </button>
        <button className="btn btn-outline-light me-2" onClick={() => navigate('/Login')}>
          Iniciar Sesión
        </button>
        <button className="btn btn-outline-light ms-2" onClick={() => navigate('/crear-cuenta')}>
          Crear Cuenta
        </button>
      </div>
    </nav>
  );
};
export default Navbar;