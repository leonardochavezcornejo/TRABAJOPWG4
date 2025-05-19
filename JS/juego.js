// Datos completos de todos los juegos
const games = [
  {
    title: "GTA VI",
    category: "Más vendidos",
    price: 59.99,
    description: "La última entrega de la famosa saga de Rockstar Games te sumerge en una ciudad abierta llena de posibilidades. Con gráficos revolucionarios y una historia llena de giros inesperados, GTA VI establece un nuevo estándar para los juegos de mundo abierto.",
    image: "/img/game1.jpg",
    images: [
      "/img/game1.jpg",
      "/img/game1_1.jpg",
      "/img/game1_2.jpeg"
    ],
    features: [
      "Mundo abierto masivo",
      "Historia no lineal",
      "Multijugador online",
      "Gráficos 4K"
    ]
  },
  {
    title: "Mortal Kombat 11",
    category: "Mejor valorados",
    price: 49.99,
    description: "La entrega más sangrienta y espectacular de la saga de lucha. Con nuevos personajes, fatalities brutales y un modo historia cinematográfico, Mortal Kombat 11 ofrece la experiencia de lucha definitiva.",
    image: "/img/game2.jpg",
    images: [
      "/img/game2.jpg",
      "/img/game2_1.jpg",
      "/img/game2_2.jpg"
    ],
    features: [
      "40+ personajes jugables",
      "Modo historia completo",
      "Gráficos hiperrealistas",
      "Personalización profunda"
    ]
  },
  {
    title: "Left 4 Dead 2",
    category: "Multijugador",
    price: 19.99,
    description: "Juego cooperativo de disparos en primera persona donde tú y tus amigos deberán sobrevivir a hordas de infectados. Con modos de juego variados y una IA director que adapta la experiencia.",
    image: "/img/game3.jpeg",
    images: [
      "/img/game3.jpeg",
      "/img/game3_1.jpg",
      "/img/game3_2.jpg"
    ],
    features: [
      "Cooperativo para 4 jugadores",
      "5 campañas diferentes",
      "Modo versus competitivo",
      "Sistema de IA Director 2.0"
    ]
  },
  {
    title: "The Witcher 3: Wild Hunt",
    category: "Mejor valorados",
    price: 39.99,
    description: "Como Geralt de Rivia, cazador de monstruos, viaja por un vasto mundo abierto para encontrar a tu ahijada Ciri y detener el avance de la Cacería Salvaje. Con decisiones que afectan la narrativa.",
    image: "/img/game4.jpg",
    images: [
      "/img/game4.jpg",
      "/img/game4_1.jpg",
      "/img/game4_2.jpg"
    ],
    features: [
      "Más de 100 horas de juego",
      "Sistema de combate complejo",
      "DLCs incluidos",
      "Mundo vivo con ciclos día/noche"
    ]
  },
  {
    title: "Cyberpunk 2077",
    category: "Acceso anticipado",
    price: 49.99,
    description: "Sumérgete en Night City, una megalópolis obsesionada con el poder, la moda y las modificaciones corporales. Como V, un mercenario fuera de la ley, busca un implante único que concede la inmortalidad.",
    image: "/img/game5.jpg",
    images: [
      "/img/game5.jpg",
      "/img/game5_1.jpg",
      "/img/game5_2.jpg"
    ],
    features: [
      "RPG de mundo abierto",
      "Historia no lineal",
      "Personalización de personaje",
      "Entorno futurista detallado"
    ]
  },
  {
    title: "Among Us",
    category: "Gratuitos",
    price: 0,
    description: "Juego de trabajo en equipo y traición para 4-15 jugadores. Prepárate tu nave espacial para despegar, pero cuidado con los impostores que quieren matar a todos.",
    image: "/img/game6.jpg",
    images: [
      "/img/game6.jpg",
      "/img/game6_1.jpg",
      "/img/game6_2.jpg"
    ],
    features: [
      "Multijugador online",
      "Personalización de personajes",
      "Chat de voz integrado",
      "Múltiples mapas"
    ]
  },
  {
    title: "Call of Duty: Warzone",
    category: "Multijugador",
    price: 0,
    description: "El battle royale gratuito de Call of Duty. Salta a Verdansk con hasta 150 jugadores y lucha por ser el último equipo en pie en este intenso shooter.",
    image: "/img/game7.jpg",
    images: [
      "/img/game7.jpg",
      "/img/game7_1.jpg",
      "/img/game7_2.jpg"
    ],
    features: [
      "Battle Royale gratuito",
      "Modo Plunder",
      "Sistema de compras en juego",
      "Integración con Modern Warfare"
    ]
  },
  {
    title: "Baldur's Gate 3",
    category: "Mejor valorados",
    price: 59.99,
    description: "RPG basado en D&D donde tus decisiones dan forma a una historia de compañerismo y traición, supervivencia y sacrificio, y la atracción de un poder absoluto.",
    image: "/img/game8.jpg",
    images: [
      "/img/game8.jpg",
      "/img/game8_1.jpg",
      "/img/game8_2.jpg"
    ],
    features: [
      "Sistema de combate por turnos",
      "Historia no lineal",
      "Cooperativo para 4 jugadores",
      "Miles de líneas de diálogo"
    ]
  },
  {
    title: "Hades",
    category: "Más vendidos",
    price: 24.99,
    description: "Roguelike de acción donde desafías al dios de la muerte mientras luchas para escapar del Inframundo. Cada intento revela más historia y te acerca a la libertad.",
    image: "/img/game9.jpg",
    images: [
      "/img/game9.jpg",
      "/img/game9_1.jpg",
      "/img/game9_2.jpg"
    ],
    features: [
      "Combate rápido y fluido",
      "Sistema de progresión permanente",
      "Narrativa profunda",
      "Arte estilo animado"
    ]
  },
  {
    title: "Stardew Valley",
    category: "Gratuitos",
    price: 14.99,
    description: "Hereda la vieja granja de tu abuelo y conviértela en un hogar próspero en este RPG de vida rural. Cultiva, pesca, mina, lucha contra monstruos y haz amigos con los aldeanos.",
    image: "/img/game10.jpg",
    images: [
      "/img/game10.jpg",
      "/img/game10_1.jpg",
      "/img/game10_2.jpg"
    ],
    features: [
      "Mundo abierto no lineal",
      "Más de 50 horas de juego",
      "Cooperativo para 4 jugadores",
      "Actualizaciones gratuitas"
    ]
  },

  {
    title: "R.E.P.O",
    category: "Más vendidos",
    price: 14.99,
    description: "Un juego de terror cooperativo en línea para hasta 6 jugadores. Localiza objetos valiosos, basados ​​completamente en la física, y manipúlalos con cuidado mientras los recuperas y los extraes para satisfacer los deseos de tu creador.",
    image: "/img/game11.jpg",
    images: [
      "/img/game11.jpg",
      "/img/game11_1.jpg",
      "/img/game11_2.gif"
    ],
    features: [
      "Mundo abierto no lineal",
      "Más de 50 horas de juego",
      "Cooperativo para 4 jugadores",
      "Actualizaciones gratuitas"
    ]
  },

  {

   title: "Dead by Daylight",
    category: "Mejor valorados",
    price: 39.99,
    description: "Dead by Daylight es un juego de horror de multijugador (4 contra 1) en el que un jugador representa el rol del asesino despiadado y los 4 restantes juegan como supervivientes que intentan escapar de él para evitar ser capturados y asesinados..",
    image: "/img/game12.jpg",
    images: [
      "/img/game12.jpg",
      "/img/game12_1.jpg",
      "/img/game12_2.gif"
    ],
    features: [
      "Mundo abierto no lineal",
      "Más de 50 horas de juego",
      "Cooperativo para 4 jugadores",
      "Actualizaciones gratuitas"
    ]
  }
];

