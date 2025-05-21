import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="bg-light min-vh-100">
      <header className="d-flex align-items-center p-3">
        <div className="logo">
          <img
            src="/img/logo.png"
            alt="Logo GameStore"
            style={{ cursor: 'pointer', maxWidth: '80px' }}
            onClick={() => navigate('/menu')}
          />
        </div>
        <div className="brand ms-2">
          <h2 className="mb-1">RetroGames</h2>
        </div>
      </header>

      <main className="d-flex align-items-center justify-content-center main-background" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="login-box text-center">
          <h2 className="mb-4">
            Iniciar sesión en
            <br />
            RetroGames
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label">Correo electrónico:</label>
              <input type="text" className="form-control" id="username" required />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input type="password" className="form-control" id="password" required />
            </div>

            <button type="submit" className="btn btn-light w-100 btn-custom mb-2">
              Iniciar Sesión
            </button>

            <div className="d-flex justify-content-between">
              <Link to="/recuperar" className="forgot-password">¿Olvidaste tu contraseña?</Link>
              <Link to="/admin" className="forgot-password">¿Eres administrador?</Link>
            </div>
          </form>

          <p className="mt-3 create-account">
            ¿Eres nuevo en RetroGames? <Link to="/crear-cuenta">Crea una cuenta</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginForm;