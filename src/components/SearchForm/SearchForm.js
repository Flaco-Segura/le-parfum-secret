import * as React from 'react';
import { InputWithLabel } from '../InputWithLabel/InputWithLabel';

import './searchForm.css';

const SearchForm = ({searchTerm, handleSearchInput, handleSearchSubmit}) => {
  return <form onSubmit={handleSearchSubmit} className='search-form'>
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
      type='submit'
      disabled={!searchTerm}
      className='button button_large'  
    >
      Submit
    </button>
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </form>
}

export { SearchForm };