// Base de datos completa de comentarios
const gameReviews = {
  "GTA VI": [
    {
      user: "JuanPérez",
      rating: 5,
      comment: "El mejor GTA hasta ahora. Los gráficos son increíbles y la ciudad se siente más viva que nunca. ¡La historia es adictiva!",
      date: "2023-05-15"
    },
    {
      user: "GamerPro",
      rating: 4,
      comment: "Muy bueno, pero los servidores online necesitan mejora. A veces hay lag en partidas multijugador.",
      date: "2023-06-20"
    },
    {
      user: "MariaGamer",
      rating: 5,
      comment: "Rockstar ha superado todas las expectativas. Los detalles en el mundo abierto son impresionantes. ¡100% recomendado!",
      date: "2023-07-10"
    }
  ],
  "Mortal Kombat 11": [
    {
      user: "FighterFan",
      rating: 5,
      comment: "Los fatalities son las mejores animaciones que he visto en un juego de lucha. ¡Brutal!",
      date: "2023-04-10"
    },
    {
      user: "KombatKing",
      rating: 4,
      comment: "Gran roster de personajes, aunque echo de menos algunos clásicos. El modo historia es excelente.",
      date: "2023-05-22"
    }
  ],
  "Left 4 Dead 2": [
    {
      user: "ZombieHunter",
      rating: 5,
      comment: "Después de tantos años sigue siendo el mejor juego cooperativo. Las partidas con amigos son épicas.",
      date: "2023-01-15"
    },
    {
      user: "Survivor",
      rating: 4,
      comment: "Divertido pero necesita una actualización gráfica. La comunidad sigue activa después de todos estos años.",
      date: "2023-03-18"
    }
  ],
  "The Witcher 3: Wild Hunt": [
    {
      user: "RPGMaster",
      rating: 5,
      comment: "Obra maestra absoluta. La historia, los personajes, el mundo... todo es perfecto. He jugado más de 200 horas.",
      date: "2023-02-05"
    },
    {
      user: "GeraltFan",
      rating: 5,
      comment: "El mejor RPG que he jugado. Las expansiones podrían ser juegos completos por sí mismas. CD Projekt RED es increíble.",
      date: "2023-04-30"
    }
  ],
  "Cyberpunk 2077": [
    {
      user: "CyberFan",
      rating: 4,
      comment: "Después de los parches, el juego cumple lo prometido. Night City es impresionante y la historia es envolvente.",
      date: "2023-06-12"
    },
    {
      user: "NetRunner",
      rating: 3,
      comment: "Mejoró mucho desde el lanzamiento, pero aún tiene bugs. La historia de Johnny Silverhand es lo mejor del juego.",
      date: "2023-07-25"
    }
  ],
  "Among Us": [
    {
      user: "ImpostorPro",
      rating: 5,
      comment: "Increíblemente divertido con amigos. Las partidas nunca son iguales y siempre hay mucha risa.",
      date: "2023-03-08"
    },
    {
      user: "Crewmate",
      rating: 4,
      comment: "Simple pero adictivo. Necesita más mapas y opciones de personalización para mantenerlo fresco.",
      date: "2023-05-17"
    }
  ],
  "Call of Duty: Warzone": [
    {
      user: "FPSPro",
      rating: 4,
      comment: "El mejor battle royale actualmente. El sistema de compras añade mucha estrategia. Caldera es un gran mapa.",
      date: "2023-04-05"
    },
    {
      user: "SniperKing",
      rating: 3,
      comment: "Buen juego pero el SBMM arruina la experiencia para jugadores casuales. Demasiados hackers últimamente.",
      date: "2023-06-30"
    }
  ],
  "Baldur's Gate 3": [
    {
      user: "RPGAddict",
      rating: 5,
      comment: "Larian ha capturado perfectamente la esencia de D&D. Las posibilidades son infinitas y la historia es fascinante.",
      date: "2023-08-12"
    },
    {
      user: "DnDFan",
      rating: 5,
      comment: "El sistema de combate por turnos es excelente. Los personajes tienen mucha profundidad y el mundo es enorme.",
      date: "2023-09-01"
    }
  ],
  "Hades": [
    {
      user: "RogueLikeLover",
      rating: 5,
      comment: "Juego perfecto. El combite es fluido, la música increíble y la progresión de la historia con cada intento es genial.",
      date: "2023-07-15"
    },
    {
      user: "ZagreusFan",
      rating: 5,
      comment: "Supergiant nunca decepciona. Arte, música, jugabilidad... todo es de 10. Uno de mis juegos favoritos de todos los tiempos.",
      date: "2023-08-20"
    }
  ],
  "Stardew Valley": [
    {
      user: "FarmLife",
      rating: 5,
      comment: "El juego más relajante que existe. Perfecto para desconectar después de un día estresante. ¡Amo mi granja!",
      date: "2023-02-28"
    },
    {
      user: "HarvestKing",
      rating: 5,
      comment: "Increíble que un solo desarrollador haya creado esto. Tiene más contenido que muchos juegos AAA. Absolutamente encantador.",
      date: "2023-05-10"
    }
  ],
  "R.E.P.O": [
    {
      user: "GamerX",
      rating: 5,
      comment: "Un juego de terror cooperativo increíble. La atmósfera es aterradora y la jugabilidad es adictiva.",
      date: "2023-09-15"
    },
    {
      user: "HorrorFan",
      rating: 4,
      comment: "Los gráficos son impresionantes y la historia es intrigante. Sin embargo, a veces puede ser un poco repetitivo.",
      date: "2023-09-20"
    }
  ],


  
}

