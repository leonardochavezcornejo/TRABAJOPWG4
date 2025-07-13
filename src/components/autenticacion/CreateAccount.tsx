import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();

  // Estados para cada campo del formulario
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpiar mensajes de error previos
    setErrorMessage('');

    try {
      // Enviar solicitud POST al backend para registrar el usuario
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, username, country }),  // Pasamos los datos como JSON
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        const data = await response.json();
        navigate('/verificar');  // Redirigir a una página de verificación o login
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al registrar cuenta');  // Mostrar mensaje de error
      }
    } catch (error) {
      // Si ocurre un error durante la solicitud
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Error al realizar la solicitud');
    }
  };


  return (
    <div className="d-flex vh-100">
      {/* Panel izquierdo */}
      <div className="left-panel d-flex flex-column justify-content-between p-4">
        <div className="d-flex align-items-center">
          <div className="logo">
            <img
              src="/img/logo.png"
              alt="Logo GameStore"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
          </div>
          <div className="brand ms-2">RetroGames</div>
        </div>
        <div className="mt-3">
          <h2>Crea tu cuenta en nuestra tienda</h2>
          <p>Busca tus juegos favoritos y juégalos sin restricción</p>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="right-panel p-4 d-flex flex-column justify-content-center">
        <div className="text-end">
          <button className="btn-close" aria-label="Close" onClick={() => navigate('/')}></button>
        </div>
        <div className="form-container mx-auto">
          <h3 className="text-center mb-4">Regístrate en RetroGames</h3>

          {/* Mostrar error si existe */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre Completo:</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="form-text">La contraseña debe tener al menos 15 caracteres.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="form-text">Puedes usar letras, números o signos ($,%,#,@,!,...).</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Tu país:</label>
              <select
                className="form-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="" disabled selected>Escoge...</option>
                <option>Perú</option>
                <option>Argentina</option>
                <option>Chile</option>
              </select>
              <div className="form-text">
                Por razones de cumplimiento, estamos obligados a recopilar información sobre tu país para ofrecerte precios y cuentas adecuados.
              </div>
            </div>
            <button type="submit" className="btn btn-light w-100 btn-custom mb-2">
              <span>Continuar</span>
              <span>&rarr;</span>
            </button>
          </form>

          <p className="mt-3 text-center create-account">
            ¿Tienes una cuenta?{' '}
            <span style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => navigate('/login')}>
              Inicia sesión aquí
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};


export default CreateAccount;
