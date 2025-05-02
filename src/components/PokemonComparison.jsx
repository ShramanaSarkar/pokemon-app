import React, { useContext } from 'react';
    import { Box, Typography, Card, CardContent, Button } from '@mui/material';
    import { PokedexContext } from '../contexts/PokedexContext';

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
        <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</Typography>
              {pokemon1.stats.map((stat) => (
                <Typography key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </Typography>
              ))}
              <Button size="small" onClick={() => removeFromComparison(pokemon1.id)}>
                Remove
              </Button>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</Typography>
              {pokemon2.stats.map((stat) => (
                <Typography key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </Typography>
              ))}
              <Button size="small" onClick={() => removeFromComparison(pokemon2.id)}>
                Remove
              </Button>
            </CardContent>
          </Card>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Stat Differences:</Typography>
            {pokemon1.stats.map((stat, index) => (
              <Typography key={stat.stat.name}>
                {stat.stat.name}: {getStatDifference(stat.base_stat, pokemon2.stats[index].base_stat)}
              </Typography>
            ))}
          </Box>
        </Box>
      );
    };

    export default PokemonComparison;