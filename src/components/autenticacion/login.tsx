import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [setUser] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpiar mensajes de error previos
    setErrorMessage('');

    try {
      // Enviar solicitud POST al backend para login con Fetch
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  // Pasamos las credenciales como JSON
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);   // Almacenar los datos del usuario en el estado
        navigate('/');  // Redirigir a la página principal
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al iniciar sesión');  // Mostrar mensaje de error
      }
    } catch (error) {
      // Si ocurre un error durante la solicitud
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Error al realizar la solicitud');
    }
  };


  return (
    <div className="bg-light min-vh-100">
      <header className="d-flex align-items-center p-3">
        <div className="logo">
          <img
            src="/img/logo.png"
            alt="Logo GameStore"
            style={{ cursor: 'pointer', maxWidth: '80px' }}
            onClick={() => navigate('/')}
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

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}  {/* Mostrar error si existe */}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">Correo electrónico:</label>
              <input
                type="email"  // Cambiado de 'text' a 'email'
                className="form-control"
                id="email"  // Cambiado de 'username' a 'email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-light w-100 btn-custom mb-2">
              Iniciar Sesión
            </button>

            <div className="d-flex justify-content-between">
              <Link to="/recuperar" className="forgot-password">¿Olvidaste tu contraseña?</Link>
              <Link to="/admin-panel" className="forgot-password">¿Eres administrador?</Link>
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
