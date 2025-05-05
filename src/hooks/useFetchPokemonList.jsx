import { useEffect, useContext } from 'react';
import { PokedexContext } from '../contexts/PokedexContext';

const useFetchPokemonList = () => {
  const { setLoading, setError, setPokemonList, loading, error } = useContext(PokedexContext);
  const BATCH_SIZE = 20; // Adjust this number as needed

  useEffect(() => {
    const fetchPokemonDetailsBatch = async (pokemonUrls) => {
      const detailsPromises = pokemonUrls.map(async (url) => {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            console.error('PokeAPI Detailed Response Error:', res.status, url, await res.text());
            return null;
          }
          return await res.json();
        } catch (err) {
          console.error('Error fetching details for', url, err);
          return null;
        }
      });
      return (await Promise.all(detailsPromises)).filter(Boolean);
    };

    const fetchInitialPokemonList = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) {
          console.error('PokeAPI Response Error:', response.status, await response.text());
          throw new Error('Failed to fetch initial Pokémon list.');
        }
        const data = await response.json();
        const allPokemonUrls = data.results.map((p) => p.url);
        const allPokemonDetails = [];

        for (let i = 0; i < allPokemonUrls.length; i += BATCH_SIZE) {
          const batchUrls = allPokemonUrls.slice(i, i + BATCH_SIZE);
          const batchDetails = await fetchPokemonDetailsBatch(batchUrls);
          allPokemonDetails.push(...batchDetails.map(details => ({
            id: details.id,
            name: details.name,
            types: details.types.map((type) => type.type.name),
            sprites: details.sprites.front_default,
            stats: details.stats,
            abilities: details.abilities,
            moves: details.moves,
          })));
        }

        setPokemonList(allPokemonDetails);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pokémon data:', err);
        setError('Failed to fetch Pokémon data. Please check your network connection and try again.');
        setLoading(false);
      }
    };

    fetchInitialPokemonList();
  }, [setLoading, setError, setPokemonList]);

  return { loading, error };
};

export default useFetchPokemonList;