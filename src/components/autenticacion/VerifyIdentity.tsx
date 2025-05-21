import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const VerifyIdentity: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="main-background d-flex flex-column align-items-center justify-content-center min-vh-100">
      {/* Logo */}
      <div className="logo mb-4">
        <img src="/img/logo.png" alt="Logo GameStore" />
      </div>

      {/* Formulario */}
      <div className="login-box">
        <h3 className="text-center mb-4">Verificar tu identidad</h3>
        <p className="text-center mb-4">
          Se ha enviado un código de confirmación a tu correo electrónico. Ingresa el código para continuar.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Código de confirmación:</label>
            <input type="text" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-light w-100 btn-custom mt-3">
            Verificar
          </button>
        </form>

        <p className="mt-3 text-center">
          ¿No recibiste el código? <a href="#">Reenviar código</a>
        </p>
      </div>
    </div>
  );
};

export default VerifyIdentity;
