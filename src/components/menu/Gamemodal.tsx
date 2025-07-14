import React, { useState } from 'react';
import type { Game } from '../admin/AdminGameModal';
import type { Review } from '../data/reviews';
import '../../assets/juego.css';

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
  onAddToCart: (game: Game) => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Reiniciar la imagen seleccionada cuando cambia el juego
  React.useEffect(() => {
    setSelectedImage(0);
  }, [game]);


  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState(game?.reviews || []);

  if (!game) return null;

  const handleSubmit = () => {
    if (!userName || !userComment || userRating === 0) return;

    const date = new Date().toISOString().split('T')[0];
    const newReview: Review = {
      name: userName,
      comment: userComment,
      stars: userRating,
      date
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setUserName('');
    setUserComment('');
    setUserRating(0);
  };


  // Función para manejar el botón "Añadir al carrito"
  const handleAddToCart = () => {
    if (game) {
      onAddToCart(game); // Llama a la función para agregar al carrito
    }
  };

  return (
    <div className="game-modal-2" onClick={onClose}>
      <div className="modal-content-game" onClick={(e) => e.stopPropagation()}>
        <div className="row gx-4">
          {/* Columna izquierda */}
          <div className="col-md-6">
            <h2 className="text-center mb-3">{game.title}</h2>
            {/* Mostrar el video o iframe de YouTube dependiendo de la URL */}
            {game.images[selectedImage].endsWith('.mp4') ? (
              <video
                src={game.images[selectedImage]}
                controls
                className="img-fluid rounded mb-3"
                style={{ width: '100%', height: 300, objectFit: 'cover' }}
                poster={game.images.find(img => img.endsWith('.jpg') || img.endsWith('.jpeg') || img.endsWith('.png'))} // Vista previa de imagen
              />
            ) : game.images[selectedImage].includes('youtube.com') ? (
              // Mostrar iframe de YouTube si el enlace es de youtube.com
              <div className="mb-3" style={{ width: '100%', height: 300 }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={game.images[selectedImage].includes('embed') ? game.images[selectedImage] : game.images[selectedImage].replace('watch?v=', 'embed/')} // Convertir a formato embed si es necesario
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '8px', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ) : (
              <img
                src={game.images[selectedImage]}
                alt={game.title}
                className="img-fluid rounded mb-3"
                style={{ width: '100%', height: 300, objectFit: 'cover' }}
              />
            )}
            <div className="d-flex justify-content-center mb-3 flex-wrap">
              {/* Recorrer las miniaturas */}
              {game.images.map((img, index) => {
                if (img.endsWith('.mp4')) {
                  return (
                    <video
                      key={index}
                      src={img}
                      className={`thumb ${index === selectedImage ? 'active' : ''}`}
                      style={{
                        width: 60, height: 40, objectFit: 'cover', margin: 2,
                        border: index === selectedImage ? '2px solid #007bff' : '1px solid #ccc', cursor: 'pointer'
                      }}
                      onClick={() => setSelectedImage(index)}
                      muted
                      preload="metadata"
                    />
                  );
                } else if (img.includes('youtube.com')) {
                  // Extraer el id del video de YouTube, manejando tanto el formato 'embed' como 'watch?v='
                  const match = img.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                  const videoId = match ? match[1] : '';  // Obtener el video ID
                  const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : ''; // Generar miniatura de YouTube

                  return (
                    <img
                      key={index}
                      src={thumbUrl}  // Usamos la URL de la miniatura
                      className={`thumb ${index === selectedImage ? 'active' : ''}`}
                      style={{
                        width: 60, height: 40, objectFit: 'cover', margin: 2,
                        border: index === selectedImage ? '2px solid #007bff' : '1px solid #ccc', cursor: 'pointer'
                      }}
                      onClick={() => setSelectedImage(index)}
                      alt={`thumbnail-youtube-${index}`} // Asegúrate de que el alt sea correcto
                    />
                  );
                } else {
                  return (
                    <img
                      key={index}
                      src={img}
                      className={`thumb ${index === selectedImage ? 'active' : ''}`}
                      style={{
                        width: 60, height: 40, objectFit: 'cover', margin: 2,
                        border: index === selectedImage ? '2px solid #007bff' : '1px solid #ccc', cursor: 'pointer'
                      }}
                      onClick={() => setSelectedImage(index)}
                      alt={`thumbnail-${index}`}
                    />
                  );
                }
              })}
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-md-6">
            <h4>Description</h4>
            <p>{game.description}</p>

            <h4>User Reviews</h4>
            <div id="gameReviews" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {reviews.length > 0 ? (
                reviews.map((r, i) => (
                  <div key={i} className="review-item">
                    <div className="d-flex justify-content-between">
                      <span className="review-user">{r.name}</span>
                      <small>{r.date}</small>
                    </div>
                    <div className="review-rating">{'★'.repeat(r.stars)}</div>
                    <div className="review-text">{r.comment}</div>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>

            <h5 className="mt-4">Add Your Review</h5>
            <input
              type="text"
              placeholder="Your Name"
              className="form-control mb-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <textarea
              placeholder="Your Review"
              className="form-control mb-2"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              rows={3}
            />
            <div className="star-rating mb-2 text-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`star ${userRating >= s ? 'active' : ''}`}
                  onClick={() => setUserRating(s)}
                  style={{ cursor: 'pointer' }}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Submit Review
            </button>

            {/* Botón de Añadir al carrito */}
            <button className="btn btn-success w-100 mt-4" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameModal;