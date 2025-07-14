import React, { useState, useEffect } from 'react';
import '../../assets/estiloAdminNoticias.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Review } from '../data/reviews';


interface Game {
  id: number; // ID único del juego
  title: string; // Título del juego
  description: string; // Descripción del juego
  price: number; // Precio del juego
  category: string; // Categoría del juego
  platform: string; // Plataforma del juego
  releaseDate: string; // Fecha de lanzamiento
  onSale: boolean; // Indica si está en oferta
  images: string[]; // URLs de imágenes del juego
  rating?: number; // Calificación del juego
  reviews?: Review[]; // Reseñas del juego
  discount?: number; // Descuento
}

interface AdminGameModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: Game | null;
  onSave: (game: Game) => void;
}

const AdminGameModal: React.FC<AdminGameModalProps> = ({ visible, onClose, initialData, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [onSale, setOnSale] = useState(false);
  const [images, setImages] = useState<string[]>([]);


  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value.trim();
    if (!imageUrl) return;

    // Verificar si la URL es válida
    if (isValidUrl(imageUrl)) {
      setImages(prevImages => [...prevImages, imageUrl]);
    } else {
      alert("La URL de la imagen no es válida.");
    }

    // Limpiar el input
    e.target.value = '';
  };

  // Función para validar URL
  const isValidUrl = (string: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/[^\\s]*)?$', 'i');
    return pattern.test(string);
  };



  // Función para eliminar una imagen
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index)); // Eliminar la imagen en el índice especificado
  };
 
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);
      setPrice(initialData.price);
      setDiscount(initialData.discount || 0);
      setDescription(initialData.description);
      setPlatform(initialData.platform);
      setReleaseDate(initialData.releaseDate);
      setOnSale(initialData.onSale);
      setImages(initialData.images);
    } else {
      // Reset form if no initial data
      setTitle('');
      setCategory('');
      setPrice(0);
      setDiscount(0);
      setDescription('');
      setPlatform('');
      setReleaseDate('');
      setOnSale(false);
      setImages([]);
    }
  }, [initialData, visible]);

  


  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const game: Game = {
      id: initialData?.id ?? Date.now(), // Use Date.now() for new game or existing ID
      title,
      category,
      price,
      discount,
      description,
      platform,
      releaseDate,
      onSale,
      images,
    };

    try {
      let response;
      if (initialData?.id) {
        // Actualizar el juego (PUT)
        response = await fetch(`http://localhost:5000/api/admin/games/${initialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(game)
        });
      } else {
        // Agregar nuevo juego (POST)
        response = await fetch('http://localhost:5000/api/admin/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(game)
        });
      }

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Mensaje de éxito
        onSave(game); // Actualizar lista de juegos
        onClose(); // Cerrar modal
      } else {
        alert(data.message || 'Error al guardar el juego');
      }
    } catch (error) {
      console.error('Error al guardar el juego:', error);
      alert('Error al guardar el juego');
    }
  };

  if (!visible) return null;

  return (
    <div className="modal d-block" onClick={onClose} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">{initialData ? 'Editar Juego' : 'Agregar Juego'}</h5>
              <button
                type="button"
                className="btn-close"
                style={{ filter: 'invert(1)' }}
                onClick={onClose}
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="title" className="form-label">Título</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <input
                    type="text"
                    id="category"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="price" className="form-label">Precio ($)</label>
                  <input
                    type="number"
                    id="price"
                    className="form-control"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="discount" className="form-label">Descuento (%)</label>
                  <input
                    type="number"
                    id="discount"
                    className="form-control"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="platform" className="form-label">Plataforma</label>
                  <input
                    type="text"
                    id="platform"
                    className="form-control"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="releaseDate" className="form-label">Fecha de Lanzamiento</label>
                  <input
                    type="date"
                    id="releaseDate"
                    className="form-control"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                  id="description"
                  className="form-control"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="images" className="form-label">URLs de Imágenes</label>
                <input
                  type="text"
                  id="images"
                  className="form-control"
                  onBlur={handleImageInput} // On blur (after focus is lost)
                />
                <small className="form-text text-muted">Agrega las URLs de las imágenes separadas por enter.</small>
              </div>

              <div className="mb-3">
                <h5>Imágenes cargadas</h5>
                <ul>
                  {images.map((image, index) => (
                    <li key={index}>
                      <img src={image} alt={`game-img-${index}`} className="img-thumbnail" width="100" />
                      <button type="button" onClick={() => removeImage(index)} className="btn btn-danger btn-sm ml-2">
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary mx-2">Guardar</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default AdminGameModal;
export type { Game };