import * as React from 'react';

import Item from '../Item/Item';

import { ListProps } from '../../types/ListType';

const List = React.memo(({list, onRemoveItem}: ListProps) => 
<ul> 
  {
    list.map(
      (item) => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>
    )
  }
</ul>);

export default List;
