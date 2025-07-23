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
  const [noticeToEdit, setNoticeToEdit] = useState({ id: '', title: '', content: '' });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<{ id: string }>({ id: '' });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [noticiasDemo, setNoticiasDemo] = useState<Noticia[]>([]);

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

const cargarNoticiasDemo = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/news/demo');
    const data = await response.json();
    setNoticiasDemo(data);
  } catch (error) {
    console.error('Error al cargar noticias demo:', error);
  }
};

useEffect(() => {
  cargarNoticiasDemo();
}, []);

const noticiasCombinadas = [...noticiasDemo, ...noticias];

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
const handleSaveGame = async (game: Partial<Game>) => {
  if (!game.title || !game.price || !game.category) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  // ✅ Paso 2: Normalizar los valores opcionales
  const gameSanitized = {
    ...game,
    discount: game.discount ?? 0,
    onSale: game.onSale ?? false,
  };

  try {
    let response;

    if (game.id) {
      // ⚙️ Edición: enviar PUT al backend
      response = await fetch(`http://localhost:5000/api/admin/games/${game.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameSanitized),
      });
    } else {
      // 🆕 Creación: enviar POST al backend
      response = await fetch('http://localhost:5000/api/admin/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameSanitized),
      });
    }

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      const savedGame = data.game;

      setGames(prev => {
  const index = prev.findIndex(g => g.id === savedGame.id);
  if (index !== -1) {
    // Ya existía en la lista: lo reemplazamos
    const updated = [...prev];
    updated[index] = savedGame;
    return updated;
  } else {
    // Es nuevo: lo agregamos
    return [savedGame, ...prev];
  }
});

    } else {
      alert(data.message || 'Error al guardar el juego');
    }
  } catch (error) {
    console.error('Error al guardar el juego:', error);
    alert('Error inesperado al guardar el juego');
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


  
  const handleDeleteRequest = (id: string) => {
    setNoticeToDelete({ id });
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/admin/news/${noticeToDelete.id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      setNoticias(prev => prev.filter(n => n.id !== noticeToDelete.id)); // Actualiza el estado
      setDeleteModalVisible(false); // Cierra el modal
    } else {
      alert(data.message || 'Error al eliminar la noticia');
    }
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
    alert('Error al eliminar la noticia');
  }
};


  // Eliminada función no usada handleDelete
  const handleAddNotice = async (title: string, content: string, image: string) => {
  const cleanTitle = title.trim().toLowerCase().replace(/\s+/g, ' '); // Normaliza el título
  const cleanContent = content.trim();
  const cleanImage = image.trim();

  try {
    const response = await fetch('http://localhost:5000/api/admin/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: cleanTitle,
        content: cleanContent,
        image: cleanImage,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setNoticias(prev => [data.news, ...prev]);
      setAddModalVisible(false); // Cierra el modal después de éxito
    } else {
      alert(data.message || 'Error al agregar la noticia');
    }
  } catch (error) {
    console.error('Error al agregar la noticia:', error);
    alert('Hubo un error al enviar la noticia');
  }
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
  {(() => {
    const descuento = game.discount ?? 0;

    if (descuento > 0) {
      const precioConDescuento = (game.price * (1 - descuento / 100)).toFixed(2);
      return (
        <>
          <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
            ${game.price.toFixed(2)}
          </span>
          <span>${precioConDescuento}</span>
        </>
      );
    } else {
      return <>${game.price.toFixed(2)}</>;
    }
  })()}
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
                noticias={noticiasCombinadas}
                onEditar={handleOpenEdit}
                onBorrar={handleDeleteRequest}
              />
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