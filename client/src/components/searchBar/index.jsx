import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import { useStyles } from './styles';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SearchBar = ({ mobile, setSearchOpen }) => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput === '') return;
    history.push(`/search/${searchInput}`);
  };

  const clearSearch = () => {
    if (mobile) {
      setSearchOpen(false);
    }
    setSearchInput('');
  };
  return (
    <div className={classes.search}>
      <form onSubmit={handleSearch}>
        <TextField
          type="search"
          placeholder="Search for posts …"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          variant="outlined"
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (searchInput || mobile) && (
              <InputAdornment position="end">
                <IconButton color="primary" size="small" onClick={clearSearch}>
                  <HighlightOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
