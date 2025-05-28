import './index.scss';
import routes from './routes.js';

const app = document.getElementById('app');

const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

document.addEventListener('DOMContentLoaded', () => {
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
});

// Transition liens internes
window.addEventListener('hashchange', () => {
  const wrapper = document.getElementById('pageTransitionWrapper');
  if (wrapper) {
    wrapper.classList.remove('page-visible');
    void wrapper.offsetWidth;
    wrapper.classList.add('page-transition');
  }
});

window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());


