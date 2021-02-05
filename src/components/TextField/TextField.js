import React from 'react'
import './TextField.css';

const TextField = ({name, placeholder, onChange, onBlur, error}) => (
  <div className='text-field'>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div>{error}</div>}
  </div>
);

export default TextField;