import * as React from 'react';

import './item.css';
import { ReactComponent as Check } from '../../check.svg';

const Item = ({item, onRemoveItem}) => {
  const {url, title, author, num_comments, points} = item;

  return (<li className='item'>
    <span style={{ width: '40%' }}>
      <a href={url}>{title} </a>
    </span>
    <span style={{ width: '30%' }}>{author} </span>
    <span style={{ width: '10%' }}>{num_comments} </span>
    <span style={{ width: '10%' }}>{points} </span>
    <span style={{ width: '10%' }}>
      <button 
        type='button'
        onClick={() => onRemoveItem(item)}
        className='button'
      >
        <Check height="18px" width="18px" />
      </button>
    </span>
  </li>);
}

export { Item };
