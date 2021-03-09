import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../api';

const url = 'https://image.tmdb.org/t/p/w500/';

const SearchBar = () => {
  const [search, setSearch] = useState([]);

  const onChange = (e) => {
    searchMovie(e.target.value);
  };

  const searchMovie = async (movie) => {
    const res = await API.searchMovie(movie);
    const data = await res.json();

    const results = data.results;
    setSearch(results);
  };

  return (
    <div class='autocomplete'>
      <form id='search-bar'>
        <input
          type='text'
          name='search'
          id='search'
          class='form-control'
          onChange={onChange}
          placeholder='Search'
          autoComplete='off'
        />
      </form>
      <div className='autocomplete-content'>
        {search
          ? search.map((s, idx) => {
              return (
                <div>
                  <a href={`/m/${s.id}`} class='row'>
                    <img
                      src={url + s.poster_path}
                      alt=''
                      class='col-5 search_result_img'
                    />
                    <p class='col-5 justify-content-center'>{s.title}</p>
                  </a>
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default SearchBar;
