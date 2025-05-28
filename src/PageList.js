import { fetchGames } from './api.js';
import { platformIcons } from './icons.js';
import noImage from './assets/icons/no-image.jpg';

let currentPage = 1;
let totalShown = 0;
let currentFilter = '';
let currentSearch = '';

function renderPlatformIcons(platforms) {
  if (!platforms || platforms.length === 0) return '';

  const uniqueIcons = new Set();

  platforms.forEach(({ platform }) => {
    const match = platformIcons.find(p => p.match.test(platform.name));
    if (match) {
      uniqueIcons.add(match.icon);
    }
  });

  return `<div class="platform-icons">${[...uniqueIcons]
    .map(icon => `<img src="${icon}" alt="Platform" class="platform-icon" />`)
    .join('')}</div>`;
}

const PageList = async (argument = '') => {
  console.log('Page List', argument);

  currentPage = 1;
  totalShown = 0;
  currentFilter = '';
  currentSearch = '';

  let ordering = '-added';

  if (argument.startsWith('search=')) {
    currentSearch = argument.replace('search=', '');
  } else if (
    argument.startsWith('platform-') ||
    argument.startsWith('publisher-') ||
    argument.startsWith('developer-') ||
    argument.startsWith('genre-')
  ) {
    currentFilter = argument;
  } else if (argument.startsWith('ordering=')) {
    ordering = argument.replace('ordering=', '');
  }

  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  const endDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];

  // Vérifie ou crée dynamiquement le conteneur
  let filtersWrapper = document.getElementById('filtersWrapper');
  if (!filtersWrapper) {
    const pageContent = document.getElementById('pageContent');
    if (pageContent) {
      pageContent.innerHTML = '<div id="filtersWrapper"></div>';
      filtersWrapper = document.getElementById('filtersWrapper');
    } else {
      console.warn('Erreur : #pageContent introuvable.');
      return;
    }
  }

  filtersWrapper.innerHTML = '';

  const filtersContainer = document.createElement('div');
  filtersContainer.innerHTML = `
    <div class="platform-select-wrapper">
      <select id="platformSelect">
        <option value="">Platform : Any</option>
        <option value="4">PC</option>
        <option value="187">PlayStation 5</option>
        <option value="18">PlayStation 4</option>
        <option value="16">PlayStation 3</option>
        <option value="15">PlayStation 2</option>
        <option value="27">PlayStation</option>
        <option value="19">PS Vita</option>
        <option value="17">PSP</option>
        <option value="1">Xbox One</option>
        <option value="186">Xbox Series S/X</option>
        <option value="14">Xbox 360</option>
        <option value="80">Xbox</option>
        <option value="7">Nintendo Switch</option>
        <option value="8">Nintendo 3DS</option>
        <option value="9">Nintendo DS</option>
        <option value="13">Nintendo DSi</option>
        <option value="11">Wii</option>
        <option value="10">Wii U</option>
        <option value="3">iOS</option>
        <option value="21">Android</option>
        <option value="5">macOS</option>
        <option value="6">Linux</option>
        <option value="171">Web</option>
      </select>
    </div>
    <div id="gamesContainer" class="games-grid"></div>
    <button id="showMoreBtn">Show more</button>
  `;
  filtersWrapper.appendChild(filtersContainer);

  const gamesContainer = document.getElementById('gamesContainer');
  const showMoreBtn = document.getElementById('showMoreBtn');
  const platformSelect = document.getElementById('platformSelect');
  const searchInput = document.getElementById('searchInput');

  if (currentFilter.startsWith('platform-')) {
    const platformId = currentFilter.split('-')[1];
    platformSelect.value = platformId;
  }

  const loadGames = async () => {
    let query = `page_size=9&page=${currentPage}&ordering=${ordering}`;

    if (!currentSearch && !currentFilter.startsWith('platform-')) {
      query += `&dates=${startDate},${endDate}`;
    }

    if (currentFilter.startsWith('platform-')) {
      const platformId = currentFilter.split('-')[1];
      query += `&platforms=${platformId}`;
    } else if (currentFilter.startsWith('publisher-')) {
      const publisherId = currentFilter.split('-')[1];
      query += `&publishers=${publisherId}`;
    } else if (currentFilter.startsWith('developer-')) {
      const developerId = currentFilter.split('-')[1];
      query += `&developers=${developerId}`;
    } else if (currentFilter.startsWith('genre-')) {
      const genreId = currentFilter.split('-')[1];
      query += `&genres=${genreId}`;
    }

    if (currentSearch) {
      query += `&search=${encodeURIComponent(currentSearch)}`;
    }

    console.log('Query:', query);

    const data = await fetchGames(query);
    totalShown += data.results.length;

    data.results.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('game-card');

      card.innerHTML = `
        <div class="card-front">
          <img class="game-image" src="${game.background_image || noImage}" alt="${game.name}" />
          <h3>${game.name}</h3>
          <p>${renderPlatformIcons(game.platforms)}</p>
        </div>
        <div class="card-back">
          <p><strong>Sortie :</strong> ${game.released || 'N/A'}</p>
          <p><strong>Éditeur :</strong> ${game.publishers?.map(p => p.name).join(', ') || 'N/A'}</p>
          <p><strong>Note :</strong> ${game.rating || 'N/A'} (${game.ratings_count || 0} votes)</p>
          <p><strong>Genres :</strong> ${game.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
          ${renderPlatformIcons(game.platforms)}
          <p class="game-description">${game.short_description || 'Description non disponible'}</p>
          <h3 class="game-title">${game.name}</h3>
        </div>
      `;

      card.addEventListener('click', () => {
        window.location.hash = `#pagedetail/${game.slug}`;
      });

      gamesContainer.appendChild(card);
    });

    if (totalShown >= 27 || data.results.length < 9) {
      showMoreBtn.style.display = 'none';
    } else {
      showMoreBtn.style.display = 'block';
    }
  };

  showMoreBtn.addEventListener('click', () => {
    currentPage++;
    loadGames();
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      currentPage = 1;
      totalShown = 0;
      gamesContainer.innerHTML = '';
      loadGames();
    });
  }

  platformSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    currentFilter = value ? `platform-${value}` : '';
    currentPage = 1;
    totalShown = 0;
    gamesContainer.innerHTML = '';
    loadGames();
  });

  await loadGames();
};

export default PageList;
