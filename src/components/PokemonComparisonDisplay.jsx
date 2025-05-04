import React, { useContext, useMemo } from 'react';
 import { PokedexContext } from '../contexts/PokedexContext';
 import { Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
 import { styled } from '@mui/material/styles';

 const ComparisonCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
 }));

 const ComparisonTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
 }));

 const FeatureLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginRight: theme.spacing(1),
 }));

 const PokemonComparisonDisplay = ({ pokemon1Name, pokemon2Name }) => {
  const { pokemonList } = useContext(PokedexContext);

  const pokemon1 = useMemo(() => pokemonList.find((p) => p.name === pokemon1Name), [pokemonList, pokemon1Name]);
  const pokemon2 = useMemo(() => pokemonList.find((p) => p.name === pokemon2Name), [pokemonList, pokemon2Name]);

  // Console logs for debugging
  // console.log('pokemon1:', pokemon1);
  // console.log('pokemon2:', pokemon2);
  // console.log('pokemon1?.types:', pokemon1?.types);
  // console.log('pokemon2?.types:', pokemon2?.types);

  if (!pokemon1 || !pokemon2) {
   return <Typography>Select two Pokémon to compare.</Typography>;
  }

  return (
   <Box mt={3} mb={4}>
    <Typography variant="h5" gutterBottom>Comparison</Typography>
    <Grid container spacing={3} justifyContent={'space-between'}>
     <Grid item xs={12} md={6} sx={{ width: '48%' }}>  
      <ComparisonCard>
       <CardContent>
        <ComparisonTitle variant="h6">{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</ComparisonTitle>
        <Typography><FeatureLabel>ID: #{pokemon1.id}</FeatureLabel></Typography>
        <Typography><FeatureLabel>Type: {pokemon1.types.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</FeatureLabel></Typography>
        <Typography><FeatureLabel>Stats:</FeatureLabel></Typography>
        <List dense>
         {pokemon1?.stats?.map(stat => (
          <ListItem key={stat.stat.name} disableGutters>
           <ListItemText primary={`${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: ${stat.base_stat}`} />
          </ListItem>
         ))}
        </List>
        <Typography><FeatureLabel>Abilities:</FeatureLabel></Typography>
        <List dense>
         {pokemon1?.abilities?.map(ability => (
          <ListItem key={ability.ability.name} disableGutters>
           <ListItemText primary={`${ability.ability.name?.charAt(0).toUpperCase() + ability.ability.name?.slice(1)} ${ability.is_hidden ? '(Hidden)' : ''}`} />
          </ListItem>
         ))}
        </List>
       </CardContent>
      </ComparisonCard>
     </Grid>
     <Grid item xs={12} md={6} sx={{ width: '48%' }}>
      <ComparisonCard>
       <CardContent>
        <ComparisonTitle variant="h6">{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</ComparisonTitle>
        <Typography><FeatureLabel>ID: #{pokemon2.id}</FeatureLabel></Typography>
        <Typography><FeatureLabel>Type: {pokemon2.types.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</FeatureLabel></Typography>
        <Typography><FeatureLabel>Stats:</FeatureLabel></Typography>
        <List dense>
         {pokemon2?.stats?.map(stat => (
          <ListItem key={stat.stat.name} disableGutters>
           <ListItemText primary={`${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: ${stat.base_stat}`} />
          </ListItem>
         ))}
        </List>
        <Typography><FeatureLabel>Abilities:</FeatureLabel></Typography>
        <List dense>
         {pokemon2?.abilities?.map(ability => (
          <ListItem key={ability.ability.name} disableGutters>
           <ListItemText primary={`${ability.ability.name?.charAt(0).toUpperCase() + ability.ability.name?.slice(1)} ${ability.is_hidden ? '(Hidden)' : ''}`} />
          </ListItem>
         ))}
        </List>
       </CardContent>
      </ComparisonCard>
     </Grid>
    </Grid>
    {/* You can add a more detailed, side-by-side comparison section below if needed */}
   </Box>
  );
 };

 export default PokemonComparisonDisplay;