import React from 'react';
 import { useParams, Link } from 'react-router-dom';
 import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button, // Import Button
 } from '@mui/material';
 import useFetchPokemonDetails from '../hooks/useFetchPokemonDetails';
 import { styled } from '@mui/material/styles';

 const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  overflowY: 'auto',
 }));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,
  objectFit: 'contain',
  backgroundColor: theme.palette.grey[200],
}));

 const StatItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
 }));

 const AbilityItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
 }));

 const MoveChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
 }));

 const EvolutionText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
 }));

 const BackButton = styled(Button)(({ theme }) => ({ // Styled Button
  marginTop: theme.spacing(3),
  color: theme.palette.primary.main,
  '&:hover': {
  color: theme.palette.primary.dark,
  },
 }));

 const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const { pokemonDetails, loading, error } = useFetchPokemonDetails(pokemonName);

  if (loading) {
  return (
   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 128px)' }}>
    <CircularProgress />
   </Box>
  );
  }

  if (error) {
  return (
   <Box sx={{ mt: 2, color: 'error.main', textAlign: 'center' }}>
    <Typography variant="h6">Error loading Pokémon details.</Typography>
    <Typography>{error}</Typography>
   </Box>
  );
  }

  if (!pokemonDetails) {
  return <Typography textAlign="center">Pokémon not found.</Typography>;
  }

  const getEvolutionChainNames = (chain) => {
  const evolutions = [];
  let current = chain;
  while (current) {
   evolutions.push(current.species.name.charAt(0).toUpperCase() + current.species.name.slice(1));
   if (current.evolves_to && current.evolves_to.length > 0) {
    current = current.evolves_to[0];
   } else {
    current = null;
   }
  }
  return evolutions.join(' → ');
  };

  return (
   <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, minHeight: 'calc(100vh - 128px)' }}>
    <StyledCard sx={{ maxWidth: 600, width: '100%' }}>
     <CardMedia
      component="img"
      image={pokemonDetails.sprites?.other?.['official-artwork']?.front_default || pokemonDetails.sprites?.front_default}
      alt={pokemonDetails.name}
      className={StyledCardMedia}
     />
     <CardContent>
      <Typography gutterBottom variant="h4" component="div">
       {pokemonDetails.name?.charAt(0).toUpperCase() + pokemonDetails.name?.slice(1)}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
       ID: #{pokemonDetails.id}
      </Typography>
      <Box sx={{ my: 1 }}>
       {pokemonDetails.types?.map((type) => (
        <Chip key={type.type.name} label={type.type.name.toUpperCase()} color="primary" size="small" sx={{ mr: 0.5 }} />
       ))}
      </Box>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" mt={2}>Stats:</Typography>
      <List dense>
       {pokemonDetails.stats?.map((stat) => (
        <StatItem key={stat.stat.name}>
         <ListItemText primary={`${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: ${stat.base_stat}`} />
        </StatItem>
       ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" mt={2}>Abilities:</Typography>
      <List dense>
       {pokemonDetails.abilities?.map((ability) => (
        <AbilityItem key={ability.ability.name}>
         <ListItemText primary={`${ability.ability.name?.charAt(0).toUpperCase() + ability.ability.name?.slice(1)} ${ability.is_hidden ? '(Hidden)' : ''}`} />
        </AbilityItem>
       ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" mt={2}>Moves:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
       {pokemonDetails.moves?.slice(0, 20)
        .map((move) => (
         <MoveChip key={move.move.name} label={move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)} size="small" color="secondary" />
        ))}
      </Box>
      {pokemonDetails.evolutionChain && (
       <Box mt={2}>
        <Typography variant="h6">Evolution Chain:</Typography>
        <EvolutionText>{getEvolutionChainNames(pokemonDetails.evolutionChain)}</EvolutionText>
       </Box>
      )}
      <Box mt={3} textAlign="center">
       <BackButton component={Link} to="/">Back to List</BackButton> {/* Use Button */}
      </Box>
     </CardContent>
    </StyledCard>
   </Box>
  );
 };

 export default PokemonDetail;