// [El resto del código JavaScript permanece igual que en la respuesta anterior]

// Variables globales
let currentGame = null;
let currentRating = 0;

//parte jumi

let cartItems = [];

function addToCartFromModal() {
  if (!currentGame) return;

  const exists = cartItems.find(item => item.title === currentGame.title);
  if (!exists) {
    cartItems.push(currentGame);
    updateCartDisplay();
  }

  cartPanel.style.display = 'block';
}

function updateCartDisplay() {
  const content = document.getElementById('cartPanelContent');
  if (cartItems.length === 0) {
    content.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
    return;
  }

  let html = '<ul class="list-group mb-3">';
  cartItems.forEach((game, index) => {
    html += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${game.title}</strong>
          <br><small class="text-muted">$${game.price.toFixed(2)}</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
      </li>
    `;
  });
  html += '</ul>';

  const total = cartItems.reduce((sum, game) => sum + game.price, 0);
  html += `<div class="d-flex justify-content-between">
              <strong>Total:</strong> 
              <span class="fw-bold">$${total.toFixed(2)}</span>
           </div>`;

  content.innerHTML = html;
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartDisplay();
}

//fin parte jumi

// Cargar juegos al iniciar
document.addEventListener("DOMContentLoaded", () => {
  loadGames();
  document.getElementById("priceRange").value = 100;
});

// Función para cargar juegos
function loadGames(gamesToShow = games) {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";
  
  if (gamesToShow.length === 0) {
    grid.innerHTML = '<div class="col-12 text-center py-5"><h4>No se encontraron juegos</h4></div>';
    return;
  }
  
  gamesToShow.forEach((game, index) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 shadow-sm game-card" onclick="showGameDetails(${index})">
        <img src="${game.image}" class="card-img-top" alt="${game.title}">
        <div class="card-body">
          <h5 class="card-title">${game.title}</h5>
          <p class="card-text text-muted">${game.category}</p>
          <p class="card-text text-success fw-bold">$${game.price.toFixed(2)}</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Mostrar detalles del juego
function showGameDetails(index) {
  currentGame = games[index];
  const game = currentGame;
  
  // Configurar elementos del modal
  document.getElementById("gameTitle").textContent = game.title;
  document.getElementById("gameDescription").textContent = game.description;
  document.getElementById("mainImage").src = game.images[0];
  document.getElementById("gamePrice").textContent = `$${game.price.toFixed(2)}`;
  
  // Cargar miniaturas
  const thumbContainer = document.getElementById("thumbnails");
  thumbContainer.innerHTML = "";
  game.images.forEach((img, imgIndex) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.className = imgIndex === 0 ? "thumb active" : "thumb";
    thumb.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      document.getElementById("mainImage").src = img;
    };
    thumbContainer.appendChild(thumb);
  });
  
  // Cargar comentarios y valoraciones
  loadReviews(game.title);
  
  // Mostrar modal
  document.getElementById("gameModal").style.display = "flex";
  document.body.style.overflow = "hidden"; // Bloquear scroll de fondo
}

// Cargar comentarios
function loadReviews(gameTitle) {
  const reviewsContainer = document.getElementById("gameReviews");
  reviewsContainer.innerHTML = "";
  
  const reviews = gameReviews[gameTitle] || [];
  
  if (reviews.length === 0) {
    reviewsContainer.innerHTML = '<p class="text-muted">No hay comentarios aún. ¡Sé el primero en opinar!</p>';
    updateRatingDisplay(0, 0);
    return;
  }
  
  // Mostrar cada comentario
  reviews.forEach(review => {
    const reviewElement = document.createElement("div");
    reviewElement.className = "review-item";
    reviewElement.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <span class="review-user fw-bold">${review.user}</span>
        <small class="text-muted">${review.date}</small>
      </div>
      <div class="review-rating text-warning my-1">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
      <p class="review-text mb-0">${review.comment}</p>
    `;
    reviewsContainer.appendChild(reviewElement);
  });
  
  // Calcular y mostrar valoración promedio
  const averageRating = calculateAverageRating(reviews);
  updateRatingDisplay(averageRating, reviews.length);
}

