
import { GoogleGenAI } from "@google/genai";

// --- GAME DATABASE ---
const GAMES_DATABASE = [
  {
    "id": "retro-bowl",
    "title": "Retro Bowl",
    "thumbnail": "https://images.unsplash.com/photo-1626021407447-ca631102946c?w=400&h=300&fit=crop",
    "url": "https://game312.github.io/retro-bowl/",
    "category": "Sports",
    "description": "Lead your football team to victory in this retro-style management masterpiece.",
    "tags": ["football", "sports", "retro"],
    "isHot": true
  },
  {
    "id": "slope",
    "title": "Slope",
    "thumbnail": "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=400&h=300&fit=crop",
    "url": "https://kdata1.com/2020/05/slope/",
    "category": "Action",
    "description": "Speed down neon slopes, avoid obstacles, and keep your ball on the track.",
    "tags": ["3d", "speed", "reflex"],
    "isHot": true
  },
  {
    "id": "subway-surfers",
    "title": "Subway Surfers",
    "thumbnail": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=300&fit=crop",
    "url": "https://games.poki.com/458741/653289",
    "category": "Action",
    "description": "The world-famous endless runner. Dodge trains and escape the inspector!",
    "tags": ["runner", "classic", "popular"],
    "isHot": true
  },
  {
    "id": "1v1-lol",
    "title": "1v1.LOL",
    "thumbnail": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    "url": "https://1v1.lol/",
    "category": "Action",
    "description": "Build, edit, and shoot in this competitive multiplayer battle royale trainer.",
    "tags": ["shooter", "building", "multiplayer"],
    "isHot": true
  },
  {
    "id": "temple-run-2",
    "title": "Temple Run 2",
    "thumbnail": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop",
    "url": "https://games.poki.com/458741/temple-run-2",
    "category": "Action",
    "description": "Escape from the demon monkeys in this legendary sequel to the classic runner.",
    "tags": ["runner", "classic"],
    "isNew": true
  },
  {
    "id": "bitlife",
    "title": "BitLife",
    "thumbnail": "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=300&fit=crop",
    "url": "https://bitlifeonline.io/",
    "category": "Other",
    "description": "Live a thousand lives. Your choices define your destiny in this text-based simulator.",
    "tags": ["simulation", "text-based"],
    "isNew": true
  },
  {
    "id": "run-3",
    "title": "Run 3",
    "thumbnail": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
    "url": "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/bobydigital/run3@main/run3.xml",
    "category": "Action",
    "description": "Defy gravity in space tunnels. A classic school favorite.",
    "tags": ["gravity", "space", "runner"]
  },
  {
    "id": "moto-x3m",
    "title": "Moto X3M",
    "thumbnail": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=300&fit=crop",
    "url": "https://motox3m.co/",
    "category": "Sports",
    "description": "Perform insane stunts and beat the timer on deadly tracks.",
    "tags": ["bike", "stunts", "physics"]
  },
  {
    "id": "basketball-stars",
    "title": "Basketball Stars",
    "thumbnail": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    "url": "https://games.poki.com/458741/basketball-stars",
    "category": "Sports",
    "description": "Dunk on your friends in this competitive 2D basketball game.",
    "tags": ["basketball", "2-player", "sports"],
    "isHot": true
  },
  {
    "id": "minecraft-eagler",
    "title": "Minecraft (Eagler)",
    "thumbnail": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    "url": "https://eaglercraft.com/mc/1.8.8/",
    "category": "Retro",
    "description": "The full 1.8.8 experience, including survival and creative modes, in your browser.",
    "tags": ["minecraft", "sandbox", "survival"],
    "isHot": true
  },
  {
    "id": "basket-random",
    "title": "Basket Random",
    "thumbnail": "https://images.unsplash.com/photo-1519861531158-28636435014a?w=400&h=300&fit=crop",
    "url": "https://www.twoplayergames.org/embed/basket-random",
    "category": "Sports",
    "description": "Wacky basketball with one-button controls and unpredictable physics.",
    "tags": ["funny", "2-player", "pixel"]
  },
  {
    "id": "tunnel-rush",
    "title": "Tunnel Rush",
    "thumbnail": "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&h=300&fit=crop",
    "url": "https://tunnelrush.io/",
    "category": "Action",
    "description": "Dodge spinning obstacles at high speed in this neon tunnel.",
    "tags": ["speed", "neon", "reflex"]
  },
  {
    "id": "cookie-clicker",
    "title": "Cookie Clicker",
    "thumbnail": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    "url": "https://orteil.dashnet.org/cookieclicker/",
    "category": "Other",
    "description": "Bake billions of cookies and upgrade your empire in the ultimate idle game.",
    "tags": ["idle", "clicker", "upgrade"]
  },
  {
    "id": "paper-io-2",
    "title": "Paper.io 2",
    "thumbnail": "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=300&fit=crop",
    "url": "https://paper-io.com/",
    "category": "Action",
    "description": "Conquer as much territory as possible. Don't let others hit your tail!",
    "tags": ["multiplayer", "io", "strategy"]
  },
  {
    "id": "smash-karts",
    "title": "Smash Karts",
    "thumbnail": "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=400&h=300&fit=crop",
    "url": "https://smashkarts.io/",
    "category": "Action",
    "description": "Kart racing with a explosive twist. Battle players online in 3D arena.",
    "tags": ["kart", "battle", "online"],
    "isHot": true
  },
  {
    "id": "geometry-dash",
    "title": "Geometry Dash",
    "thumbnail": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    "url": "https://scratch.mit.edu/projects/105500895/embed",
    "category": "Action",
    "description": "Jump and fly through danger in this rhythm-based action platformer.",
    "tags": ["rhythm", "platformer", "difficult"],
    "isNew": true
  },
  {
    "id": "eggy-car",
    "title": "Eggy Car",
    "thumbnail": "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop",
    "url": "https://eggycar.org/",
    "category": "Other",
    "description": "Drive a car with an egg in it. How far can you get without breaking it?",
    "tags": ["physics", "casual", "funny"],
    "isNew": true
  }
];

