import React from 'react';
import Select from '../Select/Select';
import  "./CityInfo.css";

const CityInfo = ({value, options, onBlur, onChange, error, type}) => {
  let placeholder = options && options[0] || { name: 'Владивосток' } ;
  let address, phones, price = '';
  if (value) {
    address = value.address
    phones = value.phones.map((phone) => <a key={phone} href={'tel:'+phone}>{phone}</a>)
    phones = phones.length && phones.reduce((prev, curr) => [prev, ', ', curr]) || '';
    price = value.price
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
        <div className='city-info__sub'>
          {address && <p>{address} </p>}
          {phones && <p>{phones}</p>}
          {price && <p>Стоимость услуги {price} ₽</p>}
        </div>
    </div>
)};

export default CityInfo;