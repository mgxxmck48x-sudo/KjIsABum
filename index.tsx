
import { GoogleGenAI } from "@google/genai";

// --- GAME DATABASE ---
// Using verified iframe-friendly mirrors to minimize "black screen" or "refused to connect" errors.
const GAMES_DATABASE = [
  {
    "id": "retro-bowl",
    "title": "Retro Bowl",
    "thumbnail": "https://images.unsplash.com/photo-1626021407447-ca631102946c?w=400&h=300&fit=crop",
    "url": "https://game312.github.io/retro-bowl/",
    "category": "Sports",
    "description": "The ultimate retro-style American football management game. Lead your team to glory!",
    "tags": ["football", "sports", "retro", "popular"],
    "isHot": true
  },
  {
    "id": "slope",
    "title": "Slope",
    "thumbnail": "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=400&h=300&fit=crop",
    "url": "https://kdata1.com/2020/05/slope/",
    "category": "Action",
    "description": "Control a ball rolling down a steep slope. Avoid obstacles and don't fall off!",
    "tags": ["action", "3d", "speed"],
    "isHot": true
  },
  {
    "id": "subway-surfers",
    "title": "Subway Surfers",
    "thumbnail": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=300&fit=crop",
    "url": "https://poki.com/en/g/subway-surfers",
    "category": "Action",
    "description": "Dash as fast as you can! Dodge the oncoming trains!",
    "tags": ["runner", "action", "classic"],
    "isHot": true
  },
  {
    "id": "1v1-lol",
    "title": "1v1.LOL",
    "thumbnail": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    "url": "https://1v1.lol/",
    "category": "Action",
    "description": "Competitive third-person shooter with building mechanics. Practice your 1v1 skills.",
    "tags": ["shooter", "building", "multiplayer"],
    "isHot": true
  },
  {
    "id": "temple-run-2",
    "title": "Temple Run 2",
    "thumbnail": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop",
    "url": "https://poki.com/en/g/temple-run-2",
    "category": "Action",
    "description": "Navigate perilous cliffs, zip lines, mines and forests as you try to escape with the cursed idol.",
    "tags": ["runner", "action"],
    "isNew": true
  },
  {
    "id": "bitlife",
    "title": "BitLife",
    "thumbnail": "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=300&fit=crop",
    "url": "https://bitlifeonline.io/",
    "category": "Other",
    "description": "A life simulator where you make choices from birth to death. Who will you become?",
    "tags": ["simulation", "life", "text-based"],
    "isNew": true
  },
  {
    "id": "run-3",
    "title": "Run 3",
    "thumbnail": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
    "url": "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/bobydigital/run3@main/run3.xml",
    "category": "Action",
    "description": "Run and jump through space tunnels. Gravity shifts as you move around the walls.",
    "tags": ["action", "space", "runner"]
  },
  {
    "id": "moto-x3m",
    "title": "Moto X3M",
    "thumbnail": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=300&fit=crop",
    "url": "https://motox3m.co/",
    "category": "Sports",
    "description": "Extreme bike stunts and racing. Beat the timer and avoid deadly traps.",
    "tags": ["racing", "bike", "stunts"]
  },
  {
    "id": "basketball-stars",
    "title": "Basketball Stars",
    "thumbnail": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    "url": "https://poki.com/en/g/basketball-stars",
    "category": "Sports",
    "description": "Play as the best basketball stars in the world in this fast-paced 2D game.",
    "tags": ["sports", "basketball", "2-player"],
    "isHot": true
  },
  {
    "id": "minecraft-eagler",
    "title": "Minecraft (Eagler)",
    "thumbnail": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    "url": "https://eaglercraft.com/mc/1.8.8/",
    "category": "Retro",
    "description": "Full browser-based Minecraft 1.8.8. Survival and Creative modes.",
    "tags": ["survival", "creative", "sandbox"],
    "isHot": true
  },
  {
    "id": "basket-random",
    "title": "Basket Random",
    "thumbnail": "https://images.unsplash.com/photo-1519861531158-28636435014a?w=400&h=300&fit=crop",
    "url": "https://www.twoplayergames.org/embed/basket-random",
    "category": "Sports",
    "description": "Wacky basketball with ragdoll physics. Simple controls, infinite fun.",
    "tags": ["sports", "2-player", "physics"]
  },
  {
    "id": "tunnel-rush",
    "title": "Tunnel Rush",
    "thumbnail": "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&h=300&fit=crop",
    "url": "https://tunnelrush.io/",
    "category": "Action",
    "description": "High-speed neon tunnel runner. Test your reflexes to the limit.",
    "tags": ["action", "speed", "neon"]
  },
  {
    "id": "cookie-clicker",
    "title": "Cookie Clicker",
    "thumbnail": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    "url": "https://orteil.dashnet.org/cookieclicker/",
    "category": "Other",
    "description": "The original idle game. Click cookies, buy grandmas, and rule the world.",
    "tags": ["clicker", "idle", "addictive"]
  },
  {
    "id": "paper-io-2",
    "title": "Paper.io 2",
    "thumbnail": "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=300&fit=crop",
    "url": "https://paper-io.com/",
    "category": "Action",
    "description": "Claim territory by drawing paths. Don't let others hit your trail!",
    "tags": ["multiplayer", "io", "strategy"]
  },
  {
    "id": "smash-karts",
    "title": "Smash Karts",
    "thumbnail": "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=400&h=300&fit=crop",
    "url": "https://smashkarts.io/",
    "category": "Action",
    "description": "3D kart battle game. Pick up power-ups and blast your friends!",
    "tags": ["multiplayer", "kart", "3d"],
    "isHot": true
  },
  {
    "id": "chess",
    "title": "Chess.com",
    "thumbnail": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
    "url": "https://www.chess.com/play/online",
    "category": "Strategy",
    "description": "Play the world's #1 strategy game online against players or bots.",
    "tags": ["strategy", "board", "educational"]
  },
  {
    "id": "tetris",
    "title": "Tetris",
    "thumbnail": "https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?w=400&h=300&fit=crop",
    "url": "https://tetris.com/play-tetris",
    "category": "Retro",
    "description": "The classic block-stacking puzzle. Clear lines to score high.",
    "tags": ["puzzle", "retro", "classic"]
  },
  {
    "id": "vex-5",
    "title": "Vex 5",
    "thumbnail": "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop",
    "url": "https://vex5.io/",
    "category": "Action",
    "description": "Challenging stickman parkour. Navigate through deadly levels.",
    "tags": ["platformer", "action", "difficult"]
  },
  {
    "id": "2048",
    "title": "2048",
    "thumbnail": "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=400&h=300&fit=crop",
    "url": "https://play2048.co/",
    "category": "Puzzle",
    "description": "Merge numbers to reach the 2048 tile. Highly addictive math puzzle.",
    "tags": ["puzzle", "math", "strategy"]
  },
  {
    "id": "drift-hunters",
    "title": "Drift Hunters",
    "thumbnail": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
    "url": "https://drift-hunters.io/",
    "category": "Sports",
    "description": "Customize your car and drift on various tracks in this 3D simulator.",
    "tags": ["racing", "drift", "3d"]
  },
  {
    "id": "snowball-io",
    "title": "Snowball.io",
    "thumbnail": "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=400&h=300&fit=crop",
    "url": "https://snowball.io/",
    "category": "Action",
    "description": "Roll a massive snowball and knock other players off the iceberg!",
    "tags": ["multiplayer", "io", "casual"]
  },
  {
    "id": "friday-night-funkin",
    "title": "FNF (Web)",
    "thumbnail": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
    "url": "https://ninja-muffin24.itch.io/funkin",
    "category": "Retro",
    "description": "Rhythm-based battle game. Press the arrows to the beat!",
    "tags": ["rhythm", "music", "retro"],
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

// --- DOM ELEMENTS ---
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
  elements.suggestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const gameTitles = GAMES_DATABASE.map(g => g.title).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `From this list of games: ${gameTitles}, suggest ONE game title that a student would enjoy playing during a short school break. Only return the exact title string.`,
    });

    const suggestion = response.text?.trim() || 'Retro Bowl';
    const game = GAMES_DATABASE.find(g => suggestion.includes(g.title)) || GAMES_DATABASE[0];
    
    elements.suggestBtn.innerHTML = `<i class="fas fa-magic"></i> Try ${game.title}!`;
    setTimeout(() => {
      launchGame(game.id);
      elements.suggestBtn!.innerHTML = originalText;
    }, 1000);

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
  const filtered = GAMES_DATABASE.filter(game => {
    const q = state.searchQuery.toLowerCase();
    const matchesSearch = game.title.toLowerCase().includes(q) || 
                         game.category.toLowerCase().includes(q) ||
                         game.tags.some(t => t.toLowerCase().includes(q));
    const matchesCategory = state.currentCategory === 'All' || game.category === state.currentCategory;
    return matchesSearch && matchesCategory;
  });

  const favorites = GAMES_DATABASE.filter(g => state.favorites.includes(g.id));

  if (elements.gamesGrid) {
    if (filtered.length === 0) {
      elements.gamesGrid.innerHTML = '';
      elements.noResults?.classList.remove('hidden');
    } else {
      elements.noResults?.classList.add('hidden');
      elements.gamesGrid.innerHTML = filtered.map(game => createGameCard(game)).join('');
    }
  }

  if (elements.favsSection && elements.favsGrid) {
    if (favorites.length > 0 && state.currentCategory === 'All' && state.searchQuery === '') {
      elements.favsSection.classList.remove('hidden');
      elements.favsGrid.innerHTML = favorites.map(game => createGameCard(game)).join('');
    } else {
      elements.favsSection.classList.add('hidden');
    }
  }

  if (elements.gameCountDisplay) {
    elements.gameCountDisplay.textContent = `Showing ${filtered.length} games`;
  }
  if (elements.collectionTitle) {
    elements.collectionTitle.innerHTML = `<div class="w-2 h-8 bg-indigo-500 rounded-full"></div> ${state.currentCategory === 'All' ? 'Popular Games' : state.currentCategory}`;
  }

  attachCardListeners();
}

