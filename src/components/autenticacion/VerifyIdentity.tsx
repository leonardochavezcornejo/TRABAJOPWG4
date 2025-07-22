import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';

const VerifyIdentity: React.FC = () => {
  const navigate = useNavigate();

  // Estado para capturar el código de confirmación
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Enviar solicitud POST al backend para verificar el código
      const response = await fetch('http://localhost:5000/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }), // Enviar el código de verificación
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Código verificado con éxito');
        setTimeout(() => navigate('/login'), 2000); // Redirigir al login después de 2 segundos
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al verificar el código');
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

      {/* Formulario */}
      <div className="login-box">
        <h3 className="text-center mb-4">Verificar tu identidad</h3>
        <p className="text-center mb-4">
          Se ha enviado un código de confirmación a tu correo electrónico. Ingresa el código para continuar.
        </p>
        
        {/* Mostrar error o éxito si existen */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Código de confirmación:</label>
            <input
              type="text"
              className="form-control"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
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