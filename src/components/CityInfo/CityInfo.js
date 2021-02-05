import React from 'react';
import Select from '../Select/Select';

const CityInfo = ({value, placeholder, options, onClick, onBlur, onChange, error}) => {
  console.log(123, placeholder);
  return (
    <div className='city-info'>
      <Select
        value={value}
        placeholder={placeholder && placeholder.name }
        options={options}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        error={error} />
        <div>
          {value && value.address}{<br/>}
          {value && value.phones.join(', ')}<br/>
          {value && value.price}<br/>
        </div>
    </div>
)};

export default CityInfo;