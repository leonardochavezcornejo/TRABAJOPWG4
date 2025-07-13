import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/estilos4.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const EditarPerfil = () => {
  const navigate = useNavigate();

  const { userId } = useParams();  // Obtener el ID del usuario de los parámetros de la URL
  const [userData, setUserData] = useState<any>(null);  // Guardar los datos del usuario
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener los datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
          setFullName(data.username);  // Asignamos los valores al estado
          setEmail(data.email);
        } else {
          setErrorMessage(data.message || 'Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Error al obtener los datos del usuario');
      }
    };

    if (userId) {
      fetchUserData();  // Cargar datos del usuario al cargar el componente
    }
  }, [userId]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // Enviar solicitud PUT al backend para actualizar el perfil del usuario
      const response = await fetch(`http://localhost:5000/api/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, fullName, email }),  // Enviamos los datos actualizados
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);  // Mostrar mensaje de éxito
        navigate('/');  // Redirigir al usuario al menú principal
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al guardar los cambios');  // Mostrar mensaje de error
      }
    } catch (error) {
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
              style={{ cursor: 'pointer', maxWidth: '80px' }}
              onClick={() => navigate('/')}
            />
          </div>
          <div className="brand ms-2">RetroGames</div>
        </div>
        <div className="mt-3">
          <h2>Edita tu perfil</h2>
          <p>Actualiza tu información personal para mantener tu cuenta al día</p>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="right-panel p-4 d-flex flex-column justify-content-center">
        <div className="text-end">
          <button
            className="btn-close"
            aria-label="Close"
            onClick={() => navigate('/')}
          ></button>
        </div>
        <div className="form-container mx-auto">
          <h3 className="text-center mb-4">Editar Perfil</h3>

          {/* Mostrar error si existe */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
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
            <button
              type="submit"
              className="btn btn-light w-100 btn-custom mb-2"
            >
              <span>Guardar Cambios</span>
            </button>
          </form>
          <p className="btn btn-light w-100 btn-custom mb-2">
            <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              Volver al menú principal
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil;
