import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/estilos4.css';



import 'bootstrap/dist/css/bootstrap.min.css';





const EditarPerfil = () => {
  const navigate = useNavigate();

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    navigate('/');
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido:</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico:</label>
              <input type="email" className="form-control" required />
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
