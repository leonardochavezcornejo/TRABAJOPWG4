
import React, { useEffect, useState } from 'react';
import '../../assets/juego.css';
import type { Noticia } from '../data/noticias';

const Carousel: React.FC = () => {
  const [news, setNews] = useState<Noticia[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/news')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error('Error al obtener noticias:', err));
  }, []);

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {news.length === 0 ? (
          <div className="carousel-item active">
            <div className="d-flex justify-content-center align-items-center" style={{height: '300px', background: '#eee'}}>
              <span>No hay noticias para mostrar</span>
            </div>
          </div>
        ) : (
          news.map((item, idx) => (
            <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={item.id}>
              {/* @ts-ignore: El backend debe devolver el campo image en cada noticia */}
              <img src={item.image} className="d-block w-100" alt={item.title} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>{item.title}</h5>
                <p>{item.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carousel;
