import React, { useState, Fragment } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState([]);

  const onChange = (e) => {
    searchMovie(e.target.value);
  };

  const searchMovie = async (movie) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=e303bacd98bdfe6244014f8c8f687ec9`
    );
    const data = await res.json();
    const results = data.results;
    setSearch(results);
    console.log(results);
  };

  return (
    <div>
      <form id='search-bar'>
        <input
          type='text'
          name='search'
          id='search'
          onChange={onChange}
          placeholder='Search'
        />
        <ul id='search_results'>
          {search
            ? search.map((s, idx) => {
                return <a href={`/m/${s.id}`}>{s.title}</a>;
              })
            : ''}
        </ul>
      </form>
    </div>
  );
};

export default SearchBar;