// --- STATE MANAGEMENT ---
const state = {
  currentCategory: 'All',
  searchQuery: '',
  favorites: JSON.parse(localStorage.getItem('gv-favorites') || '[]'),
  isStealth: false,
  currentGame: null as any
};

const CATEGORIES = [
  { name: 'All', icon: 'fa-rocket' },
  { name: 'Action', icon: 'fa-fire-alt' },
  { name: 'Puzzle', icon: 'fa-puzzle-piece' },
  { name: 'Strategy', icon: 'fa-chess-knight' },
  { name: 'Sports', icon: 'fa-basketball-ball' },
  { name: 'Retro', icon: 'fa-gamepad' },
  { name: 'Other', icon: 'fa-cubes' }
];

// --- DOM ELEMENTS CACHE ---
interface AppElements {
  gamesGrid: HTMLElement | null;
  favsGrid: HTMLElement | null;
  favsSection: HTMLElement | null;
  categoryList: HTMLElement | null;
  searchInput: HTMLInputElement | null;
  stealthToggle: HTMLElement | null;
  dashboardView: HTMLElement | null;
  playerView: HTMLElement | null;
  gameIframe: HTMLIFrameElement | null;
  backButton: HTMLElement | null;
  navLogo: HTMLElement | null;
  gameCountDisplay: HTMLElement | null;
  collectionTitle: HTMLElement | null;
  noResults: HTMLElement | null;
  playingTitle: HTMLElement | null;
  playingDescription: HTMLElement | null;
  playerFavToggle: HTMLElement | null;
  fullscreenBtn: HTMLElement | null;
  gameLoader: HTMLElement | null;
  favicon: HTMLLinkElement | null;
  suggestBtn: HTMLElement | null;
}

let elements: AppElements = {
  gamesGrid: null,
  favsGrid: null,
  favsSection: null,
  categoryList: null,
  searchInput: null,
  stealthToggle: null,
  dashboardView: null,
  playerView: null,
  gameIframe: null,
  backButton: null,
  navLogo: null,
  gameCountDisplay: null,
  collectionTitle: null,
  noResults: null,
  playingTitle: null,
  playingDescription: null,
  playerFavToggle: null,
  fullscreenBtn: null,
  gameLoader: null,
  favicon: null,
  suggestBtn: null
};

function cacheElements() {
  elements = {
    gamesGrid: document.getElementById('games-grid'),
    favsGrid: document.getElementById('favorites-grid'),
    favsSection: document.getElementById('favorites-section'),
    categoryList: document.getElementById('category-list'),
    searchInput: document.getElementById('search-input') as HTMLInputElement,
    stealthToggle: document.getElementById('stealth-toggle'),
    dashboardView: document.getElementById('dashboard-view'),
    playerView: document.getElementById('player-view'),
    gameIframe: document.getElementById('game-iframe') as HTMLIFrameElement,
    backButton: document.getElementById('back-button'),
    navLogo: document.getElementById('nav-logo'),
    gameCountDisplay: document.getElementById('game-count'),
    collectionTitle: document.getElementById('collection-title'),
    noResults: document.getElementById('no-results'),
    playingTitle: document.getElementById('playing-title'),
    playingDescription: document.getElementById('playing-description'),
    playerFavToggle: document.getElementById('player-fav-toggle'),
    fullscreenBtn: document.getElementById('fullscreen-button'),
    gameLoader: document.getElementById('game-loader'),
    favicon: document.getElementById('favicon') as HTMLLinkElement,
    suggestBtn: document.getElementById('suggest-game-btn')
  };
}

