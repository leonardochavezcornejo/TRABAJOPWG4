// Mostrar sección activa y ocultar las demás
function showSection(id) {
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.add('d-none');
  });
  document.getElementById(id).classList.remove('d-none');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = Array.from(document.querySelectorAll('.nav-link')).find(link =>
    link.textContent.trim().toLowerCase() === id
  );
  if (activeLink) activeLink.classList.add('active');

  if (id === 'usuarios') {
    updateUserCounter();
  } else if (id === 'estadisticas') {
    initStats();
  }
}

// Modales genéricos
function closeModal(event, modalId) {
  if (!event || event.target.id === modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
}

// ==== NOTICIAS ====
document.getElementById('addNewsBtn').addEventListener('click', () => {
  document.getElementById('addNewsForm').reset();
  document.getElementById('addNewsModal').style.display = 'flex';
});

document.getElementById('addNewsForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('newNewsTitle').value;
  const content = document.getElementById('newNewsContent').value;

  const table = document.querySelector('#noticias tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${title}</td>
    <td>${new Date().toLocaleDateString()}</td>
    <td>Publicada</td>
    <td>
      <button class="btn btn-sm btn-primary me-2" onclick="openEditNewsModal(0, '${title}', '${content}', this.closest('tr'))">Editar</button>
      <button class="btn btn-sm btn-danger" onclick="openDeleteNewsConfirmModal(0, this.closest('tr'))">Borrar</button>
    </td>
  `;
  table.appendChild(row);
  closeModal(null, 'addNewsModal');
});

function openEditNewsModal(id, title, content, row) {
  document.getElementById('editNewsId').value = id;
  document.getElementById('editNewsTitle').value = title;
  document.getElementById('editNewsContent').value = content;
  document.getElementById('editNewsForm').dataset.row = row.rowIndex;
  document.getElementById('editNewsModal').style.display = 'flex';
}

document.getElementById('editNewsForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const rowIndex = this.dataset.row;
  const table = document.querySelector('#noticias tbody');
  const row = table.rows[rowIndex - 1];

  row.cells[0].textContent = document.getElementById('editNewsTitle').value;
  closeModal(null, 'editNewsModal');
});

function openDeleteNewsConfirmModal(id, row) {
  document.getElementById('deleteNewsConfirmModal').style.display = 'flex';
  document.getElementById('confirmDeleteNewsBtn').onclick = function () {
    row.remove();
    closeModal(null, 'deleteNewsConfirmModal');
  };
}

// ==== JUEGOS ====
const games = [
  {
    title: "GTA VI",
    category: "Best Sellers",
    price: 59.99,
    description: "La última entrega de la famosa saga de Rockstar Games te sumerge en una ciudad abierta llena de posibilidades. Con gráficos revolucionarios y una historia llena de giros inesperados, GTA VI establece un nuevo estándar para los juegos de mundo abierto."
  },
  {
    title: "Mortal Kombat 11",
    category: "Top Rated",
    price: 49.99,
    description: "La entrega más sangrienta y espectacular de la saga de lucha. Con nuevos personajes, fatalities brutales y un modo historia cinematográfico, Mortal Kombat 11 ofrece la experiencia de lucha definitiva."
  },
  {
    title: "Left 4 Dead 2",
    category: "Multiplayer",
    price: 19.99,
    description: "Juego cooperativo de disparos en primera persona donde tú y tus amigos deberán sobrevivir a hordas de infectados. Con modos de juego variados y una IA director que adapta la experiencia."
  },
  {
    title: "The Witcher 3: Wild Hunt",
    category: "Top Rated",
    price: 39.99,
    description: "Como Geralt de Rivia, cazador de monstruos, viaja por un vasto mundo abierto para encontrar a tu ahijada Ciri y detener el avance de la Cacería Salvaje. Con decisiones que afectan la narrativa."
  },
  {
    title: "Cyberpunk 2077",
    category: "Early Access",
    price: 49.99,
    description: "Sumérgete en Night City, una megalópolis obsesionada con el poder, la moda y las modificaciones corporales. Como V, un mercenario fuera de la ley, busca un implante único que concede la inmortalidad."
  },
  {
    title: "Among Us",
    category: "Free to Play",
    price: 0,
    description: "Juego de trabajo en equipo y traición para 4-15 jugadores. Prepárate tu nave espacial para despegar, pero cuidado con los impostores que quieren matar a todos."
  },
  {
    title: "Call of Duty: Warzone",
    category: "Multiplayer",
    price: 0,
    description: "El battle royale gratuito de Call of Duty. Salta a Verdansk con hasta 150 jugadores y lucha por ser el último equipo en pie en este intenso shooter."
  },
  {
    title: "Baldur's Gate 3",
    category: "Top Rated",
    price: 59.99,
    description: "RPG basado en D&D donde tus decisiones dan forma a una historia de compañerismo y traición, supervivencia y sacrificio, y la atracción de un poder absoluto."
  },
  {
    title: "Hades",
    category: "Best Sellers",
    price: 24.99,
    description: "Roguelike de acción donde desafías al dios de la muerte mientras luchas para escapar del Inframundo. Cada intento revela más historia y te acerca a la libertad."
  },
  {
    title: "Stardew Valley",
    category: "Free to Play",
    price: 14.99,
    description: "Hereda la vieja granja de tu abuelo y conviértela en un hogar próspero en este RPG de vida rural. Cultiva, pesca, mina, lucha contra monstruos y haz amigos con los aldeanos."
  }
];

function renderTable() {
  const tbody = document.getElementById('gameTableBody');
  tbody.innerHTML = '';
  games.forEach((game, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${game.title}</td>
        <td>${game.category}</td>
        <td>$${game.price.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-primary me-2" onclick="openForm(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deleteGame(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function openForm(index = null) {
  const modal = new bootstrap.Modal(document.getElementById('gameModal'));
  document.getElementById('gameForm').reset();
  document.getElementById('gameIndex').value = '';

  if (index !== null) {
    const game = games[index];
    document.getElementById('title').value = game.title;
    document.getElementById('category').value = game.category;
    document.getElementById('price').value = game.price;
    document.getElementById('description').value = game.description;
    document.getElementById('gameIndex').value = index;
    document.getElementById('gameModalLabel').textContent = 'Editar Juego';
  } else {
    document.getElementById('gameModalLabel').textContent = 'Agregar Juego';
  }

  modal.show();
}

function saveGame(event) {
  event.preventDefault();
  const index = document.getElementById('gameIndex').value;
  const game = {
    title: document.getElementById('title').value.trim(),
    category: document.getElementById('category').value.trim(),
    price: parseFloat(document.getElementById('price').value),
    description: document.getElementById('description').value.trim()
  };

  if (index === '') {
    games.push(game);
  } else {
    games[index] = game;
  }

  bootstrap.Modal.getInstance(document.getElementById('gameModal')).hide();
  renderTable();
}

function deleteGame(index) {
  if (confirm('¿Estás seguro de eliminar este juego?')) {
    games.splice(index, 1);
    renderTable();
  }
}

window.onload = renderTable;


// ==== CONTADOR USUARIOS ====
function updateUserCounter() {
  const fakeUserCount = 12; // Cambiar si quieres conectar con datos reales
  document.getElementById('userCount').textContent = fakeUserCount;
}

// ==== ESTADÍSTICAS ====
function initStats() {
  if (window.gamesChart || window.newsChart) return;

  const gameData = { 'Acción': 3, 'Aventura': 2, 'Puzzle': 1, 'RPG': 4 };
  const newsData = { 'Enero': 2, 'Febrero': 1, 'Marzo': 3, 'Abril': 2, 'Mayo': 4 };

  const ctxGames = document.getElementById('gamesByCategoryChart').getContext('2d');
  window.gamesChart = new Chart(ctxGames, {
    type: 'bar',
    data: {
      labels: Object.keys(gameData),
      datasets: [{
        label: 'Cantidad de Juegos',
        data: Object.values(gameData),
        backgroundColor: '#3f51b5'
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  const ctxNews = document.getElementById('newsByMonthChart').getContext('2d');
  window.newsChart = new Chart(ctxNews, {
    type: 'line',
    data: {
      labels: Object.keys(newsData),
      datasets: [{
        label: 'Noticias por Mes',
        data: Object.values(newsData),
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        borderColor: '#3f51b5',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

// ==== Inicialización al cargar ====
document.addEventListener('DOMContentLoaded', () => {
  showSection('noticias'); // Sección por defecto
});