function createGameCard(game: any) {
  const isFav = state.favorites.includes(game.id);
  const badge = game.isHot ? '<span class="absolute top-3 left-3 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-lg z-10 uppercase tracking-tighter shadow-sm">Hot</span>' : 
               game.isNew ? '<span class="absolute top-3 left-3 px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-lg z-10 uppercase tracking-tighter shadow-sm">New</span>' : '';
  
  return `
    <div class="game-card group relative bg-slate-800/30 rounded-3xl overflow-hidden border border-slate-700/40 hover:border-indigo-500/60 transition-all duration-500 shadow-lg">
      <div class="aspect-[4/3] overflow-hidden relative">
        ${badge}
        <img src="${game.thumbnail}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        <div class="play-overlay absolute inset-0 bg-slate-900/80 opacity-0 transition-all duration-300 flex flex-col items-center justify-center gap-4">
          <button data-play-id="${game.id}" class="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-indigo-500 transition-all">
            <i class="fas fa-play text-xl ml-1"></i>
          </button>
        </div>
        <button data-fav-id="${game.id}" class="absolute top-3 right-3 w-10 h-10 rounded-xl glass flex items-center justify-center z-10 transition-all hover:scale-110 active:scale-95">
          <i class="${isFav ? 'fas fa-heart text-red-500' : 'far fa-heart text-white'} text-lg"></i>
        </button>
      </div>
      <div class="p-4">
        <h3 class="font-extrabold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1 text-sm">${game.title}</h3>
        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">${game.category}</p>
      </div>
    </div>
  `;
}

