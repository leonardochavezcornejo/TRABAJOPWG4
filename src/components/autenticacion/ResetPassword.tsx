import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      // Enviar solicitud POST al backend para restablecer la contraseña
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword }), // Enviar el email y la nueva contraseña
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Contraseña restablecida con éxito');
        setTimeout(() => navigate('/login'), 2000); // Redirigir al login después de 2 segundos
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setErrorMessage('Error al realizar la solicitud');
    }
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

        {/* Mostrar error o éxito si existen */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
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
            <label className="form-label">Nueva contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar nueva contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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