import React from 'react';
import Button from '@modules/core/Button/Button';
import './Table.css';

import { format } from 'date-fns';
import ru from "date-fns/locale/ru";

class Item extends React.Component {

  del(id) {
    this.props.deleteItem(id);
  }

  render() {
    let value = this.props.value;
    return <tr>
        <td>{value.cityValue.name}</td>
        <td>{value.cityValue.address}</td>
        <td>{format(new Date(value.dayValue.date), "EEEE, d MMMM", { locale: ru })}</td>
        <td>{`${value.hoursValue.begin}-${value.hoursValue.end}`}</td>
        <td>{value.phoneValue}</td>
        <td>{value.fioValue}</td>
        <td><Button onClick={this.del.bind(this, this.props.index)} title={'Удалить'}/></td>
      </tr>;
  }
}

const Table = ({data, deleteItem}) => {
  const items = data.length && data.map((item, index) =>
      <Item key={index} index={index} value={item} deleteItem={deleteItem}/>
    ) || <tr><td colSpan="6">Пусто</td></tr>;
  return (
    <table>
      <thead>
        <tr>
          <th>Город</th>
          <th>Адрес</th>
          <th>День</th>
          <th>Время</th>
          <th>Номер телефона</th>
          <th>Имя</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  )
};

export default Table;