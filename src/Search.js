import * as React from 'react';
import InputWithLabel from './InputWithLabel';

const Search = ({searchTerm, onSearch}) => {
  const handleChange = event => {
    onSearch(event)
  };

  return <div>
    <InputWithLabel
      htmlFor='search'
      label='Search:'
      id='search'
      value={searchTerm}
      onInputChange={handleChange}
    />
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </div>
}

export default Search;
