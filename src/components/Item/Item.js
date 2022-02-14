import * as React from 'react';

import { StyledItem, StyledColumn } from '../../styles/StyledItem';
import { StyledButtonSmall } from '../../styles/StyledButton';

const Item = ({item, onRemoveItem}) => {
  const {url, title, author, num_comments, points} = item;

  return (<StyledItem>
    <StyledColumn width="40%">
      <a href={url}>{title} </a>
    </StyledColumn>
    <StyledColumn width="30%">{author} </StyledColumn>
    <StyledColumn width="10%">{num_comments} </StyledColumn>
    <StyledColumn width="10%">{points} </StyledColumn>
    <StyledColumn width="10%">
      <StyledButtonSmall 
        type='button'
        onClick={() => onRemoveItem(item)}
      >
        Dismiss
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>);
}

export default Item;
