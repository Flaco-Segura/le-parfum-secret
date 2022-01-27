import * as React from 'react';

import Search from './components/Search/Search';
import List from './components/List/List';

import storiesReducer from './reducers/storiesReducer';

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const getAsyncStories = () => new Promise(resolve => 
  setTimeout(
    () => resolve({data: {stories: initialStories}}), 2000
  )  
);

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

    getAsyncStories()
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.stories
        })
      })
      .catch(
        () => dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
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
