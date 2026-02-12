
/**
 * GABRIEL VILLAGE APP LOGIC
 * Vanilla JS Implementation
 */

// State Management
const state = {
  currentCategory: 'All',
  searchQuery: '',
  favorites: JSON.parse(localStorage.getItem('gv-favorites') || '[]'),
  isStealth: false,
  currentGame: null
};

// Constants
const CATEGORIES = [
  { name: 'All', icon: 'fa-rocket' },
  { name: 'Action', icon: 'fa-fire-alt' },
  { name: 'Puzzle', icon: 'fa-puzzle-piece' },
  { name: 'Strategy', icon: 'fa-chess-knight' },
  { name: 'Sports', icon: 'fa-basketball-ball' },
  { name: 'Retro', icon: 'fa-gamepad' },
  { name: 'Other', icon: 'fa-cubes' }
];

// UI Selectors
const gamesGrid = document.getElementById('games-grid');
const favsGrid = document.getElementById('favorites-grid');
const favsSection = document.getElementById('favorites-section');
const categoryList = document.getElementById('category-list');
const searchInput = document.getElementById('search-input');
const stealthToggle = document.getElementById('stealth-toggle');
const dashboardView = document.getElementById('dashboard-view');
const playerView = document.getElementById('player-view');
const gameIframe = document.getElementById('game-iframe');
const backButton = document.getElementById('back-button');
const navLogo = document.getElementById('nav-logo');
const gameCountDisplay = document.getElementById('game-count');
const collectionTitle = document.getElementById('collection-title');
const noResults = document.getElementById('no-results');

// Initialization
function init() {
  renderCategories();
  renderGames();
  setupEventListeners();
  updateStealthUI();
}

// Render Categories in Sidebar
function renderCategories() {
  categoryList.innerHTML = CATEGORIES.map(cat => `
    <button
      data-category="${cat.name}"
      class="cat-btn flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group w-full ${
        state.currentCategory === cat.name 
          ? 'cat-btn-active' 
          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
      }"
    >
      <i class="fas ${cat.icon} w-5 text-center text-lg transition-transform group-hover:scale-110"></i>
      <span class="font-bold text-sm hidden md:block">${cat.name}</span>
    </button>
  `).join('');

  // Add click listeners to category buttons
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentCategory = btn.dataset.category;
      state.currentGame = null; // Return to dashboard if in player
      renderCategories();
      renderGames();
      showDashboard();
    });
  });
}

// Render Game Cards
function renderGames() {
  const filtered = GAMES_DATABASE.filter(game => {
    const q = state.searchQuery.toLowerCase();
    const matchesSearch = game.title.toLowerCase().includes(q) || 
                         game.category.toLowerCase().includes(q) ||
                         game.tags.some(t => t.toLowerCase().includes(q));
    const matchesCategory = state.currentCategory === 'All' || game.category === state.currentCategory;
    return matchesSearch && matchesCategory;
  });

  const favorites = GAMES_DATABASE.filter(g => state.favorites.includes(g.id));

  // Update Main Grid
  if (filtered.length === 0) {
    gamesGrid.innerHTML = '';
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
    gamesGrid.innerHTML = filtered.map(game => createGameCard(game)).join('');
  }

  // Update Favorites Section
  if (favorites.length > 0 && state.currentCategory === 'All' && state.searchQuery === '') {
    favsSection.classList.remove('hidden');
    favsGrid.innerHTML = favorites.map(game => createGameCard(game)).join('');
  } else {
    favsSection.classList.add('hidden');
  }

  // Update Stats
  gameCountDisplay.textContent = `Showing ${filtered.length} games`;
  collectionTitle.innerHTML = `<div class="w-2 h-8 bg-indigo-500 rounded-full"></div> ${state.currentCategory === 'All' ? 'Popular Games' : state.currentCategory + ' Collection'}`;

  attachCardListeners();
}

