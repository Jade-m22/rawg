import { fetchGameDetails, fetchGames } from './api.js';

const PageDetail = async (slug) => {
  const pageContent = document.getElementById('pageContent');
  pageContent.innerHTML = '<h2>Chargement des détails...</h2>';

  try {
    const game = await fetchGameDetails(slug);

    pageContent.innerHTML = `
      <header class="header-bar">
        <div class="logo">
          <h1>The Hyper Program</h1>
        </div>
      </header>
      <main>
        <section class="game-detail">
          <div class="game-image-container">
            ${game.background_image ? `<img src="${game.background_image}" alt="${game.name}" class="game-image" />` : ''}
          </div>
          <div class="game-info">
            <h1>${game.name}</h1>
            <div class="game-rating">
              <span class="rating">${game.rating}</span>
              <span class="votes">(${game.ratings_count} votes)</span>
            </div>
            ${game.description_raw ? `<p class="description">${game.description_raw}</p>` : ''}
            ${game.developers.length ? `<p class="developers">Studios : ${game.developers.map(d => `<a href="#pagelist/developer-${d.id}" class="external-link">${d.name}</a>`).join(', ')}</p>` : ''}
            ${game.genres.length ? `<p class="genres">Genres : ${game.genres.map(g => `<a href="#pagelist/genre-${g.id}" class="external-link">${g.name}</a>`).join(', ')}</p>` : ''}
            ${game.publishers.length ? `<p class="publishers">Éditeur(s) : ${game.publishers.map(p => `<a href="#pagelist/publisher-${p.id}" class="external-link">${p.name}</a>`).join(', ')}</p>` : ''}
            ${game.platforms.length ? `<p class="platforms">Plateformes : ${game.platforms.map(p => `<a href="#pagelist/platform-${p.platform.id}" class="external-link">${p.platform.name}</a>`).join(', ')}</p>` : ''}
            ${game.website ? `<p class="website">Site officiel : <a href="${game.website}" target="_blank" class="external-link">${game.website}</a></p>` : ''}
            <h2>Gameplay</h2>
            ${game.clip ? `
              <video controls width="600">
                <source src="${game.clip.clips.full}" type="video/mp4">
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>` : ''}
          </div>
        </section>
        <section class="buy-links">
          <h1>Où acheter :</h1>
          ${game.stores && game.stores.length > 0 ? `<ul class="stores">${game.stores.map(store => `<li><a href="https://${store.store.domain}" target="_blank" class="external-link">${store.store.name}</a></li>`).join('')}</ul>` : ''}
        </section>
        <section class="screenshots">
          <h3>Screenshots</h3>
        </section>
        <section class="similar-games">
          <h3>Jeux similaires</h3>
        </section>
      </main>
    `;

    const screenshotsRes = await fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=${process.env.RAWG_API_KEY}`);
    const screenshotsData = await screenshotsRes.json();
    const screenshots = screenshotsData.results.slice(0, 4);

    if (screenshots.length) {
      const screenshotsSection = document.querySelector('.screenshots');
      screenshots.forEach(ss => {
        const img = document.createElement('img');
        img.src = ss.image;
        img.alt = "Screenshot du jeu";
        img.style.width = '200px';
        img.style.margin = '5px';
        screenshotsSection.appendChild(img);
      });
    }

    try {
      const genres = game.genres.map(g => g.id).join(',');
      const publishers = game.publishers.map(p => p.id).join(',');
      const similar = await fetchGames(`genres=${genres}&publishers=${publishers}&page_size=10`);

      const filtered = similar.results.filter(g => g.id !== game.id);

      if (filtered.length) {
        const similarSection = document.querySelector('.similar-games');
        filtered.slice(0, 4).forEach(simGame => {
          const card = document.createElement('div');
          card.classList.add('game-card', 'static-card');
          card.innerHTML = `
            <div class="card-front">
              <img src="${simGame.background_image}" alt="${simGame.name}" class="game-image"/>
              <h3>${simGame.name}</h3>
            </div>
          `;
          card.addEventListener('click', () => {
            window.location.hash = `#pagedetail/${simGame.slug}`;
          });
          similarSection.appendChild(card);
        });
      }
    } catch (err) {
      console.warn('Impossible de charger les jeux similaires personnalisés.', err);
    }

  } catch (error) {
    pageContent.innerHTML = `<p>Erreur lors du chargement : ${error.message}</p>`;
  }
};

export default PageDetail;
