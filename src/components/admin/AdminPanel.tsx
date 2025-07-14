import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditNotice from './EditNotice';
import '../../assets/estiloAdminNoticias.css';
import type { Noticia } from '../data/noticias';
import NoticeTable from './NoticeTable';
import DeleteNotice from './DeleteNotice';
import AddNotice from './AddNotice';
import FilterGamesModal from './FilterGamesModal';
import AdminGameModal, { type Game } from './AdminGameModal';
import type { User } from '../data/user';



type FilterData = {
  categoria: string;
  precioMin: string;
  precioMax: string;
};

const AdminPanel: React.FC = () => {
  // Eliminados estados no usados


  const [activeSection, setActiveSection] = useState<"usuarios" | "juegos" | "noticias" | "estadisticas">("usuarios");
  const navigate = useNavigate();
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState<Noticia | null>(null); 
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<{ id: number }>({ id: 0 });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<{ id: number }>({ id: 0 });

  

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch("/api/admin/news");
        const data: Noticia[] = await response.json();
        console.log(data); // Verifica la respuesta aquí
        setNoticias(data);
      } catch (error) {
        console.error('Error al obtener las noticias:', error);
      }
    };
    fetchNoticias();
  }, []);

  // Fetch usuarios desde el backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data: User[] = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);


  // Función para obtener los juegos desde el backend
  const fetchGames = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/games');
      const data: Game[] = await response.json(); // Asegúrate de que la respuesta sea un array de tipo `Game`
      setGames(data); // Actualiza el estado con los juegos obtenidos
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
    }
  };

  // Llamada a la función fetchGames cuando el componente se monta
  useEffect(() => {
    fetchGames();
  }, []); 

  


  // Eliminar juego por id
  const handleDeleteGame = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/admin/games/${id}`, {
        method: 'DELETE',
      });
      setGames(prev => prev.filter(game => game.id !== id)); // Actualizar la lista de juegos
    } catch (error) {
      console.error('Error al eliminar el juego:', error);
    }
  };


  // Guardar (agregar o editar) juego
  const handleSaveGame = async (game: Game) => {
    try {
      if (game.id) {
        // Editar juego
        await fetch(`http://localhost:5000/api/admin/games/${game.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(game),
        });
      } else {
        // Agregar nuevo juego
        await fetch('http://localhost:5000/api/admin/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(game),
        });
      }
      setGameModalVisible(false);
    } catch (error) {
      console.error('Error al guardar el juego:', error);
    }
  };

  const handleApplyFilters = async (filters: FilterData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/games/filter?category=${filters.categoria}&priceRange=${filters.precioMin}-${filters.precioMax}`);
      const data = await response.json();
      if (response.ok) {
        setGames(data); // Actualizar juegos con los filtros aplicados
      } else {
        alert('Error al aplicar los filtros');
      }
    } catch (error) {
      console.error('Error al aplicar los filtros:', error);
    }
  };


  
  const handleDeleteRequest = (id: number) => { 
    setNoticeToDelete({ id });
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const numericId = Number(noticeToDelete.id);  // Asegurarse de que el id sea un número
      await fetch(`http://localhost:5000/api/admin/news/${numericId}`, {
        method: 'DELETE',
      });

      setNoticias(prev => prev.filter(n => n.id !== numericId));  // Comparar con el id numérico
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Error al eliminar la noticia:', error);
    }
  };

  // Eliminada función no usada handleDelete
  const handleAddNotice = async (title: string, content: string, image: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image }), // Asegúrate de enviar la imagen
      });

      const data = await response.json();
      if (response.ok) {
        setNoticias(prev => [data.news, ...prev]); // Agregar la nueva noticia al inicio
      } else {
        alert(data.message || 'Error al agregar la noticia');
      }
    } catch (error) {
      console.error('Error al agregar la noticia:', error);
    }
    setAddModalVisible(false);
  };


  const handleOpenEdit = (id: number) => {
    const noticia = noticias.find(n => n.id === id);
    if (noticia) {
      setNoticeToEdit({
        id: noticia.id,
        title: noticia.title,
        content: noticia.content,
        image: noticia.image,
        createdAt: noticia.createdAt,  // Asignamos createdAt
        updatedAt: noticia.updatedAt,  // Asignamos updatedAt
      });
      setEditModalVisible(true); // Asegúrate de que el estado esté configurado en true
    }
  };

  const handleEditSubmit = async (id: number, title: string, content: string, image: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image }), // Ahora enviamos 'image'
      });

      const data = await response.json();
      if (response.ok) {
        setNoticias(prev =>
          prev.map(n => (n.id === id ? { ...n, title, content, image } : n))  // Actualizamos también la imagen
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
                  <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>País</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.country}</td>
                    </tr>
                  ))}
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
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setGameToEdit(null);
                    setGameModalVisible(true);
                  }}
                >
                  + Agregar Juego
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setFilterModalVisible(true)}
                >
                  Filtrar Juegos
                </button>
              </div>
              <table className="table table-bordered table-hover shadow-sm">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="gameTableBody">
                  {games.map((game) => (
                    <tr key={game.id.toString()}>
                      <td>{game.title}</td>
                      <td>{game.category}</td>
                      <td>
                        {game.discount && game.discount > 0 ? (
                          <>
                            <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
                              ${game.price.toFixed(2)}
                            </span>
                            <span>
                              ${(game.price * (1 - game.discount / 100)).toFixed(2)}
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
                            setGameToEdit({
                              id: game.id,
                              title: game.title,
                              category: game.category,
                              price: game.price,
                              discount: game.discount ?? 0,
                              description: game.description,
                              platform: game.platform,
                              releaseDate: game.releaseDate,
                              images: game.images,
                              onSale: game.onSale ?? false,  // Asegúrate de incluir `onSale`, con un valor por defecto si no existe
                            });
                            setGameModalVisible(true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            const confirmed = window.confirm(
                              "¿Estás seguro de que deseas eliminar este juego?"
                            );
                            if (confirmed) {
                              handleDeleteGame(game.id);
                            }
                          }}
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
      </div>

      {/* Modals de noticias */}
      <EditNotice
        visible={editModalVisible}  // Asegúrate de que visible esté correctamente configurado
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        initialData={noticeToEdit ? noticeToEdit : { id: 0, title: "", content: "", image: "" }}
      />

      <DeleteNotice
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        id={noticeToDelete.id}
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