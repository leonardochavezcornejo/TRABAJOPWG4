import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="main-background d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative">
      {/* Logo */}
      <div className="logo mb-4">
        <img src="/img/logo.png" alt="Logo GameStore" />
      </div>

      {/* Botón de cierre */}
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0 m-3"
        aria-label="Close"
        onClick={() => navigate('/')}
      ></button>

      {/* Formulario */}
      <div className="login-box">
        <h3 className="text-center mb-4">Recuperar contraseña</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico:</label>
            <input type="email" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Nueva contraseña:</label>
            <input type="password" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar nueva contraseña:</label>
            <input type="password" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-light w-100 btn-custom mb-2">
            Restablecer contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;