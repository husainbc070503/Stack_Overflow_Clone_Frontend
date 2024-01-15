import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ fromTags, title, search, handleChange }) => {
  return (
    <FormControl sx={{ width: fromTags ? "50%" : "65%" }} className="FormControl search-box">
      <InputLabel htmlFor="outlined-adornment-search">{title}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-search"
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label={title}
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default SearchBox;