// Calcular promedio de valoraciones
function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// Actualizar display de valoración
function updateRatingDisplay(average, count) {
  const roundedAverage = Math.round(average);
  const ratingElement = document.getElementById("gameRating");
  const valueElement = document.getElementById("ratingValue");
  
  ratingElement.innerHTML = "★".repeat(roundedAverage) + "☆".repeat(5 - roundedAverage);
  valueElement.textContent = `(${average.toFixed(1)} de ${count} ${count === 1 ? 'valoración' : 'valoraciones'})`;
}

// Valorar juego
function rateGame(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll(".star-rating .star");
  stars.forEach((star, index) => {
    star.textContent = index < rating ? "★" : "☆";
    star.classList.toggle("active", index < rating);
  });
}

// Enviar comentario
function submitReview() {
  if (!currentGame) return;
  
  const userName = document.getElementById("userName").value.trim();
  const userComment = document.getElementById("userComment").value.trim();
  
  if (!userName || !userComment) {
    alert("Por favor ingresa tu nombre y un comentario");
    return;
  }
  
  if (currentRating === 0) {
    alert("Por favor selecciona una valoración");
    return;
  }
  
  // Crear nuevo comentario
  const newReview = {
    user: userName,
    rating: currentRating,
    comment: userComment,
    date: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
  };
  
  // Agregar a la base de datos
  if (!gameReviews[currentGame.title]) {
    gameReviews[currentGame.title] = [];
  }
  gameReviews[currentGame.title].unshift(newReview); // Agregar al inicio
  
  // Recargar comentarios
  loadReviews(currentGame.title);
  
  // Limpiar formulario
  document.getElementById("userName").value = "";
  document.getElementById("userComment").value = "";
  currentRating = 0;
  document.querySelectorAll(".star-rating .star").forEach(star => {
    star.textContent = "☆";
    star.classList.remove("active");
  });
  
  // Mostrar confirmación
  alert("¡Gracias por tu comentario!");
}

