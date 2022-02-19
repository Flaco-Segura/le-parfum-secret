import * as React from 'react';
import InputWithLabel from '../InputWithLabel/InputWithLabel';

import './searchForm.css';

import { SearchFormProps } from '../../types/SearchFormType';

const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}: SearchFormProps) => {
  return <form onSubmit={onSearchSubmit} className='search-form'>
    <InputWithLabel
      // htmlFor='search'
      id='search'
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
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

export default SearchForm;
