import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GAMES_DATA } from '../games';

interface GamePlayerProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ favorites, toggleFavorite }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const game = GAMES_DATA.find(g => g.id === id);

  useEffect(() => {
    if (!game) {
      navigate('/');
    }
  }, [game, navigate]);

  if (!game) return null;

  const handleFullscreen = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) {
      if (iframe.requestFullscreen) iframe.requestFullscreen();
      else if ((iframe as any).webkitRequestFullscreen) (iframe as any).webkitRequestFullscreen();
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Link to="/" className="text-indigo-400 text-sm hover:text-indigo-300 flex items-center gap-2 mb-2">
            <i className="fas fa-arrow-left"></i>
            Back to Library
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{game.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toggleFavorite(game.id)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium border transition-all ${
              favorites.includes(game.id) 
                ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <i className={`fas fa-heart ${favorites.includes(game.id) ? 'fill-current' : ''}`}></i>
            {favorites.includes(game.id) ? 'Favorited' : 'Add Favorite'}
          </button>
          <button 
            onClick={handleFullscreen}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <i className="fas fa-expand"></i>
            Fullscreen
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium">Loading Game Engine...</p>
          </div>
        )}
        <iframe 
          id="game-iframe"
          src={game.url}
          className="w-full h-full border-none"
          title={game.title}
          onLoad={() => setIsLoading(false)}
          allow="autoplay; fullscreen; keyboard; gamepad"
        />
      </div>

      <div className="glass p-8 rounded-3xl border-slate-700/50">
        <h2 className="text-xl font-bold mb-4 text-slate-100 flex items-center gap-3">
          <i className="fas fa-info-circle text-indigo-400"></i>
          About {game.title}
        </h2>
        <p className="text-slate-400 leading-relaxed">{game.description}</p>
      </div>
    </div>
  );
};

export default GamePlayer;