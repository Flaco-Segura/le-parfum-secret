import * as React from 'react';

import './inputWithLabel.css';

import {InputWithLabelProps} from '../../types/InputWithLabelType';

const InputWithLabel = ({
  id,
  value,
  type='text',
  onInputChange,
  isFocused,
  children
}: InputWithLabelProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id} className='label'>{children}</label>
      &nbsp;
      <div className="inputwithlabel_container">
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