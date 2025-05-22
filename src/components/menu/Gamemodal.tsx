import React, { useState } from 'react';
import type { Game } from '../types';
import '../../assets/juego.css';

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
  onAddToCart: (game: Game) => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState(game?.reviews || []);

  if (!game) return null;

  const handleSubmit = () => {
    if (!userName || !userComment || userRating === 0) return;

    const date = new Date().toISOString().split('T')[0];
    const newReview = {
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

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="game-modal-2" onClick={onClose}>
      <div className="modal-content-game" onClick={(e) => e.stopPropagation()}>
        <div className="row gx-4">
          {/* Columna izquierda */}
          <div className="col-md-6">
            <h2 className="text-center mb-3">{game.title}</h2>
            <img
              src={game.images[selectedImage]}
              alt={game.title}
              className="img-fluid rounded mb-3"
              style={{ width: '100%', height: 300, objectFit: 'cover' }}
            />
            <div className="d-flex justify-content-center mb-3 flex-wrap">
              {game.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`thumb ${index === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  alt={`thumbnail-${index}`}
                />
              ))}
            </div>
            <div className="text-center my-3">
              <div className="d-flex justify-content-center align-items-center mb-2">
                <span className="me-2">Valoración:</span>
                <div className="text-warning me-1">
                  {'★'.repeat(Math.round(Number(averageRating)))}
                </div>
                <span>({averageRating} de {reviews.length} valoraciones)</span>
              </div>
              <button className="btn btn-success w-100" onClick={() => onAddToCart(game)}>
                Agregar al carrito - ${game.price}
              </button>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-md-6">
            <h4>Descripción</h4>
            <p>{game.description}</p>

            <h4>Reseñas de usuarios</h4>
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
                <p>No hay reseñas aún.</p>
              )}
            </div>

            <h5 className="mt-4">Agregar tu reseña</h5>
            <input
              type="text"
              placeholder="Tu nombre"
              className="form-control mb-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <textarea
              placeholder="Tu reseña"
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
              Enviar reseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;