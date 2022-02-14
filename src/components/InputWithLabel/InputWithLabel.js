import * as React from 'react';

import { StyledLabel } from '../../styles/StyledLabel';
import { StyledInputWithLabelContainer, StyledInputWithLabelIconContainer, StyledInputWithLabelInput, StyledInputWithLabelSearchIcon } from '../../styles/StyledInputWithLabel';

const InputWithLabel = ({
  id,
  value,
  type='text',
  onInputChange,
  isFocused,
  children
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
      &nbsp;
      <StyledInputWithLabelContainer>
        <StyledInputWithLabelInput
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
        />
        <StyledInputWithLabelIconContainer>
          <StyledInputWithLabelSearchIcon></StyledInputWithLabelSearchIcon>
        </StyledInputWithLabelIconContainer>
      </StyledInputWithLabelContainer>
    </>
  )
};

export default InputWithLabel;