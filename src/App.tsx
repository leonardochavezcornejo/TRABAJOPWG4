import React, { useState, useEffect } from 'react';
import Navbar from './components/menu/Navbar';
import CartPanel from './components/menu/CartPanel';
import SearchPanel from './components/menu/SearchPanel';
import PriceFilterPanel from './components/menu/PriceFilterPanel';
import Carousel from './components/menu/Carousel';
import GameGrid from './components/menu/GameGrid';
import GameModal from './components/menu/GameModal';
import BuyModal from './components/menu/BuyModal';
import type { Cart, CartItem } from './components/data/cart';
import type { Game } from './components/admin/AdminGameModal';



function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); 
  const [cartVisible, setCartVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [priceFilterVisible, setPriceFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceLimit, setPriceLimit] = useState(100);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [buyVisible, setBuyVisible] = useState(false);
  const [games, setGames] = useState<Game[]>([]);

  const filteredGames = games.filter(game =>
    (filterCategory === 'All' || game.category === filterCategory) &&
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    game.price <= priceLimit
  );

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.game.price, 0);

  const handleAddToCart = (game: Game) => {
    setCartItems((prev) => {
      const existingGame = prev.find(item => item.game.id === game.id);

      if (existingGame) {
        // Si el juego ya está en el carrito, incrementamos la cantidad
        return prev.map(item =>
          item.game.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si el juego no está en el carrito, lo añadimos con cantidad 1
        return [...prev, { game, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (gameId: number) => {
    setCartItems((prev) => prev.filter(item => item.game.id !== gameId));
  };

  // Obtiene los juegos del backend al montar el componente
  useEffect(() => {
    fetch('http://localhost:5000/api/games')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error('Error fetching games:', err));
  }, []);


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
        cart={{ items: cartItems, total: total }} // Pasa el carrito completo
        onRemove={handleRemoveFromCart}
        onBuy={() => setBuyVisible(true)}
      />
      <BuyModal visible={buyVisible} onClose={() => setBuyVisible(false)} userId="user123" />
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