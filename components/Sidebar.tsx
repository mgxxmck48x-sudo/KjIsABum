import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, setSelectedCategory }) => {
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
    <aside className="w-20 md:w-64 glass hidden sm:flex flex-col border-r border-slate-800/50 p-4 gap-1">
      <div className="text-[10px] font-black text-slate-500 px-4 py-3 uppercase tracking-[0.2em] hidden md:block">
        Main Menu
      </div>
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setSelectedCategory(cat.name)}
          className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
            selectedCategory === cat.name 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
          }`}
        >
          <i className={`fas ${cat.icon} w-5 text-center text-lg transition-transform group-hover:scale-110`}></i>
          <span className="font-bold text-sm hidden md:block">{cat.name}</span>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;