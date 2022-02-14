import * as React from 'react';
import InputWithLabel from '../InputWithLabel/InputWithLabel';

import { StyledSearchForm } from '../../styles/StyledSearchForm';
import { StyledButtonLarge } from '../../styles/StyledButton';

const SearchForm = ({searchTerm, handleSearchInput, handleSearchSubmit}) => {
  return <StyledSearchForm onSubmit={handleSearchSubmit}>
    <InputWithLabel
      htmlFor='search'
      id='search'
      value={searchTerm}
      isFocused
      onInputChange={handleSearchInput}
    >
      <strong>Search: </strong>
    </InputWithLabel>
    <StyledButtonLarge
      type='submit'
      disabled={!searchTerm}  
    >
      Submit
    </StyledButtonLarge>
    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </StyledSearchForm>
}

export default SearchForm;
