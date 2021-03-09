import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as API from '../../api';

const url = 'https://image.tmdb.org/t/p/w500/';

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [hideResults, setHideResults] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setHideResults(true);
  }, [location]);

  const onChange = (e) => {
    setSearch(e.target.value);
    searchMovie(search);
    setHideResults(false);
  };

  const searchMovie = async (movie) => {
    const res = await API.searchMovie(movie);
    const data = await res.json();

    const results = data.results;
    setSearchResults(results);
  };

  return (
    <div className='autocomplete'>
      <form id='search-bar'>
        <input
          type='text'
          name='search'
          id='search'
          value={search}
          className='form-control'
          onChange={onChange}
          placeholder='Search'
          autoComplete='off'
        />
      </form>
      <div className='autocomplete-content'>
        {searchResults && !hideResults
          ? searchResults.map((s, idx) => {
              return (
                <div>
                  <Link to={`/m/${s.id}`} class='row'>
                    <img
                      src={url + s.poster_path}
                      alt=''
                      className='col-5 search_result_img'
                    />
                    <p className='col-5 justify-content-center'>{s.title}</p>
                  </Link>
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default SearchBar;
