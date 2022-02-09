import * as React from 'react';

import styles from './inputWithLabel.module.css';

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
      <div className={styles.inputwithlabel_container}>
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
          className={styles.container__input}
        />
        <div className={styles.search_icon_container}>
          <div className={styles.search_icon}></div>
        </div>
      </div>
    </>
  )
};

export default InputWithLabel;