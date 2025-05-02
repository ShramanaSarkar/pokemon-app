import { useContext } from 'react';
import { PokedexContext } from '../contexts/PokedexContext';

const useFavorites = () => {
  const { favorites, toggleFavorite } = useContext(PokedexContext);
  const isFavorite = (pokemonId) => favorites.includes(pokemonId);
  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;