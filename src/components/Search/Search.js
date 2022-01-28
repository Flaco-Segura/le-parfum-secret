import * as React from 'react';
import InputWithLabel from '../InputWithLabel/InputWithLabel';

const Search = ({searchTerm, handleSearchInput, handleSearchSubmit}) => {
  return <div>
    <InputWithLabel
      htmlFor='search'
      id='search'
      value={searchTerm}
      isFocused
      onInputChange={handleSearchInput}
    >
      <strong>Search: </strong>
    </InputWithLabel>
    <button
      type='button'
      disabled={!searchTerm}
      onClick={handleSearchSubmit}
    >
      Submit
    </button>
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </div>
}

export default Search;
