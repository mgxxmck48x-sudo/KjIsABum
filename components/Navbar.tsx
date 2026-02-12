import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
  isStealth: boolean;
  toggleStealth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, isStealth, toggleStealth }) => {
  return (
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
          placeholder="Search games or tags..." 
          className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all text-slate-200 placeholder:text-slate-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleStealth}
          className={`h-10 px-4 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
            isStealth 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/80 hover:border-slate-600'
          }`}
          title="Toggle Stealth Mode"
        >
          <i className={`fas ${isStealth ? 'fa-user-secret' : 'fa-mask'}`}></i>
          <span className="hidden md:inline">{isStealth ? 'Stealth: ON' : 'Stealth Mode'}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;