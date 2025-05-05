import React, { useContext } from "react";
import {
  Pagination as MuiPagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { PokedexContext } from "../contexts/PokedexContext";

const Pagination = ({ totalPages }) => {
  const { currentPage, setCurrentPage, itemsPerPage, setItemsPerPage } =
    useContext(PokedexContext);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
      />
      <FormControl variant="outlined" size="small">
        <InputLabel id="items-per-page-label">Items</InputLabel>
        <Select
          labelId="items-per-page-label"
          id="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          label="Items per page"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Pagination;
