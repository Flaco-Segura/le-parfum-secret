import * as React from 'react';

import Search from './Search';
import List from './List';

const stories = [
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

const App = () => {
  const handleSearch = event => setSearchTerm(event.target.value);
  const [searchTerm, setSearchTerm] = React.useState('');
  const searchedStories = stories.filter( story => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return <div>  
    <h1>My Hacker Stories</h1>

    <Search onSearch={handleSearch} searchTerm={searchTerm}/>      

    <hr />

    <List list={searchedStories}/>      
  </div>
}

export default App;