function createGameCard(game) {
  const isFav = state.favorites.includes(game.id);
  return `
    <div class="game-card group relative bg-slate-800/30 rounded-3xl overflow-hidden border border-slate-700/40 hover:border-indigo-500/60 transition-all duration-500 shadow-lg">
      <div class="aspect-[4/3] overflow-hidden relative">
        <img 
          src="${game.thumbnail}" 
          alt="${game.title}" 
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div class="play-overlay absolute inset-0 bg-slate-900/80 opacity-0 transition-all duration-300 flex flex-col items-center justify-center gap-4">
          <button 
            data-play-id="${game.id}"
            class="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-indigo-500 transition-all"
          >
            <i class="fas fa-play text-xl ml-1"></i>
          </button>
        </div>
        <button 
          data-fav-id="${game.id}"
          class="absolute top-3 right-3 w-10 h-10 rounded-xl glass flex items-center justify-center z-10 transition-all hover:scale-110 active:scale-95"
        >
          <i class="${isFav ? 'fas fa-heart text-red-500' : 'far fa-heart text-white'} text-lg"></i>
        </button>
      </div>
      <div class="p-5">
        <h3 class="font-extrabold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1 text-base">
          ${game.title}
        </h3>
        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">${game.category}</p>
      </div>
    </div>
  `;
}

function attachCardListeners() {
  // Play buttons
  document.querySelectorAll('[data-play-id]').forEach(btn => {
    btn.onclick = () => launchGame(btn.dataset.playId);
  });

  // Favorite buttons
  document.querySelectorAll('[data-fav-id]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.favId);
    };
  });
}

// Player Logic
function launchGame(id) {
  const game = GAMES_DATABASE.find(g => g.id === id);
  if (!game) return;

  state.currentGame = game;
  document.getElementById('playing-title').textContent = game.title;
  document.getElementById('playing-description').textContent = game.description;
  
  const favBtn = document.getElementById('player-fav-toggle');
  const isFav = state.favorites.includes(game.id);
  favBtn.innerHTML = `<i class="fas fa-heart ${isFav ? 'text-red-500' : ''}"></i> ${isFav ? 'Favorited' : 'Add Favorite'}`;
  favBtn.className = `px-4 py-2 rounded-xl flex items-center gap-2 font-medium border transition-all ${isFav ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`;
  favBtn.onclick = () => {
    toggleFavorite(game.id);
    launchGame(game.id); // Refresh button state
  };

  dashboardView.classList.add('hidden');
  playerView.classList.remove('hidden');
  document.getElementById('game-loader').classList.remove('hidden');
  gameIframe.src = game.url;

  gameIframe.onload = () => {
    document.getElementById('game-loader').classList.add('hidden');
  };

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDashboard() {
  state.currentGame = null;
  playerView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  gameIframe.src = '';
}

// Functionality
function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(fid => fid !== id);
  } else {
    state.favorites.push(id);
  }
  localStorage.setItem('gv-favorites', JSON.stringify(state.favorites));
  renderGames();
}

function updateStealthUI() {
  const favicon = document.getElementById('favicon');
  if (state.isStealth) {
    document.title = "Classes | Google Classroom";
    favicon.href = "https://ssl.gstatic.com/classroom/favicon.png";
    stealthToggle.innerHTML = '<i class="fas fa-user-secret"></i><span class="hidden md:inline">Stealth: ON</span>';
    stealthToggle.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
  } else {
    document.title = "Gabriel Village | Unblocked";
    favicon.href = "https://picsum.photos/32/32?random=50";
    stealthToggle.innerHTML = '<i class="fas fa-mask"></i><span class="hidden md:inline">Stealth Mode</span>';
    stealthToggle.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
  }
}

// Event Listeners
function setupEventListeners() {
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderGames();
  });

  stealthToggle.addEventListener('click', () => {
    state.isStealth = !state.isStealth;
    updateStealthUI();
  });

  backButton.addEventListener('click', showDashboard);
  navLogo.addEventListener('click', showDashboard);

  document.getElementById('fullscreen-button').addEventListener('click', () => {
    if (gameIframe.requestFullscreen) {
      gameIframe.requestFullscreen();
    } else if (gameIframe.webkitRequestFullscreen) {
      gameIframe.webkitRequestFullscreen();
    } else if (gameIframe.msRequestFullscreen) {
      gameIframe.msRequestFullscreen();
    }
  });
}

// Run the app
init();
