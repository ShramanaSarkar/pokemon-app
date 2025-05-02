import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const PokedexContext = createContext();

export const PokedexProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('id');
  const [filterTypes, setFilterTypes] = useState([]);
  const [comparisonPokemon, setComparisonPokemon] = useState([]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((pokemonId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(pokemonId)) {
        return prevFavorites.filter((id) => id !== pokemonId);
      } else {
        return [...prevFavorites, pokemonId];
      }
    });
  }, []);

  const addToComparison = useCallback((pokemon) => {
    setComparisonPokemon((prevComparison) => {
      if (prevComparison.find((p) => p.id === pokemon.id)) {
        return prevComparison; // Don't add if already in comparison
      }
      if (prevComparison.length < 2) {
        return [...prevComparison, pokemon];
      }
      return prevComparison; // Limit to 2 Pokémon
    });
  }, []);

  const removeFromComparison = useCallback((pokemonId) => {
    setComparisonPokemon((prevComparison) =>
      prevComparison.filter((p) => p.id !== pokemonId)
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      pokemonList,
      setPokemonList,
      loading,
      setLoading,
      error,
      setError,
      favorites,
      toggleFavorite,
      itemsPerPage,
      setItemsPerPage,
      currentPage,
      setCurrentPage,
      sortOption,
      setSortOption,
      filterTypes,
      setFilterTypes,
      comparisonPokemon,
      addToComparison,
      removeFromComparison,
    }),
    [
      pokemonList,
      loading,
      error,
      favorites,
      toggleFavorite,
      itemsPerPage,
      setItemsPerPage,
      currentPage,
      setCurrentPage,
      sortOption,
      setSortOption,
      filterTypes,
      setFilterTypes,
      comparisonPokemon,
      addToComparison,
      removeFromComparison,
    ]
  );

  return (
    <PokedexContext.Provider value={contextValue}>{children}</PokedexContext.Provider>
  );
};