// Ocultar detalles del juego
function hideGameDetails(event) {
  if (event.target === document.getElementById("gameModal")) {
    document.getElementById("gameModal").style.display = "none";
    document.body.style.overflow = "auto"; // Restaurar scroll
    currentGame = null;
  }
}

// Funciones de filtrado y búsqueda (mantenidas de la versión anterior)
function toggleSearch() {
  const panel = document.getElementById("searchPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
  document.getElementById("priceFilterPanel").style.display = "none";
}

function togglePriceFilter() {
  const panel = document.getElementById("priceFilterPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
  document.getElementById("searchPanel").style.display = "none";
}

function searchGames() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const price = parseInt(document.getElementById("priceRange").value);
  
  const filtered = games.filter(game => 
    game.title.toLowerCase().includes(query) && 
    game.price <= price
  );
  
  loadGames(filtered);
}

function filterByPrice() {
  const price = parseInt(document.getElementById("priceRange").value);
  document.getElementById("maxPrice").textContent = `$${price}`;
  
  const query = document.getElementById("searchInput").value.toLowerCase();
  
  const filtered = games.filter(game => 
    game.price <= price && 
    game.title.toLowerCase().includes(query)
  );
  
  loadGames(filtered);
}

function filterCategory(category) {
  const price = parseInt(document.getElementById("priceRange").value);
  const query = document.getElementById("searchInput").value.toLowerCase();
  
  let filtered = games;
  
  if (category !== "All") {
    filtered = games.filter(game => game.category === category);
  }
  
  filtered = filtered.filter(game => 
    game.price <= price && 
    game.title.toLowerCase().includes(query)
  );
  //-------------------------------------------------------
 

  

  
  loadGames(filtered);
}

//parte jumi

const cartOpenBtn = document.getElementById('cartOpenBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCartPanelBtn = document.getElementById('closeCartPanelBtn');


// Mostrar el panel al hacer clic en "Tu Carrito"
cartOpenBtn.addEventListener('click', function() {
    cartPanel.style.display = 'block';
    // Opcional: Oculta otros paneles como el de búsqueda si están abiertos
    const searchPanel = document.querySelector('.search-panel-selector'); // cambia esto si tienes un id/clase específica
    if (searchPanel) searchPanel.style.display = 'none';
});

// Ocultar el panel al hacer clic en "Cerrar"
closeCartPanelBtn.addEventListener('click', function() {
    cartPanel.style.display = 'none';
});

const confirmarPedidoBtn = document.getElementById('confirmarbtn');

confirmarPedidoBtn.addEventListener('click', function () {
    window.location.href = 'Facturacion.html'; 
});