// --- GEMINI INTELLIGENCE ---
async function suggestGame() {
  if (!elements.suggestBtn) return;
  const originalText = elements.suggestBtn.innerHTML;
  elements.suggestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
  
  try {
    // Correct initialization: always use new GoogleGenAI({apiKey: process.env.API_KEY})
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const gameTitles = GAMES_DATABASE.map(g => g.title).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `From this list: ${gameTitles}, pick exactly one game title that is popular with students. Output ONLY the title.`,
    });

    const suggestion = response.text?.trim() || 'Retro Bowl';
    const game = GAMES_DATABASE.find(g => suggestion.toLowerCase().includes(g.title.toLowerCase())) || GAMES_DATABASE[0];
    
    elements.suggestBtn.innerHTML = `<i class="fas fa-magic"></i> Launching ${game.title}...`;
    setTimeout(() => {
      launchGame(game.id);
      elements.suggestBtn!.innerHTML = originalText;
    }, 800);

  } catch (error) {
    console.error("Gemini Suggestion Failed:", error);
    elements.suggestBtn.innerHTML = originalText;
    const randomGame = GAMES_DATABASE[Math.floor(Math.random() * GAMES_DATABASE.length)];
    launchGame(randomGame.id);
  }
}

// --- RENDER FUNCTIONS ---
function renderCategories() {
  if (!elements.categoryList) return;
  elements.categoryList.innerHTML = CATEGORIES.map(cat => `
    <button
      data-category="${cat.name}"
      class="cat-btn flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group w-full ${
        state.currentCategory === cat.name 
          ? 'cat-btn-active shadow-indigo-500/20 shadow-lg' 
          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
      }"
    >
      <i class="fas ${cat.icon} w-5 text-center text-lg transition-transform group-hover:scale-110"></i>
      <span class="font-bold text-sm hidden md:block">${cat.name}</span>
    </button>
  `).join('');

  document.querySelectorAll('.cat-btn').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      state.currentCategory = (btn as HTMLElement).dataset.category || 'All';
      renderCategories();
      renderGames();
      showDashboard();
    };
  });
}

function renderGames() {
  if (!elements.gamesGrid) return;

  const filtered = GAMES_DATABASE.filter(game => {
    const q = state.searchQuery.toLowerCase();
    const matchesSearch = game.title.toLowerCase().includes(q) || 
                         game.category.toLowerCase().includes(q) ||
                         game.tags.some(t => t.toLowerCase().includes(q));
    const matchesCategory = state.currentCategory === 'All' || game.category === state.currentCategory;
    return matchesSearch && matchesCategory;
  });

  const favorites = GAMES_DATABASE.filter(g => state.favorites.includes(g.id));

  // Update Library Grid
  elements.gamesGrid.innerHTML = filtered.map(game => createGameCard(game)).join('');
  
  if (filtered.length === 0) {
    elements.noResults?.classList.remove('hidden');
  } else {
    elements.noResults?.classList.add('hidden');
  }

  // Update Favorites Section
  if (elements.favsSection && elements.favsGrid) {
    if (favorites.length > 0 && state.currentCategory === 'All' && state.searchQuery === '') {
      elements.favsSection.classList.remove('hidden');
      elements.favsGrid.innerHTML = favorites.map(game => createGameCard(game)).join('');
    } else {
      elements.favsSection.classList.add('hidden');
    }
  }

  // Update Status Displays
  if (elements.gameCountDisplay) {
    elements.gameCountDisplay.innerHTML = `<span class="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>${filtered.length} Games Available`;
    elements.gameCountDisplay.classList.remove('animate-pulse');
  }
  if (elements.collectionTitle) {
    elements.collectionTitle.innerHTML = `<div class="w-2 h-8 bg-indigo-500 rounded-full"></div> ${state.currentCategory === 'All' ? 'Best Unblocked Games' : state.currentCategory}`;
  }

  attachCardListeners();
}

