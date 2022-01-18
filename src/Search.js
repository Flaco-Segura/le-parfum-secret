import * as React from 'react';

const Search = ({searchTerm, onSearch}) => {
  const handleChange = event => {
    onSearch(event)
  };

  return <div>
    <label htmlFor='search'>Search: </label>
    <input id='search' type='text' onChange={handleChange}/>
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </div>
}

export default Search;
