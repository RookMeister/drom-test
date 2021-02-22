import React from 'react';
import Select from '@modules/core/Select/Select';
import  "./CityInfo.css";

const CityInfo = ({value, options, onBlur, onChange, error, type}) => {
  let placeholder = (options && options[0]) || { name: 'Владивосток' } ;
  let phones = [];
  if (value) {
    phones = value.phones.map((phone) => <a key={phone} href={'tel:'+phone}>{phone}</a>)
    phones = (phones.length && phones.reduce((prev, curr) => [prev, ', ', curr]) )|| '';
  }
  return (
    <div className='city-info'>
      <Select
        type={type}
        value={value}
        placeholder={placeholder && placeholder.name }
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        renderValue={(value) => value && value.name}
        error={error} />
        {value &&
          <div className='city-info__sub'>
            <p>{value.address} </p>
            <p>{phones}</p>
            <p>Стоимость услуги {value.price} ₽</p>
          </div>
        }
    </div>
)};

export default CityInfo;