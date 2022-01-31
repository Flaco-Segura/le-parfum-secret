import * as React from 'react';
import axios from 'axios';

import Search from './components/Search/Search';
import List from './components/List/List';

import storiesReducer from './reducers/storiesReducer';

import { STORIES_FETCH_FAILURE, STORIES_FETCH_INIT, STORIES_FETCH_SUCCESS, REMOVE_STORY  } from './actions/actions';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='; 

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
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

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: isLoading, isError: isError }
  );

  const handleFetchStories = React.useCallback(() => {
    if (!searchTerm) return;

    dispatchStories({ type: STORIES_FETCH_INIT });

    axios
      .get(url)
      .then(response => response)
      .then(result => {
        dispatchStories({
          type: STORIES_FETCH_SUCCESS,
          payload: result.data.hits,
        });
      })
      .catch(() => dispatchStories({type: STORIES_FETCH_FAILURE}))
  }, [url]);

  const handleRemoveStory = item => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item,
    });
  };

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return <div>  
    <h1>My Hacker Stories</h1>

    <Search
      handleSearchInput={handleSearchInput}
      handleSearchSubmit={handleSearchSubmit}
      searchTerm={searchTerm} 
    />      

    <hr />

    {stories.isError && <p>Something went error...</p>}

    {stories.isLoading ?
      (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )
    }      
  </div>
}

export default App;
