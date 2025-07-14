import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditNotice from './EditNotice';
import '../../assets/estiloAdminNoticias.css';
import { noticiasIniciales } from '../data/noticias';
import type { Noticia } from '../data/noticias';
import NoticeTable from './NoticeTable';
import DeleteNotice from './DeleteNotice';
import AddNotice from './AddNotice';
import FilterGamesModal from './FilterGamesModal';
import AdminGameModal, { type GameData } from './AdminGameModal';
import { games as initialGames } from '../data/games';
import MonthlyEarningsChart from './MonthlyEarningsChart';




type FilterData = {
  categoria: string;
  precioMin: string;
  precioMax: string;
};

const AdminPanel: React.FC = () => {
  // Eliminados estados no usados


  const [activeSection, setActiveSection] = useState<"usuarios" | "juegos" | "noticias" | "estadisticas">("usuarios");
  const navigate = useNavigate();
  const userCount = 3;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState({ id: '', title: '', content: '' });
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasIniciales);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<{ id: string }>({ id: '' });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<GameData | null>(null);
  const [games, setGames] = useState(initialGames);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/games');
        const data = await response.json();
        setGames(data);  // Establecer los juegos desde la respuesta del backend
      } catch (error) {
        console.error('Error al obtener los juegos:', error);
      }
    };

    fetchGames();
  }, []); 


  // Añadir juego

  const handleAddGame = async (game: GameData) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
      });

      if (response.ok) {
        const newGame = await response.json();
        setGames((prevGames) => [...prevGames, newGame.game]);  // Actualizar el estado con el nuevo juego
      } else {
        console.error('Error al agregar el juego');
      }
    } catch (error) {
      console.error('Error al agregar el juego:', error);
    }
  };

  // Eliminar un juego

  const handleDeleteGame = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/games/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGames((prevGames) => prevGames.filter((game) => game.id !== id));  // Eliminar del estado
      } else {
        console.error('Error al eliminar el juego');
      }
    } catch (error) {
      console.error('Error al eliminar el juego:', error);
    }
  };

  // Editar un juego
  const handleSaveGame = async (game: GameData) => {
    try {
      if (game.id) {
        // Editar juego
        const response = await fetch(`http://localhost:5000/api/admin/games/${game.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(game),
        });

        if (response.ok) {
          const updatedGame = await response.json();
          setGames((prevGames) =>
            prevGames.map((g) => (g.id === updatedGame.id ? updatedGame : g))  // Actualizar el juego editado
          );
        }
      } else {
        // Agregar juego
        await handleAddGame(game);
      }
    } catch (error) {
      console.error('Error al guardar el juego:', error);
    }
  };


  // ------------------------------------ NOTICIAS ------------------------------------
  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/admin/news/${noticeToDelete.id}`, {
        method: 'DELETE',
      });
      setNoticias(prev => prev.filter(n => n.id !== noticeToDelete.id));
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Error al eliminar la noticia:', error);
    }
  };

  // Muestra el modal de confirmación para borrar una noticia
  const handleDeleteRequest = (id: string) => {
    setNoticeToDelete({ id });
    setDeleteModalVisible(true);
  };

  // Eliminada función no usada handleDelete
  const handleAddNotice = async (title: string, content: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (response.ok) {
        setNoticias(prev => [data.news, ...prev]); // Agrega encima
      } else {
        alert(data.message || 'Error al agregar la noticia');
      }
    } catch (error) {
      console.error('Error al agregar la noticia:', error);
    }
    setAddModalVisible(false);
  };

  const handleOpenEdit = (id: string) => {
    const noticia = noticias.find(n => n.id === id);
    if (noticia) {
      setNoticeToEdit({ id: noticia.id, title: noticia.title, content: noticia.content });
      setEditModalVisible(true);
    }
  };

  const handleEditSubmit = async (id: string, title: string, content: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (response.ok) {
        setNoticias(prev =>
          prev.map(n => (n.id === id ? { ...n, title, content } : n))
        );
      } else {
        alert(data.message || 'Error al editar la noticia');
      }
    } catch (error) {
      console.error('Error al editar la noticia:', error);
    }
    setEditModalVisible(false);
  };

  const showSection = (section: typeof activeSection) => {
    setActiveSection(section);
  };

  // Función para aplicar filtros a los juegos
  const handleApplyFilters = (filters: FilterData) => {
    // Aquí puedes implementar la lógica de filtrado según tus necesidades
    // Por ejemplo, podrías filtrar los juegos por categoría y rango de precios
    setGames(
      initialGames.filter((game) => {
        const matchesCategory =
          !filters.categoria || game.category === filters.categoria;
        const matchesMin =
          !filters.precioMin || game.price >= parseFloat(filters.precioMin);
        const matchesMax =
          !filters.precioMax || game.price <= parseFloat(filters.precioMax);
        return matchesCategory && matchesMin && matchesMax;
      })
    );
    setFilterModalVisible(false);
  };

  return (
    <div className="d-flex dashboard-bg" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="sidebar d-flex flex-column align-items-center">
        <div className="admin-photo mb-3">
        <img
            src="/img/Cutti.jpg"
            alt="Foto de Sergio Cutti"
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
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
                <tbody id="gameTableBody">
                  {games.map(game => (
                    <tr key={game.id}>
                      <td>{game.title}</td>
                      <td>{game.category}</td>
                      <td>
                        {(game as any).discount && (game as any).discount > 0 ? (
                          <>
                            <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
                              ${game.price.toFixed(2)}
                            </span>
                            <span>
                              ${ (game.price * (1 - ((game as any).discount ?? 0) / 100)).toFixed(2) }
                            </span>
                          </>
                        ) : (
                          <>${game.price.toFixed(2)}</>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => {
                            // Pasar discount aunque no esté en Game
                        setGameToEdit({
                          id: String(game.id),
                          title: game.title,
                          category: game.category,
                          price: game.price,
                          discount: (game as any).discount ?? 0,
                          description: game.description
                        });
                            setGameModalVisible(true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteGame(game.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
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
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <NoticeTable
                noticias={noticias}
                onEditar={handleOpenEdit}
                onBorrar={handleDeleteRequest}
              />
            </div>
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
              <h5>Ganancias por Mes</h5>
              <MonthlyEarningsChart />
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
      <AdminGameModal
        visible={gameModalVisible}
        onClose={() => setGameModalVisible(false)}
        initialData={gameToEdit}
        onSave={handleSaveGame}
      />
    </div> 
  );
};

export default AdminPanel;