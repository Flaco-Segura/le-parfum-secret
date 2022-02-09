import * as React from 'react';

import InputWithLabel from '../InputWithLabel/InputWithLabel';

import styles from './searchForm.module.css';

const SearchForm = ({searchTerm, handleSearchInput, handleSearchSubmit}) => {
  return <form onSubmit={handleSearchSubmit} className={styles.SearchForm}>
    <div className={styles.searchFormLine}>
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
        className='button buttonLarge'  
      >
        Submit
      </button>
    </div>
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </form>
}

export default SearchForm;