function createGameCard(game: any) {
  const isFav = state.favorites.includes(game.id);
  const badge = game.isHot ? '<span class="absolute top-3 left-3 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-lg z-10 uppercase tracking-tighter shadow-sm">Hot</span>' : 
               game.isNew ? '<span class="absolute top-3 left-3 px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-lg z-10 uppercase tracking-tighter shadow-sm">New</span>' : '';
  
  return `
    <div class="game-card group relative bg-slate-800/30 rounded-3xl overflow-hidden border border-slate-700/40 hover:border-indigo-500/60 transition-all duration-500 shadow-lg" data-id="${game.id}">
      <div class="aspect-[4/3] relative overflow-hidden">
        ${badge}
        <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        <div class="play-overlay absolute inset-0 bg-indigo-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
            <i class="fas fa-play text-indigo-600 ml-1 text-2xl"></i>
          </div>
        </div>
        <button class="fav-btn absolute top-3 right-3 w-10 h-10 rounded-xl bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 transition-colors z-20">
          <i class="${isFav ? 'fas text-rose-400' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start mb-1">
          <h3 class="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors truncate">${game.title}</h3>
        </div>
        <p class="text-[10px] text-slate-400 font-medium uppercase tracking-widest">${game.category}</p>
      </div>
    </div>
  `;
}

// --- FIXES: IMPLEMENTING MISSING FUNCTIONS ---

// Fix: Implemented launchGame to handle view switching and iframe loading
function launchGame(gameId: string) {
  const game = GAMES_DATABASE.find(g => g.id === gameId);
  if (!game || !elements.playerView || !elements.dashboardView || !elements.gameIframe) return;

  state.currentGame = game;
  
  if (elements.playingTitle) elements.playingTitle.innerText = game.title;
  if (elements.playingDescription) elements.playingDescription.innerText = game.description;
  
  if (elements.gameLoader) elements.gameLoader.classList.remove('hidden');
  elements.gameIframe.src = game.url;
  
  elements.gameIframe.onload = () => {
    if (elements.gameLoader) elements.gameLoader.classList.add('hidden');
  };

  elements.dashboardView.classList.add('hidden');
  elements.playerView.classList.remove('hidden');
  
  updatePlayerFavButton();
  window.scrollTo(0, 0);
}

// Fix: Implemented showDashboard to return from player to library view
function showDashboard() {
  if (!elements.dashboardView || !elements.playerView || !elements.gameIframe) return;
  
  state.currentGame = null;
  elements.gameIframe.src = '';
  
  elements.playerView.classList.add('hidden');
  elements.dashboardView.classList.remove('hidden');
}

// Fix: Implemented attachCardListeners to assign click events to game cards
function attachCardListeners() {
  document.querySelectorAll('.game-card').forEach(card => {
    const id = (card as HTMLElement).dataset.id;
    if (!id) return;

    card.querySelector('.play-overlay')?.addEventListener('click', () => launchGame(id));
    card.querySelector('.fav-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(id);
    });
  });
}

function toggleFavorite(id: string) {
  const index = state.favorites.indexOf(id);
  if (index > -1) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push(id);
  }
  localStorage.setItem('gv-favorites', JSON.stringify(state.favorites));
  renderGames();
  updatePlayerFavButton();
}

function updatePlayerFavButton() {
  if (!elements.playerFavToggle || !state.currentGame) return;
  const isFav = state.favorites.includes(state.currentGame.id);
  elements.playerFavToggle.innerHTML = isFav 
    ? '<i class="fas fa-heart text-rose-500"></i> Saved' 
    : '<i class="far fa-heart"></i> Save Game';
}

function toggleStealth() {
  state.isStealth = !state.isStealth;
  if (state.isStealth) {
    document.title = "My Drive - Google Drive";
    if (elements.favicon) elements.favicon.href = "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";
    elements.stealthToggle?.classList.add('text-indigo-500');
  } else {
    document.title = "GameVault | Unblocked Hub";
    if (elements.favicon) elements.favicon.href = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=32&h=32&fit=crop";
    elements.stealthToggle?.classList.remove('text-indigo-500');
  }
}

function setupEventListeners() {
  if (elements.searchInput) {
    elements.searchInput.oninput = (e) => {
      state.searchQuery = (e.target as HTMLInputElement).value;
      renderGames();
    };
  }

  if (elements.backButton) {
    elements.backButton.onclick = showDashboard;
  }

  if (elements.navLogo) {
    elements.navLogo.onclick = showDashboard;
  }

  if (elements.suggestBtn) {
    elements.suggestBtn.onclick = suggestGame;
  }

  if (elements.stealthToggle) {
    elements.stealthToggle.onclick = toggleStealth;
  }

  if (elements.fullscreenBtn) {
    elements.fullscreenBtn.onclick = () => {
      if (elements.gameIframe?.requestFullscreen) {
        elements.gameIframe.requestFullscreen();
      }
    };
  }

  if (elements.playerFavToggle) {
    elements.playerFavToggle.onclick = () => {
      if (state.currentGame) toggleFavorite(state.currentGame.id);
    };
  }
}

// --- INITIALIZATION ---
window.onload = () => {
  cacheElements();
  renderCategories();
  renderGames();
  setupEventListeners();
};
