import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';

interface GameGridProps {
  games: Game[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ games, favorites, toggleFavorite }) => {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-500 glass rounded-3xl border-dashed border-2 border-slate-700/50 w-full">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <i className="fas fa-search text-3xl opacity-40"></i>
        </div>
        <p className="text-xl font-bold text-slate-400">No games found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {games.map((game) => (
        <div 
          key={game.id} 
          className="game-card group relative bg-slate-800/30 rounded-3xl overflow-hidden border border-slate-700/40 hover:border-indigo-500/60 transition-all duration-500 hover:-translate-y-2 shadow-lg"
        >
          <div className="aspect-[4/3] overflow-hidden relative">
            <img 
              src={game.thumbnail} 
              alt={game.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="play-overlay absolute inset-0 bg-slate-900/80 opacity-0 transition-all duration-300 flex flex-col items-center justify-center gap-4">
              <Link 
                to={`/play/${game.id}`}
                className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-indigo-500 transition-all"
              >
                <i className="fas fa-play text-xl ml-1"></i>
              </Link>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(game.id);
              }}
              className="absolute top-3 right-3 w-10 h-10 rounded-xl glass flex items-center justify-center z-10 transition-all hover:scale-110 active:scale-95"
            >
              <i className={`${favorites.includes(game.id) ? 'fas fa-heart text-red-500' : 'far fa-heart text-white'} text-lg`}></i>
            </button>
          </div>
          <div className="p-5">
            <h3 className="font-extrabold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1 text-base">
              {game.title}
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{game.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameGrid;