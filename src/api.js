const API_KEY = process.env.RAWG_API_KEY;

const fetchGames = async (queryParams = '') => {
  const baseURL = 'https://api.rawg.io/api/games';
  const url = `${baseURL}?key=${API_KEY}&${queryParams}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur API RAWG');
  const data = await res.json();
  return data;
};

const fetchGameDetails = async (slug) => {
  const baseURL = `https://api.rawg.io/api/games/${slug}`;
  const url = `${baseURL}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur API RAWG détail');
  const data = await res.json();
  return data;
};

export { fetchGames, fetchGameDetails };
