import React, { useContext, useMemo } from 'react';
 import { Grid, Typography, Box, Button } from '@mui/material'; // Import Button
 import { PokedexContext } from '../contexts/PokedexContext';
 import PokemonCard from '../components/PokemonCard';
 import { Link } from 'react-router-dom'; // Import Link

 const FavoritesPage = () => {
  const { pokemonList, favorites } = useContext(PokedexContext);

  const favoritePokemon = useMemo(
   () => pokemonList.filter((pokemon) => favorites.includes(pokemon.id)),
   [pokemonList, favorites]
  );

  if (favoritePokemon.length === 0) {
   return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 128px)' }}>
     <Typography variant="h6" gutterBottom>No favorite Pokémon yet!</Typography>
     <Button component={Link} to="/" variant="outlined" color="primary">
      Back to Home
     </Button>
    </Box>
   );
  }

  return (
   <Box sx={{ mt: 4 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
     <Typography variant="h4" gutterBottom align="center" sx={{ flexGrow: 1, textAlign: 'center' }}>
      My Favorite Pokémon
     </Typography>
     {/* Small screen back button */}
     <Button component={Link} to="/" variant="outlined" color="primary" sx={{ display: { xs: 'block', md: 'none' } }}>
      Home
     </Button>
    </Box>
    <Grid container spacing={3}>
     {favoritePokemon.map((pokemon) => (
      <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
       <PokemonCard pokemon={pokemon} />
      </Grid>
     ))}
    </Grid>
    {/* Large screen back button */}
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', display: { xs: 'none', md: 'block' } }}>
     <Button component={Link} to="/" variant="outlined" color="primary">
      Back to Home
     </Button>
    </Box>
   </Box>
  );
 };

 export default FavoritesPage;