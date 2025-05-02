import React, { useContext } from 'react';
    import { Pagination as MuiPagination } from '@mui/material';
    import { PokedexContext } from '../contexts/PokedexContext';

    const Pagination = ({ totalPages }) => {
      const { currentPage, setCurrentPage } = useContext(PokedexContext);

      const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
      };

      return (
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      );
    };

    export default Pagination;