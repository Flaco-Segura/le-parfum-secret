import * as React from 'react';

import styles from './item.module.css';

const Item = ({item, onRemoveItem}) => {
  const {url, title, author, num_comments, points} = item;

  return (<li className={styles.item}>
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
        className='button button_small'
      >
        Dismiss
      </button>
    </span>
  </li>);
}

export default Item;
