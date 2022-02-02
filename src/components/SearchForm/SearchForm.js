import * as React from 'react';
import InputWithLabel from '../InputWithLabel/InputWithLabel';

const SearchForm = ({searchTerm, handleSearchInput, handleSearchSubmit}) => {
  return <form onSubmit={handleSearchSubmit}>
    <InputWithLabel
      htmlFor='search'
      id='search'
      value={searchTerm}
      isFocused
      onInputChange={handleSearchInput}
    >
      <strong>Search: </strong>
    </InputWithLabel>
    <button type='submit' disabled={!searchTerm}>
      Submit
    </button>
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </form>
}

export default SearchForm;
