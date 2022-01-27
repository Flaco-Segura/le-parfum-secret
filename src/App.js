import * as React from 'react';

import Search from './components/Search/Search';
import List from './components/List/List';

import storiesReducer from './reducers/storiesReducer';

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

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: isLoading, isError: isError }
  );

  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}react`)
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({type: 'STORIES_FETCH_FAILURE'}))
  }, []);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  console.log(stories);
  
  const searchedStories = stories.data.filter( story => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  return <div>  
    <h1>My Hacker Stories</h1>

    <Search onSearch={handleSearch} searchTerm={searchTerm} />      

    <hr />

    {stories.isError && <p>Something went error...</p>}

    {stories.isLoading ?
      (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )
    }      
  </div>
}

export default App;
