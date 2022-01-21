import * as React from 'react';
import InputWithLabel from './InputWithLabel';

const Search = ({searchTerm, onSearch}) => {
  const handleChange = event => {
    onSearch(event)
  };

  return <div>
    <InputWithLabel
      htmlFor='search'
      id='search'
      value={searchTerm}
      onInputChange={handleChange}
    >
      <strong>Search: </strong>
    </InputWithLabel>
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </div>
}

export default Search;
