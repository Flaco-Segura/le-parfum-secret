import * as React from 'react';

const Item = ({url, title, author, num_comments, points}) => 
  <li>
    <span>
      <a href={url}>{title} </a>
    </span>
    <span>{author} </span>
    <span>{num_comments} </span>
    <span>{points} </span>
  </li>

export default Item;
