import * as React from 'react';
import { sortBy } from 'lodash';

import { Item } from '../Item/Item';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}

const List = React.memo(({list, onRemoveItem}) => {
  const [sort, setSort] = React.useState('NONE');
  
  const handleSort = sortKey => {
    setSort(sortKey);
  }

  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);
  
  return (<ul>
    <li style={{ display: 'flex' }}>
      <span style={{ width: '40%' }}>
        <button type="button" className='button' onClick={() => handleSort('TITLE')}>
          Title
        </button>  
      </span>
      <span style={{ width: '30%' }}>
        <button type='button' className='button' onClick={() => handleSort('AUTHOR')}>
          Author  
        </button>
      </span>
      <span style={{ width: '10%' }}>
        <button type='button' className='button' onClick={() => handleSort('COMMENTS')}>
          Comments
        </button>  
      </span>
      <span style={{ width: '10%' }}>
        <button type='button' className='button' onClick={() => handleSort('POINTS')}>
          Points
        </button>
      </span>
      <span style={{ width: '10%' }}>Actions</span>
    </li>

    {
      sortedList.map(
        (item) => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
      )
    }
  </ul>);
});

export { List };
