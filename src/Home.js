import PageList from './PageList.js';

const Home = () => {
  const pageContent = document.getElementById('pageContent');

  pageContent.innerHTML = `
    <div class="header-bar">
      <h1 id="homeTitle">The Hyper Program</h1>
      <form id="searchForm">
        <input type="text" id="searchInput" placeholder="Rechercher un jeu..." />
      </form>
    </div>
    <h2>Welcome,</h2>
    <p>The Hyper Progame is the world's premier event for computer and video games and related products. At The Hyper Progame, the video game industry's top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
    <div id="filtersWrapper"></div>
  `;

  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query.length > 0) {
        window.location.hash = `#pagelist/search=${encodeURIComponent(query)}`;
        searchInput.value = '';
      }
    });
  }

  const homeTitle = document.getElementById('homeTitle');
  if (homeTitle) {
    homeTitle.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/';
    });
  }

  PageList('ordering=-released');
};

export default Home;
