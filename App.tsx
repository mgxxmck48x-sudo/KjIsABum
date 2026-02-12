import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GAMES_DATA } from './games';
import Navbar from './components/Navbar';
import GameGrid from './components/GameGrid';
import GamePlayer from './components/GamePlayer';
import Sidebar from './components/Sidebar';
import { Category } from './types';

const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nova-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isStealth, setIsStealth] = useState(false);

  useEffect(() => {
    localStorage.setItem('nova-favorites', JSON.stringify(favorites));
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
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = game.title.toLowerCase().includes(q) || 
                           game.tags.some(tag => tag.toLowerCase().includes(q)) ||
                           game.category.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const favoriteGames = useMemo(() => {
    return GAMES_DATA.filter(game => favorites.includes(game.id));
  }, [favorites]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-100">
      <Navbar 
        onSearch={setSearchQuery} 
        isStealth={isStealth} 
        toggleStealth={() => setIsStealth(!isStealth)} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-12 max-w-7xl mx-auto">
                {favoriteGames.length > 0 && selectedCategory === 'All' && searchQuery === '' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                      My Favorites
                    </h2>
                    <GameGrid 
                      games={favoriteGames} 
                      favorites={favorites} 
                      toggleFavorite={toggleFavorite} 
                    />
                  </section>
                )}
                
                <section>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
                      {selectedCategory === 'All' ? 'Popular Games' : `${selectedCategory} Collection`}
                    </h2>
                    <div className="text-slate-400 text-sm bg-slate-800/50 px-4 py-1 rounded-full border border-slate-700">
                      Showing {filteredGames.length} games
                    </div>
                  </div>
                  <GameGrid 
                    games={filteredGames} 
                    favorites={favorites} 
                    toggleFavorite={toggleFavorite} 
                  />
                </section>
              </div>
            } />
            <Route path="/play/:id" element={<GamePlayer favorites={favorites} toggleFavorite={toggleFavorite} />} />
          </Routes>
        </main>
      </div>

      <footer className="glass py-6 px-6 text-center text-slate-500 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 Nova Games. Fast, Free, and Unblocked.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">DMCA</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">About Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppContent;