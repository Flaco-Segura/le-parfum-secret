import * as React from 'react';

import Item from './Item';

const List = props => <ul> {props.list.map(item => <Item item={item}/>)} </ul>

export default List;