function attachCardListeners() {
  document.querySelectorAll('[data-play-id]').forEach(btn => {
    (btn as HTMLElement).onclick = () => launchGame((btn as HTMLElement).dataset.playId || '');
  });
  document.querySelectorAll('[data-fav-id]').forEach(btn => {
    (btn as HTMLElement).onclick = (e) => {
      e.stopPropagation();
      toggleFavorite((btn as HTMLElement).dataset.favId || '');
    };
  });
}

function launchGame(id: string) {
  const game = GAMES_DATABASE.find(g => g.id === id);
  if (!game) return;

  state.currentGame = game;
  if (elements.playingTitle) elements.playingTitle.textContent = game.title;
  if (elements.playingDescription) elements.playingDescription.textContent = game.description;
  
  updatePlayerFavButton();

  elements.dashboardView?.classList.add('hidden');
  elements.playerView?.classList.remove('hidden');
  elements.gameLoader?.classList.remove('hidden');
  
  // Clear existing iframe to avoid residue
  if (elements.gameIframe) {
    elements.gameIframe.src = "about:blank";
    // Short timeout to ensure cleaner load
    setTimeout(() => {
        if (elements.gameIframe) elements.gameIframe.src = game.url;
    }, 50);
  }

  if (elements.gameIframe) {
    elements.gameIframe.onload = () => {
      elements.gameLoader?.classList.add('hidden');
    };
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePlayerFavButton() {
  if (!state.currentGame || !elements.playerFavToggle) return;
  const isFav = state.favorites.includes(state.currentGame.id);
  elements.playerFavToggle.innerHTML = `<i class="fas fa-heart ${isFav ? 'text-red-500' : ''}"></i> ${isFav ? 'Favorited' : 'Add Favorite'}`;
  elements.playerFavToggle.className = `px-4 py-2 rounded-xl flex items-center gap-2 font-medium border transition-all ${isFav ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`;
  elements.playerFavToggle.onclick = () => {
    toggleFavorite(state.currentGame.id);
    updatePlayerFavButton();
  };
}

function showDashboard() {
  state.currentGame = null;
  elements.playerView?.classList.add('hidden');
  elements.dashboardView?.classList.remove('hidden');
  if (elements.gameIframe) elements.gameIframe.src = 'about:blank';
}

function toggleFavorite(id: string) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((fid: string) => fid !== id);
  } else {
    state.favorites.push(id);
  }
  localStorage.setItem('gv-favorites', JSON.stringify(state.favorites));
  renderGames();
}

