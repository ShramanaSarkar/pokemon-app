import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));


const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              types: details.types.map((type) => type.type.name),
              sprites: details.sprites.front_default,
            };
          })
        );

        setPokemonList(detailedPokemon);
        setLoading(false);

        const uniqueTypes = new Set();
        detailedPokemon.forEach((pokemon) => {
          pokemon.types.forEach((type) => uniqueTypes.add(type));
        });
        setAllTypes(['', ...Array.from(uniqueTypes).sort()]);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = filterType ? pokemon.types.includes(filterType) : true;
    return nameMatch && typeMatch;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Error fetching Pokémon data: {error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#ef5350' }}>
        <Toolbar>
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Pokedex Logo" style={{ height: '40px', marginRight: '16px' }} />
          <Typography variant="h6">Pokedex Explorer</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
          <TextField
            fullWidth
            label="Search Pokémon"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ minWidth: { sm: '150px' } }}>
            <InputLabel id="type-filter-label">Filter by Type</InputLabel>
            <Select
              labelId="type-filter-label"
              id="type-filter"
              value={filterType}
              onChange={handleFilterChange}
              label="Filter by Type"
            >
              {allTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type || 'All Types'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {filteredPokemon.length === 0 ? (
          <Typography variant="subtitle1">No Pokémon found matching your criteria.</Typography>
        ) : (
          <Grid container spacing={3} justifyContent={'space-between'}>
            {filteredPokemon.map((pokemon) => (
              <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3} width="250px">
                <StyledCard>
                  <CardMedia
                    component="img"
                    sx={{ height: 140, objectFit: 'contain', backgroundColor: '#f0f0f0' }}
                    image={pokemon.sprites}
                    alt={pokemon.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: #{pokemon.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Types: {pokemon.types.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default App;