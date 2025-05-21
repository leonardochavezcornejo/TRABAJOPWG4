import React from 'react';
import type { Game } from '../types';
import '../../assets/juego.css';

interface GameGridProps {
  games: Game[];
  onSelect: (game: Game) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ games, onSelect }) => {
  return (
    <div className="container mt-4">
      <h2>Juegos destacados</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 mt-2">
        {games.map(game => (
          <div key={game.id} className="col" onClick={() => onSelect(game)} style={{ cursor: 'pointer' }}>
            <div className="card h-100">
              <img src={game.images[0]} className="card-img-top" alt={game.title} />
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">${game.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;