function updateStealthUI() {
  if (state.isStealth) {
    document.title = "Classes | Google Classroom";
    if (elements.favicon) elements.favicon.href = "https://ssl.gstatic.com/classroom/favicon.png";
    if (elements.stealthToggle) {
      elements.stealthToggle.innerHTML = '<i class="fas fa-user-secret"></i><span class="hidden md:inline">Stealth: ON</span>';
      elements.stealthToggle.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
    }
  } else {
    document.title = "Gabriel Village | Unblocked";
    if (elements.favicon) elements.favicon.href = "https://picsum.photos/32/32?random=50";
    if (elements.stealthToggle) {
      elements.stealthToggle.innerHTML = '<i class="fas fa-mask"></i><span class="hidden md:inline">Stealth Mode</span>';
      elements.stealthToggle.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
    }
  }
}

// --- INITIALIZATION ---
function startApp() {
  cacheElements();
  
  if (!elements.gamesGrid) {
      console.warn("Retrying initialization...");
      setTimeout(startApp, 100);
      return;
  }

  renderCategories();
  renderGames();
  
  elements.searchInput?.addEventListener('input', (e) => {
    state.searchQuery = (e.target as HTMLInputElement).value;
    renderGames();
  });

  elements.stealthToggle?.addEventListener('click', () => {
    state.isStealth = !state.isStealth;
    updateStealthUI();
  });

  elements.backButton?.addEventListener('click', showDashboard);
  elements.navLogo?.addEventListener('click', showDashboard);
  elements.suggestBtn?.addEventListener('click', suggestGame);

  elements.fullscreenBtn?.addEventListener('click', () => {
    if (!elements.gameIframe) return;
    const iframe = elements.gameIframe as any;
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
  });

  updateStealthUI();
  console.log("Gabriel Village Game Engine Initialized.");
}

// Robust loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
