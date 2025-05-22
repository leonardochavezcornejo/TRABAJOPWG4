import React, { useState } from 'react';
import Navbar from './components/menu/Navbar';
import CartPanel from './components/menu/CartPanel';
import SearchPanel from './components/menu/SearchPanel';
import PriceFilterPanel from './components/menu/PriceFilterPanel';
import Carousel from './components/menu/Carousel';
import GameGrid from './components/menu/GameGrid';
import GameModal from './components/menu/GameModal';
import BuyModal from './components/menu/BuyModal';
import type { Game } from './components/types';
import { games } from './components/data/games';



function App() {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [priceFilterVisible, setPriceFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceLimit, setPriceLimit] = useState(100);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [buyVisible, setBuyVisible] = useState(false);

  const filteredGames = games.filter(game =>
    (filterCategory === 'All' || game.category === filterCategory) &&
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    game.price <= priceLimit
  );

  const handleAddToCart = (game: Game) => {
    setCartItems((prev) => [...prev, game]);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(game => game.id !== id));
  };

  return (
    <>
      <Navbar
        onFilterCategory={setFilterCategory}
        onToggleCart={() => {
          setCartVisible((prev) => !prev);
          setSearchVisible(false);
          setPriceFilterVisible(false);
        }}
        onToggleSearch={() => {
          setSearchVisible((prev) => !prev);
          setCartVisible(false);
          setPriceFilterVisible(false);
        }}
        onTogglePrice={() => {
          setPriceFilterVisible((prev) => !prev);
          setCartVisible(false);
          setSearchVisible(false);
        }}
      />

      <CartPanel
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onBuy={() => setBuyVisible(true)}
      />
      <BuyModal visible={buyVisible} onClose={() => setBuyVisible(false)} />
      <SearchPanel visible={searchVisible} onSearch={setSearchQuery} />
      <PriceFilterPanel visible={priceFilterVisible} onChange={setPriceLimit} min={0} max={100} />

      <Carousel />
      <GameGrid games={filteredGames} onSelect={setSelectedGame} />
      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

export default App;