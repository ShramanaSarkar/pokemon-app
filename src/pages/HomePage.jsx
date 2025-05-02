import React, { useState, useContext, useMemo } from 'react';
 import PokemonList from '../components/PokemonList';
 import RandomPokemonButton from '../components/RandomPokemonButton';
 import { Box, Typography, CircularProgress, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
 import { PokedexContext } from '../contexts/PokedexContext';
 import useFetchPokemonList from '../hooks/useFetchPokemonList';
 import { Link } from 'react-router-dom';
 import PokemonComparisonDisplay from '../components/PokemonComparisonDisplay';
 import PokemonComparison from '../components/PokemonComparison';
 import SortOptions from '../components/SortOptions';
 import TypeFilter from '../components/TypeFilter';
 const HomePage = () => {
  const { pokemonList } = useContext(PokedexContext); // Access pokemonList from context
  const [selectedPokemon1, setSelectedPokemon1] = useState('');
  const [selectedPokemon2, setSelectedPokemon2] = useState('');
  const { loading, error } = useFetchPokemonList(); // Call the hook to trigger data fetching

  const handlePokemon1Change = (event) => {
   setSelectedPokemon1(event.target.value);
  };

  const handlePokemon2Change = (event) => {
   setSelectedPokemon2(event.target.value);
  };

  const validForComparison = selectedPokemon1 && selectedPokemon2 && selectedPokemon1 !== selectedPokemon2;

  const pokemonOptions = useMemo(() => {
   if (!pokemonList) {
    return [];
   }
   return pokemonList.map((pokemon) => (
    <MenuItem key={pokemon.id} value={pokemon.name}>
     {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
    </MenuItem>
   ));
  }, [pokemonList]);

  if (loading) {
   return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 128px)' }}>
     <CircularProgress />
     <Typography sx={{ ml: 2 }}>Loading Pokémon...</Typography>
    </Box>
   );
  }

  if (error) {
   return (
    <Box sx={{ mt: 2, color: 'error.main', textAlign: 'center' }}>
     <Typography variant="h6">Error loading Pokémon.</Typography>
     <Typography>{error}</Typography>
    </Box>
   );
  }

  return (
   <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
     <Typography variant="h4" gutterBottom>
      Select two Pokémon to compare.
     </Typography>
     <Button component={Link} to="/favorites" variant="outlined" color="primary">
      View Favorites
     </Button>
    </Box>

    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
     <FormControl fullWidth>
      <InputLabel id="pokemon1-label">Pokémon 1</InputLabel>
      <Select
       labelId="pokemon1-label"
       id="pokemon1"
       value={selectedPokemon1}
       label="Pokémon 1"
       onChange={handlePokemon1Change}
      >
       <MenuItem value="">
        <em>None</em>
       </MenuItem>
       {pokemonOptions} {/* Rendering the options here */}
      </Select>
     </FormControl>
     <FormControl fullWidth>
      <InputLabel id="pokemon2-label">Pokémon 2</InputLabel>
      <Select
       labelId="pokemon2-label"
       id="pokemon2"
       value={selectedPokemon2}
       label="Pokémon 2"
       onChange={handlePokemon2Change}
      >
       <MenuItem value="">
        <em>None</em>
       </MenuItem>
       {pokemonOptions} {/* Rendering the options here */}
      </Select>
     </FormControl>
    </Box>

    {validForComparison && (
     <PokemonComparisonDisplay pokemon1Name={selectedPokemon1} pokemon2Name={selectedPokemon2} />
    )}

    <PokemonComparison />


    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: { xs: 'column', md: 'row' }, gap: 2}}>
    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
        <SortOptions />
        <TypeFilter />
      </Box>
     <RandomPokemonButton />
    </Box>



    <PokemonList /> {/* This component also uses pokemonList */}
   </Box>
  );
 };

 export default HomePage;