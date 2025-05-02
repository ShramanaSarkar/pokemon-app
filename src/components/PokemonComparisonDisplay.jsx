import React, { useContext, useMemo } from 'react';
 import { PokedexContext } from '../contexts/PokedexContext';
 import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

 const PokemonComparisonDisplay = ({ pokemon1Name, pokemon2Name }) => {
  const { pokemonList } = useContext(PokedexContext);

  const pokemon1 = useMemo(() => pokemonList.find((p) => p.name === pokemon1Name), [pokemonList, pokemon1Name]);
  const pokemon2 = useMemo(() => pokemonList.find((p) => p.name === pokemon2Name), [pokemonList, pokemon2Name]);

  if (!pokemon1 || !pokemon2) {
   return <Typography>Select two Pokémon to compare.</Typography>;
  }

  return (
   <Box mt={3}>
    <Typography variant="h5" gutterBottom>Comparison</Typography>
    <Grid container spacing={3}>
     <Grid item xs={12} md={6}>
      <Card>
       <CardContent>
        <Typography variant="h6">{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</Typography>
        {/* Display features of pokemon1 */}
        <Typography>Type: {pokemon1.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}</Typography>
        {/* Add more features to compare */}
       </CardContent>
      </Card>
     </Grid>
     <Grid item xs={12} md={6}>
      <Card>
       <CardContent>
        <Typography variant="h6">{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</Typography>
        {/* Display features of pokemon2 */}
        <Typography>Type: {pokemon2.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}</Typography>
        {/* Add more features to compare */}
       </CardContent>
      </Card>
     </Grid>
    </Grid>
    {/* Add a more detailed comparison section below */}
   </Box>
  );
 };

 export default PokemonComparisonDisplay;