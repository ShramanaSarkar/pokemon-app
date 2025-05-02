import React from 'react';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import HomePage from '../pages/HomePage';
 import PokemonDetail from '../components/PokemonDetail';
 import FavoritesPage from '../pages/FavoritesPage'; // Import FavoritesPage

 const Router = () => {
  return (
   <BrowserRouter>
    <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
     <Route path="/favorites" element={<FavoritesPage />} /> {/* Add the new route */}
    </Routes>
   </BrowserRouter>
  );
 };

 export default Router;