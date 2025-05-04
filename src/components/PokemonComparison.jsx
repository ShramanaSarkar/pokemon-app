import React, { useContext } from 'react';
 import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
 import { PokedexContext } from '../contexts/PokedexContext';
 import { styled } from '@mui/material/styles';

 const ComparisonCard = styled(Card)(({ theme }) => ({
  flex: 1,
 }));

 const ComparisonContainer = styled(Box)(({ theme }) => ({
  my: theme.spacing(2),
  width: '100%', // Make it take the full width
 }));

 const ComparisonInner = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
 }));

 const StatName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
 }));

 const PokemonComparison = () => {
  const { comparisonPokemon, removeFromComparison } = useContext(PokedexContext);

  if (comparisonPokemon.length === 0) {
   return <Typography></Typography>;
  }

  if (comparisonPokemon.length === 1) {
   return <Typography>Select one more Pokémon to compare.</Typography>;
  }

  const pokemon1 = comparisonPokemon[0];
  const pokemon2 = comparisonPokemon[1];

  const getStatDifference = (stat1, stat2) => stat1 - stat2;
  

  return (
   <ComparisonContainer>
    <Typography variant="h5" gutterBottom>Comparison</Typography>
    <ComparisonInner container spacing={2}>
      <Grid item xs={12} md={6}>
        <ComparisonCard>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</Typography>
              <Button size="small" onClick={() => removeFromComparison(pokemon1.id)}>
                Remove
              </Button>
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Stats:</Typography>
            {pokemon1.stats.map((stat) => (
              <Typography key={stat.stat.name}>
                <StatName>{stat.stat.name}:</StatName> {stat.base_stat}
              </Typography>
            ))}
          </CardContent>
        </ComparisonCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <ComparisonCard>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</Typography>
              <Button size="small" onClick={() => removeFromComparison(pokemon2.id)}>
                Remove
              </Button>
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Stats:</Typography>
            {pokemon2.stats.map((stat) => (
              <Typography key={stat.stat.name}>
                <StatName>{stat.stat.name}:</StatName> {stat.base_stat}
              </Typography>
            ))}
          </CardContent>
        </ComparisonCard>
      </Grid>
    </ComparisonInner>
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Stat Differences:</Typography>
      {pokemon1.stats.map((stat, index) => (
        <Typography key={stat.stat.name}>
          <StatName>{stat.stat.name}:</StatName> {getStatDifference(stat.base_stat, pokemon2.stats[index].base_stat)}
        </Typography>
      ))}
    </Box>
   </ComparisonContainer>
  );
 };

 export default PokemonComparison;