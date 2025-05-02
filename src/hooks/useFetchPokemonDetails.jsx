import { useState, useEffect } from 'react';

const useFetchPokemonDetails = (pokemonName) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      setPokemonDetails(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error(`Could not fetch ${pokemonName}`);
        }
        const data = await response.json();

        // Fetch species data for evolution chain
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        setPokemonDetails({ ...data, evolutionChain: evolutionData.chain });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (pokemonName) {
      fetchDetails();
    }
  }, [pokemonName]);

  return { pokemonDetails, loading, error };
};

export default useFetchPokemonDetails;