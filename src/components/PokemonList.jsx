import React, { useContext, useMemo, useCallback } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { PokedexContext } from '../contexts/PokedexContext';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';
import SortOptions from './SortOptions';
import TypeFilter from './TypeFilter';

const PokemonList = () => {
  const {
    pokemonList,
    loading,
    error,
    itemsPerPage,
    currentPage,
    sortOption,
    filterTypes,
  } = useContext(PokedexContext);

  const sortedPokemon = useMemo(() => {
    let sorted = [...pokemonList];
    switch (sortOption) {
      case 'id':
        sorted.sort((a, b) => a.id - b.id);
        break;
      case 'name_asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [pokemonList, sortOption]);

  const filteredPokemon = useMemo(() => {
    if (filterTypes.length === 0) {
      return sortedPokemon;
    }
    return sortedPokemon.filter((pokemon) =>
      filterTypes.every((type) => pokemon.types.includes(type))
    );
  }, [sortedPokemon, filterTypes]);

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  if (loading) {
    return <Typography>Loading Pokémon...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading Pokémon.</Typography>;
  }

  return (
    <Box>
      
      <Grid container spacing={3}>
        {currentPokemon.map((pokemon) => (
          <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
      {filteredPokemon.length > itemsPerPage && (
        <Pagination totalPages={totalPages} />
      )}
      {filteredPokemon.length === 0 && !loading && (
        <Typography>No Pokémon match your criteria.</Typography>
      )}
    </Box>
  );
};

export default PokemonList;