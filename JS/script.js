// Cambiar entre secciones al hacer clic en la barra lateral
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Quitar clase active de todos los links y ponerla solo en el clickeado
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Ocultar todas las secciones
    document.querySelectorAll('.admin-section').forEach(section => section.classList.add('d-none'));

    // Mostrar la sección correspondiente según texto del link (minusculas y sin espacios)
    let sectionId = this.textContent.toLowerCase().replace(/\s+/g, '');
    let section = document.getElementById(sectionId);

    if (section) {
      section.classList.remove('d-none');

      // Si la sección es estadísticas, inicializar gráficos
      if (sectionId === 'estadisticas') {
        initStats();
      }
    }
  });
});

// Abrir modal para editar noticia
function openEditNewsModal(id, title, content, row) {
  document.getElementById('editNewsId').value = id;
  document.getElementById('editNewsTitle').value = title;
  document.getElementById('editNewsContent').value = content;
  document.getElementById('editNewsModal').style.display = 'flex';

  // Guardar la fila actual en el formulario para actualizar luego
  document.getElementById('editNewsForm').dataset.currentRow = row.rowIndex;
}

// Abrir modal para confirmar eliminación
function openDeleteNewsConfirmModal(id, row) {
  document.getElementById('deleteNewsConfirmModal').style.display = 'flex';

  const btnConfirm = document.getElementById('confirmDeleteNewsBtn');

  // Cambiar evento para que elimine la fila en la tabla
  btnConfirm.onclick = function() {
    const table = document.querySelector('table tbody');
    table.deleteRow(row.rowIndex - 1);
    closeModal(null, 'deleteNewsConfirmModal');
  };
}

// Cerrar modal (si clic fuera del contenido o cancelar)
function closeModal(event, modalId) {
  if (!event || event.target.id === modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
}

// Manejar envío formulario editar noticia
document.getElementById('editNewsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('editNewsId').value;
  const title = document.getElementById('editNewsTitle').value;
  const content = document.getElementById('editNewsContent').value;

  const rowIndex = this.dataset.currentRow;
  if (rowIndex !== undefined) {
    const table = document.querySelector('table tbody');
    const row = table.rows[rowIndex - 1];
    if (row) {
      row.cells[0].textContent = title;
      // Si hay columna para contenido, también se puede actualizar
    }
  }

  closeModal(null, 'editNewsModal');
});

// Inicializar gráficos estadísticos
function initStats() {
  // Datos simulados
  const gameData = {
    'Aventura': 5,
    'Acción': 3,
    'Puzzle': 2,
    'Estrategia': 4,
  };

  const newsData = {
    'Enero': 2,
    'Febrero': 1,
    'Marzo': 3,
    'Abril': 2,
    'Mayo': 5,
  };

  // Evitar duplicar gráficos si ya existen
  if (window.gamesChart || window.newsChart) return;

  // Gráfico de Juegos por Categoría
  const ctxGames = document.getElementById('gamesByCategoryChart').getContext('2d');
  window.gamesChart = new Chart(ctxGames, {
    type: 'bar',
    data: {
      labels: Object.keys(gameData),
      datasets: [{
        label: 'Cantidad de Juegos',
        data: Object.values(gameData),
        backgroundColor: '#3f51b5',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Gráfico de Noticias por Mes
  const ctxNews = document.getElementById('newsByMonthChart').getContext('2d');
  window.newsChart = new Chart(ctxNews, {
    type: 'line',
    data: {
      labels: Object.keys(newsData),
      datasets: [{
        label: 'Noticias Publicadas',
        data: Object.values(newsData),
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        borderColor: '#3f51b5',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Código al cargar página
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar por defecto la sección Noticias
  document.querySelectorAll('.admin-section').forEach(section => section.classList.add('d-none'));
  const defaultSection = document.getElementById('noticias');
  if (defaultSection) defaultSection.classList.remove('d-none');

  // Activar el link de Noticias
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const newsLink = Array.from(document.querySelectorAll('.nav-link')).find(l => l.textContent.trim() === 'Noticias');
  if (newsLink) newsLink.classList.add('active');

  // Botones de editar y borrar noticias
  const table = document.querySelector('table tbody');
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const btnEdit = row.querySelector('.btn-primary');
    const btnDelete = row.querySelector('.btn-danger');

    btnEdit?.addEventListener('click', () => {
      openEditNewsModal(i + 1, row.cells[0].textContent, 'Contenido de ejemplo', row);
    });

    btnDelete?.addEventListener('click', () => {
      openDeleteNewsConfirmModal(i + 1, row);
    });
  }

  // Sección Juegos - Añadir juego
  document.getElementById('addGameBtn').addEventListener('click', () => {
    document.getElementById('addGameForm').reset();
    document.getElementById('addGameModal').style.display = 'flex';
  });

  document.getElementById('addGameForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('gameName').value;
    const category = document.getElementById('gameCategory').value;
    const releaseDate = document.getElementById('gameReleaseDate').value;

    const tableBody = document.getElementById('gamesTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${name}</td>
      <td>${category}</td>
      <td>${releaseDate}</td>
      <td>
        <button class="btn btn-sm btn-danger">Borrar</button>
      </td>
    `;

    row.querySelector('.btn-danger').addEventListener('click', () => {
      tableBody.removeChild(row);
    });

    tableBody.appendChild(row);
    closeModal(null, 'addGameModal');
  });

  // Filtrar juegos por nombre o categoría
  document.getElementById('filterGamesBtn').addEventListener('click', () => {
    const query = prompt('Filtrar por nombre o categoría:');
    const rows = document.querySelectorAll('#gamesTableBody tr');

    rows.forEach(row => {
      const name = row.cells[0].textContent.toLowerCase();
      const category = row.cells[1].textContent.toLowerCase();
      if (name.includes(query.toLowerCase()) || category.includes(query.toLowerCase())) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
  // Simular contador de usuarios
function actualizarContadorUsuarios() {
  const cantidadUsuarios = 12; // ← Puedes reemplazar con una variable real
  document.getElementById('userCount').textContent = cantidadUsuarios;
}
if (sectionId === 'usuarios') {
  actualizarContadorUsuarios();
}


});
