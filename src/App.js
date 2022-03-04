import * as React from 'react';
import axios from 'axios';

import './App.css';

import { SearchForm } from './components/SearchForm/SearchForm';
import { List } from './components/List/List';

import storiesReducer from './reducers/storiesReducer';

import { STORIES_FETCH_FAILURE, STORIES_FETCH_INIT, STORIES_FETCH_SUCCESS, REMOVE_STORY  } from './actions/actions';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='; 

const useSemiPersistentState = (key, initialState) => {
  const isMounted = React.useRef(false);

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const getSumComments = stories => {
  return stories.data.reduce(
    (result, value) => result + value.num_comments,
    0
  )
};

const App = () => {
  const isLoading = false;
  const isError = false;
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const handleSearchInput = event => {
    setSearchTerm(event.target.value)
  };

  const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  }

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: isLoading, isError: isError }
  );

  const sumComments = React.useMemo(
    () => getSumComments(stories), [stories]
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({type: STORIES_FETCH_FAILURE})
    }
  }, [url]);

  const handleRemoveStory = React.useCallback( item => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item,
    });
  }, []);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return <div className='container'>
    <header className='header'>
      <h1 className='headline-primary'>My Hacker Stories with {sumComments} comments.</h1>

      <SearchForm
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm} 
      />
    </header>
    
    <main>
      {stories.isError && <p>Something went error...</p>}

      {stories.isLoading ?
        (
          <p>Loading...</p>
        ) : (
          <List list={stories.data} onRemoveItem={handleRemoveStory} />
        )
      }
    </main> 
  </div>
}

export default App;
