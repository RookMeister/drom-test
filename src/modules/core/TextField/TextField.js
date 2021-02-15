import React from 'react'
import './TextField.css';

const TextField = ({value, placeholder, onChange, onBlur, error, type}) => {
  const blur = () => onBlur(type);
  return (
    <div className='text-field'>
      <input
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={blur}
      />
      {error && <div className='error'>{error}</div>}
    </div>
  )
};

export default TextField;