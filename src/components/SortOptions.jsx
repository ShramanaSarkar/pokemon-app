import React, { useContext } from 'react';
    import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
    import { PokedexContext } from '../contexts/PokedexContext';

    const SortOptions = () => {
      const { sortOption, setSortOption } = useContext(PokedexContext);

      const handleChange = (event) => {
        setSortOption(event.target.value);
      };

      return (
        <FormControl variant="outlined">
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sortOption}
            onChange={handleChange}
            label="Sort By"
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="name_asc">Name (A-Z)</MenuItem>
            <MenuItem value="name_desc">Name (Z-A)</MenuItem>
          </Select>
        </FormControl>
      );
    };

    export default SortOptions;