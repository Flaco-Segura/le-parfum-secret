import * as React from 'react';

import './inputWithLabel.css';

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
      <label htmlFor={id} className='label'>{children}</label>
      &nbsp;
      <div class="inputwithlabel_container">
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
          className='continer__input'
        />
        <div className='search_icon_container'>
          <div className='search_icon'></div>
        </div>
      </div>
    </>
  )
};

export default InputWithLabel;