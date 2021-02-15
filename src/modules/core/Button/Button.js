import React from 'react'
import './Button.css';

const Button = ({title, onClick, disabled}) => {
  return (
    <button className='button' disabled={disabled} onClick={onClick}>
      {title}
    </button>
  )
};

export default Button;