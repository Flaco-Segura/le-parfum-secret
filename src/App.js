import * as React from 'react';

import Search from './Search';
import List from './List';

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
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');

  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories().then(result => {
      setStories(result.data.stories);
      setIsLoading(false);
    }).catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = item => {
    console.log(item.objectID)
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );

    setStories(newStories);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  
  const searchedStories = stories.filter( story => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  return <div>  
    <h1>My Hacker Stories</h1>

    <Search onSearch={handleSearch} searchTerm={searchTerm} />      

    <hr />

    {isError && <p>Something went error...</p>}

    {isLoading ?
      (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )
    }      
  </div>
}

export default App;
