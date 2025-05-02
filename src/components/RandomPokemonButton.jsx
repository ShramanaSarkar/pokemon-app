import React, { useContext, useCallback } from 'react';
    import { Button } from '@mui/material';
    import { PokedexContext } from '../contexts/PokedexContext';
    import { useNavigate } from 'react-router-dom';

    const RandomPokemonButton = () => {
      const { pokemonList } = useContext(PokedexContext);
      const navigate = useNavigate();

      const handleRandomClick = useCallback(() => {
        if (pokemonList.length > 0) {
          const randomIndex = Math.floor(Math.random() * pokemonList.length);
          navigate(`/pokemon/${pokemonList[randomIndex].name}`);
        }
      }, [pokemonList, navigate]);

      return (
        <Button variant="contained" onClick={handleRandomClick}>
          Random Pokémon
        </Button>
      );
    };

    export default RandomPokemonButton;