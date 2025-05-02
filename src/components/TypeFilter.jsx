import React, { useState, useEffect, useContext, useMemo } from 'react';
    import { FormControl, InputLabel, Select, MenuItem, ListItemText, Checkbox } from '@mui/material';
    import { PokedexContext } from '../contexts/PokedexContext';

    const TypeFilter = () => {
      const { pokemonList, filterTypes, setFilterTypes } = useContext(PokedexContext);
      const [allTypes, setAllTypes] = useState([]);

      useEffect(() => {
        const uniqueTypes = new Set();
        pokemonList.forEach((pokemon) => {
          pokemon.types.forEach((type) => uniqueTypes.add(type));
        });
        setAllTypes(Array.from(uniqueTypes).sort());
      }, [pokemonList]);

      const handleChange = (event) => {
        setFilterTypes(event.target.value);
      };

      return (
        <FormControl sx={{ minWidth: 150 }} variant="outlined">
          <InputLabel id="multiple-type-label">Filter by Types</InputLabel>
          <Select
            labelId="multiple-type-label"
            id="multiple-type"
            multiple
            value={filterTypes}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {allTypes.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={filterTypes.includes(type)} />
                <ListItemText primary={type.charAt(0).toUpperCase() + type.slice(1)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    };

    export default TypeFilter;