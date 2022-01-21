import * as React from 'react';

const Item = ({item, onRemoveItem}) => {
  const {url, title, author, num_comments, points} = item;

  return (<li>
    <span>
      <a href={url}>{title} </a>
    </span>
    <span>{author} </span>
    <span>{num_comments} </span>
    <span>{points} </span>
    <span>
      <button type='button' onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>);
}

export default Item;
