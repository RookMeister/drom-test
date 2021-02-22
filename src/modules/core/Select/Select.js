import { useState, useEffect, useRef } from 'react';
import './Select.css';

const Option = ({value, onChange, renderValue}) => {
  let name = renderValue(value);
  return (
    <div onClick={() => onChange(value)}>{name}</div>
  )
};


const Select = ({type, value, placeholder, options ,onChange, onBlur, renderValue, error}) => {
  const [isOpen, setOpen] = useState(false);

  const toggleContainer = useRef(null);
  const buttonContainer = useRef(null);

  const onClickOutsideHandler = (event) => {
    if (isOpen && !toggleContainer.current.contains(event.target)) {
      setOpen(false);
      onBlur(type);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);

    return function cleanup() {
      window.removeEventListener('click', onClickOutsideHandler);
    }
  })

  const changeToggle = () => {
    setOpen(!isOpen);
    !isOpen && buttonContainer.current.focus();
  };
  const handleToggleClick = () => options.length && changeToggle();
  const setValue = (val) => {
    onChange(val);
    changeToggle();
  };

  const name = renderValue(value);
  const optionItems = options.map((city) =>
    <Option renderValue={renderValue} onChange={setValue} key={renderValue(city)} value={city} />
  );

  return (
    <div>
      <div className='select' ref={toggleContainer}>
        <button ref={buttonContainer} onClick={handleToggleClick} className={isOpen ? 'focus' : ''}>
          {name ? <span className='select__value'>{name}</span> : <span className='select__placeholder'>{placeholder}</span>}
        </button>
        <svg width="10" height="6" viewBox="0 0 10 6">
          <path d="M1.429.253a.819.819 0 0 0-1.184 0 .883.883 0 0 0 0 1.22l4.142 4.274A.821.821 0 0 0 5 6a.821.821 0 0 0 .612-.253l4.143-4.273a.883.883 0 0 0 0-1.221.819.819 0 0 0-1.184 0L5 3.937 1.429.253z" fill="currentColor"></path>
        </svg>
        { isOpen && <div className='select__dropdown'> {optionItems} </div> }
      </div>
      {error && <div className='error'>{error}</div>}
    </div>
  );
};


export default Select;