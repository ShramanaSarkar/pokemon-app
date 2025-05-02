import React from 'react';
 import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
 import FavoriteIcon from '@mui/icons-material/Favorite';
 import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
 import { Link } from 'react-router-dom';
 import useFavorites from '../hooks/useFavorites';

 const PokemonCard = ({ pokemon }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (event) => {
   event.stopPropagation(); // Prevent card click when favoriting
   toggleFavorite(pokemon.id);
  };

  return (
   <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardMedia
     component={Link} // Apply Link to the image only
     sx={{ height: 140, objectFit: 'contain', backgroundColor: '#f0f0f0', width: '210px' }}
     image={pokemon.sprites}
     alt={pokemon.name}
     to={`/pokemon/${pokemon.name}`}
     style={{ textDecoration: 'none' }}
    />
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Typography gutterBottom variant="h6" component={Link} to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
       {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Typography>
      <IconButton onClick={handleFavoriteClick} size="small" aria-label="add to favorites">
       {isFavorite(pokemon.id) ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      </IconButton>
     </Box>
     <Typography variant="body2" color="text.secondary">
      ID: #{pokemon.id}
     </Typography>
     <Typography variant="body2" color="text.secondary">
      Types: {pokemon.types.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}
     </Typography>
    </CardContent>
   </Card>
  );
 };

 export default PokemonCard;