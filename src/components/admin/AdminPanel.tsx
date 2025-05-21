import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditNotice from './EditNotice';
import '../../assets/estiloAdminNoticias.css';
import { noticiasIniciales } from '../data/noticias';
import type { Noticia } from '../data/noticias';
import NoticeTable from './NoticeTable';
import DeleteNotice from './DeleteNotice';
import AddNotice from './AddNotice';
import FilterGamesModal from './FilterGamesModal';
import GameModal, { type GameData } from './GameModal';

type FilterData = {
  fecha: string;
  categoria: string;
  precioMin: string;
  precioMax: string;
};

const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"usuarios" | "juegos" | "noticias" | "estadisticas">("usuarios");
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(3);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState({ id: '', title: '', content: '' });
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasIniciales);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<{ id: string }>({ id: '' });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<GameData | null>(null);
  const handleApplyFilters = (filters: FilterData) => {
    console.log("Filtros aplicados:", filters);
  };
  const handleDeleteRequest = (id: string) => {
    setNoticeToDelete({ id });
    setDeleteModalVisible(true);
  };
  const handleConfirmDelete = () => {
    setNoticias(prev => prev.filter(n => n.id !== noticeToDelete.id));
    setDeleteModalVisible(false);
  };
  const handleDelete = (id: string) => {
    setNoticias(prev => prev.filter(n => n.id !== id));
  };
  const handleAddNotice = (title: string, content: string) => {
    const nuevaNoticia: Noticia = {
      id: crypto.randomUUID(),
      title,
      content,
      fecha: new Date().toLocaleDateString(),
      estado: 'Activa'
    };
    setNoticias(prev => [nuevaNoticia, ...prev]);
    setAddModalVisible(false);
  };
  const handleOpenEdit = (id: string) => {
    const noticia = noticias.find(n => n.id === id);
    if (noticia) {
      setNoticeToEdit({ id: noticia.id, title: noticia.title, content: noticia.content });
      setEditModalVisible(true);
    }
  };

  const handleEditSubmit = (id: string, title: string, content: string) => {
    setNoticias(prev =>
      prev.map(n =>
        n.id === id ? { ...n, title, content } : n
      )
    );
    setEditModalVisible(false);
  };

  const showSection = (section: typeof activeSection) => {
    setActiveSection(section);
  };

  return (
    <div className="d-flex dashboard-bg" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="sidebar d-flex flex-column align-items-center">
        <div className="admin-photo mb-3"></div>
        <h5 className="text-white">Sergio Cutti</h5>
        <nav className="mt-4 w-100 px-3 d-flex flex-column" style={{ gap: "0.5rem" }}>
          <button
            className={`nav-link btn btn-link text-start ${activeSection === "usuarios" ? "active" : ""}`}
            onClick={() => showSection("usuarios")}
          >
            Usuarios
          </button>
          <button
            className={`nav-link btn btn-link text-start ${activeSection === "juegos" ? "active" : ""}`}
            onClick={() => showSection("juegos")}
          >
            Juegos
          </button>
          <button
            className={`nav-link btn btn-link text-start ${activeSection === "noticias" ? "active" : ""}`}
            onClick={() => showSection("noticias")}
          >
            Noticias
          </button>
          <button
            className={`nav-link btn btn-link text-start ${activeSection === "estadisticas" ? "active" : ""}`}
            onClick={() => showSection("estadisticas")}
          >
            Estadísticas
          </button>
          <button className="nav-link mt-auto btn btn-link text-start" onClick={() => navigate('/')}>
            Cerrar sesión
          </button>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="content flex-grow-1 p-4">
        {activeSection === "usuarios" && (
          <section className="admin-section">
            <h2 className="mb-4">Usuarios</h2>
            <div className="table-responsive">
              <table className="table table-striped table-bordered user-table text-center align-middle">
                <thead className="table-light">
                  <tr><th>Id</th><th>Foto</th><th>Nickname</th><th>Nombre</th></tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td><img src="/img/Andresaurio.png" className="user-photo" alt="Andresaurio" /></td><td>Andresaurio</td><td className="fw-bold">Andrés</td></tr>
                  <tr><td>2</td><td><img src="/img/Domo.jpg" className="user-photo" alt="Domazdack" /></td><td>Domazdack</td><td className="fw-bold">Dominic</td></tr>
                  <tr><td>3</td><td><img src="/img/JEP.jpg" className="user-photo" alt="Jep365" /></td><td>Jep365</td><td className="fw-bold">Jairo</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === "juegos" && (
          <section className="admin-section">
            <div className="container admin-panel">
              <h2 className="mb-4 text-center">Panel de Administración de Juegos</h2>
              <div className="d-flex justify-content-end mb-3 gap-2">
                <button className="btn btn-success" onClick={() => {
                  setGameToEdit(null);
                  setGameModalVisible(true);
                }}>+ Agregar Juego</button>
                <button type="button" className="btn btn-primary" onClick={() => setFilterModalVisible(true)}>
                  Filtrar Juegos
                </button>
              </div>
              <table className="table table-bordered table-hover shadow-sm">
                <thead><tr><th>Título</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr></thead>
                <tbody id="gameTableBody"></tbody>
              </table>
            </div>
          </section>
        )}

        {activeSection === "noticias" && (
          <section className="admin-section">
            <div className="header-news d-flex justify-content-between align-items-center mb-3">
              <h2>Noticias</h2>
              <button id="addNewsBtn" className="btn btn-success" onClick={() => setAddModalVisible(true)}>
                Añadir Noticia
              </button>
            </div>
            <NoticeTable
              noticias={noticias}
              onEditar={handleOpenEdit}
              onBorrar={handleDeleteRequest}
            />
          </section>
        )}

        {activeSection === "estadisticas" && (
          <section className="admin-section">
            <h2>Estadísticas</h2>
            <div className="mb-4" style={{ maxWidth: "250px" }}>
              <div className="card shadow-sm text-center">
                <div className="card-body">
                  <h5 className="card-title">Total de Usuarios</h5>
                  <p id="userCount" className="display-5 fw-bold text-primary">{userCount}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <h5>Juegos por Categoría</h5>
                <canvas id="gamesByCategoryChart" height={200}></canvas>
              </div>
              <div className="col-md-6 mb-4">
                <h5>Noticias por Mes</h5>
                <canvas id="newsByMonthChart" height={200}></canvas>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Modals de noticias */}
      <EditNotice
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        initialData={noticeToEdit}
      />
      <DeleteNotice
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
      <AddNotice
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddNotice}
      />
      <FilterGamesModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onFilter={handleApplyFilters}
      />
      <GameModal
        visible={gameModalVisible}
        onClose={() => setGameModalVisible(false)}
        initialData={gameToEdit}
      />
    </div> 
  );
};

export default AdminPanel;