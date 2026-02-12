import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

/** 
 * DATA & TYPES 
 */

type Category = 'All' | 'Action' | 'Puzzle' | 'Strategy' | 'Sports' | 'Retro' | 'Other';

interface Game {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: Category;
  description: string;
  tags: string[];
}

const GAMES_DATA: Game[] = [
  {
    id: "basket-random",
    title: "Basket Random",
    thumbnail: "https://images.unsplash.com/photo-1519861531158-28636435014a?w=400&h=300&fit=crop",
    url: "https://www.twoplayergames.org/embed/basket-random",
    category: "Sports",
    description: "Basket Random is a 2-player arcade game with ragdoll physics. Hop and fight for the ball through different fields.",
    tags: ["sports", "2-player", "ragdoll"]
  },
  {
    id: "roblox",
    title: "Roblox (Cloud)",
    thumbnail: "https://images.unsplash.com/photo-1590133323030-949dd194a601?w=400&h=300&fit=crop",
    url: "https://now.gg/play/roblox-corporation/5349/roblox",
    category: "Other",
    description: "Play Roblox instantly in your browser via cloud gaming. Access millions of user-created games.",
    tags: ["multiplayer", "sandbox", "cloud"]
  },
  {
    id: "minecraft-eagler",
    title: "Minecraft (Eaglercraft)",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    url: "https://eaglercraft.com/mc/1.8.8/",
    category: "Retro",
    description: "A full browser-based version of Minecraft 1.8.8. Survival and Creative support included.",
    tags: ["survival", "creative", "classic"]
  },
  {
    id: "1v1-lol",
    title: "1v1.LOL",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    url: "https://1v1.lol/",
    category: "Action",
    description: "Build, edit, and shoot in this competitive third-person shooter. Practice your 1v1 skills.",
    tags: ["action", "shooter", "building"]
  },
  {
    id: "tunnel-rush",
    title: "Tunnel Rush",
    thumbnail: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&h=300&fit=crop",
    url: "https://tunnelrush.io/",
    category: "Action",
    description: "Speed through neon tunnels avoiding obstacles. Test your reflexes in this high-speed geometric runner.",
    tags: ["action", "speed", "reflex"]
  },
  {
    id: "2048",
    title: "2048",
    thumbnail: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=400&h=300&fit=crop",
    url: "https://play2048.co/",
    category: "Puzzle",
    description: "Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge!",
    tags: ["puzzle", "math", "strategy"]
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    thumbnail: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    url: "https://orteil.dashnet.org/cookieclicker/",
    category: "Other",
    description: "The classic idle game. Click the cookie, buy upgrades, and build your cookie empire.",
    tags: ["clicker", "idle", "addicting"]
  },
  {
    id: "slope",
    title: "Slope",
    thumbnail: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=400&h=300&fit=crop",
    url: "https://slope-game.github.io/",
    category: "Action",
    description: "A fast-paced 3D runner game where you control a ball rolling down a slope.",
    tags: ["action", "3d", "speed"]
  }
];

/** 
 * COMPONENTS 
 */

const Navbar = ({ onSearch, isStealth, toggleStealth }: any) => (
  <nav className="glass sticky top-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between gap-4 border-b border-slate-800/50">
    <Link to="/" className="flex items-center gap-3 shrink-0 group">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
        <i className="fas fa-bolt text-white text-xl"></i>
      </div>
      <span className="text-xl font-extrabold tracking-tighter hidden sm:block uppercase">
        Nova<span className="text-indigo-500">Games</span>
      </span>
    </Link>
    <div className="flex-1 max-w-2xl relative group">
      <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"></i>
      <input 
        type="text" 
        placeholder="Search games..." 
        className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all text-slate-200 placeholder:text-slate-500"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
    <button 
      onClick={toggleStealth}
      className={`h-10 px-4 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
        isStealth ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
      }`}
    >
      <i className={`fas ${isStealth ? 'fa-user-secret' : 'fa-mask'}`}></i>
      <span className="hidden md:inline">{isStealth ? 'Cloaked' : 'Stealth Mode'}</span>
    </button>
  </nav>
);

