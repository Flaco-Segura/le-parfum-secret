import * as React from 'react';

import Item from './Item';

const List = ({list}) => <ul> {
  list.map(({objectID, ...item}) => <Item key={item.objectID} {...item}/>)}
</ul>

export default List;