const Sidebar = ({ selectedCategory, setSelectedCategory }: any) => {
  const categories: { name: Category; icon: string }[] = [
    { name: 'All', icon: 'fa-rocket' },
    { name: 'Action', icon: 'fa-fire-alt' },
    { name: 'Puzzle', icon: 'fa-puzzle-piece' },
    { name: 'Strategy', icon: 'fa-chess-knight' },
    { name: 'Sports', icon: 'fa-basketball-ball' },
    { name: 'Retro', icon: 'fa-gamepad' },
    { name: 'Other', icon: 'fa-cubes' },
  ];
  return (
    <aside className="w-20 md:w-64 glass hidden sm:flex flex-col border-r border-slate-800/50 p-4 gap-1 h-[calc(100vh-64px)]">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setSelectedCategory(cat.name)}
          className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
            selectedCategory === cat.name ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
          }`}
        >
          <i className={`fas ${cat.icon} w-5 text-center`}></i>
          <span className="font-bold text-sm hidden md:block">{cat.name}</span>
        </button>
      ))}
    </aside>
  );
};

const GameGrid = ({ games, favorites, toggleFavorite }: any) => {
  if (games.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 text-slate-500 glass rounded-3xl w-full border-dashed border-2 border-slate-700/50">
      <i className="fas fa-ghost text-4xl mb-4 opacity-20"></i>
      <p className="text-xl font-bold">Nothing found</p>
    </div>
  );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {games.map((game: any) => (
        <div key={game.id} className="game-card group relative bg-slate-800/30 rounded-3xl overflow-hidden border border-slate-700/40 transition-all hover:-translate-y-2 hover:border-indigo-500/50 shadow-xl">
          <div className="aspect-[4/3] overflow-hidden relative">
            <img src={game.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={game.title} />
            <div className="play-overlay absolute inset-0 bg-slate-900/80 opacity-0 transition-all flex items-center justify-center">
              <Link to={`/play/${game.id}`} className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
                <i className="fas fa-play text-xl ml-1"></i>
              </Link>
            </div>
            <button 
              onClick={() => toggleFavorite(game.id)} 
              className="absolute top-3 right-3 w-10 h-10 rounded-xl glass flex items-center justify-center z-10 hover:scale-110 transition-transform"
            >
              <i className={`${favorites.includes(game.id) ? 'fas fa-heart text-red-500' : 'far fa-heart text-white'} text-lg`}></i>
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-extrabold text-slate-100 line-clamp-1 group-hover:text-indigo-400 transition-colors">{game.title}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{game.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const GamePlayer = ({ favorites, toggleFavorite }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const game = GAMES_DATA.find(g => g.id === id);

  useEffect(() => {
    if (!game) navigate('/');
  }, [game, navigate]);

  if (!game) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 text-sm font-bold bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">
          <i className="fas fa-arrow-left"></i> Back to Library
        </Link>
        <button onClick={() => toggleFavorite(game.id)} className="px-4 py-2 glass rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-700 transition-colors">
            <i className={`${favorites.includes(game.id) ? 'fas fa-heart text-red-500' : 'far fa-heart'}`}></i>
            {favorites.includes(game.id) ? 'Favorited' : 'Save Game'}
        </button>
      </div>
      
      <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">Loading Environment...</p>
          </div>
        )}
        <iframe 
          src={game.url} 
          className="w-full h-full" 
          onLoad={() => setLoading(false)}
          allow="autoplay; fullscreen; keyboard; gamepad"
        />
      </div>

      <div className="glass p-8 rounded-3xl">
        <h1 className="text-3xl font-black mb-4">{game.title}</h1>
        <p className="text-slate-400 leading-relaxed text-lg">{game.description}</p>
      </div>
    </div>
  );
};

/** 
 * MAIN APP CONTAINER 
 */

const App = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nova-favs');
    return saved ? JSON.parse(saved) : [];
  });
  const [isStealth, setIsStealth] = useState(false);

  useEffect(() => {
    localStorage.setItem('nova-favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (isStealth) {
      document.title = "Classes | Google Classroom";
      if (link) link.href = "https://ssl.gstatic.com/classroom/favicon.png";
    } else {
      document.title = "Nova Games | Unblocked Portal";
      if (link) link.href = "https://picsum.photos/32/32?random=1";
    }
  }, [isStealth]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(g => {
      const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase()) || 
                           g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'All' || g.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const favGames = useMemo(() => GAMES_DATA.filter(g => favorites.includes(g.id)), [favorites]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-100 selection:bg-indigo-500/30">
      <Navbar onSearch={setSearch} isStealth={isStealth} toggleStealth={() => setIsStealth(!isStealth)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar selectedCategory={category} setSelectedCategory={setCategory} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-12 max-w-7xl mx-auto pb-12">
                {favGames.length > 0 && category === 'All' && !search && (
                  <section>
                    <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
                      <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                      Your Favorites
                    </h2>
                    <GameGrid games={favGames} favorites={favorites} toggleFavorite={toggleFavorite} />
                  </section>
                )}
                
                <section>
                  <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                    {category === 'All' ? 'Popular Games' : `${category} Collection`}
                  </h2>
                  <GameGrid games={filteredGames} favorites={favorites} toggleFavorite={toggleFavorite} />
                </section>
              </div>
            } />
            <Route path="/play/:id" element={<GamePlayer favorites={favorites} toggleFavorite={toggleFavorite} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);