import React from "react";
import { connect } from 'react-redux'

import { format } from 'date-fns';
import ru from "date-fns/locale/ru";

import  "./Form.css";

import { getCities, getCityDate } from '../../actions/citiesActions';
import { addItem } from '../../actions/ordersActions';

import TextField from '../TextField/TextField';
import Select from '../Select/Select';
import CityInfo from '../CityInfo/CityInfo';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

class Form extends React.Component {
  state = {
    cityValue: '',
    dayValue: '',
    dayError: null,
    hoursValue: '',
    hoursError: null,
    phoneValue: '',
    phoneError: null,
    fioValue: '',
    fioError: null,
  };

  placeholder = { name: 'Владивосток' };

  componentDidMount() {
    this.props.getCitiesAction();
  }

  componentDidUpdate() {
    const { cityOptions } = this.props.cities;
    const value = cityOptions[0];
    !this.state.cityValue && value && this.setCity(value);
  }

  setCity = (value) => {
    this.setState({cityValue: value, dayValue: null, hoursValue: null});
    this.props.getCityDateAction(value.id)
  }

  setDay = (value) => {
    this.setState({dayValue: value, dayError: ''});
  }

  setHours = (value) => {
    this.setState({hoursValue: value, dayError: ''});
  }

  validateName = name => {
    const regex = /[A-Za-z]{3,}|[А-Я,а-яё]{3,}/;
    return !regex.test(name)
      ? "Пожалуйста, укажите имя"
      : "";
  };

  validatePhone = phone => {
    const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return !regex.test(phone)
      ? 'Пожалуйста, введите корректный телефон, наче наши специалисты не смогут вязаться с вами'
      : '';
  };

  validateIsRequired = value => {
    return !value ? 'Пожалуйста, выберите время' : '';
  }

  onBlur = (type) => {
    const { fioValue, phoneValue, dayValue, hoursValue } = this.state;
    switch (type) {
      case 'fio':
        const fioError = this.validateName(fioValue);
        this.setState({ fioError });
        break;
      case 'phone':
        const phoneError = this.validatePhone(phoneValue);
        this.setState({ phoneError });
        break;
      case 'day':
        const dayError = this.validateIsRequired(dayValue);
        this.setState({ dayError });
        break;
      case 'hours':
        const hoursError = this.validateIsRequired(hoursValue);
        this.setState({ dayError: hoursError });
        break;
      default:
        break;
    }
  };

  onFioChange = event => this.setState({fioValue: event.target.value, fioError: this.validateName(event.target.value)});
  onPhoneChange = event =>{
    const val = event.target.value.replace(/^(\+7|7|8)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    this.setState({phoneValue: val, phoneError: this.validatePhone(val)})
  };

  isValidForm = () => {
    const { phoneError, fioError, dayError, cityValue, dayValue, hoursValue, phoneValue, fioValue } = this.state;
    const errors = phoneError === null || dayError=== null || fioError === null;
    const values = !!(cityValue && dayValue && hoursValue && phoneValue && fioValue);
    return !(phoneError || dayError || fioError) && !errors && values;
  }

  onSumbit = () => {
    const { cityValue, dayValue, hoursValue, phoneValue, fioValue } = this.state;
    const validForm = this.isValidForm();
    if (validForm) {
      this.props.addItemAction({cityValue, dayValue, hoursValue, phoneValue, fioValue})
      this.setState({fioValue: '', phoneValue: '', dayValue: '', hoursValue: ''});
    }
  }

  render() {
    const { phoneError, fioError, dayError, cityValue, dayValue, hoursValue, phoneValue, fioValue } = this.state;
    const { cityOptions, dateOptions, isFetching } = this.props.cities;
    const hoursOptions = this.state.dayValue && this.state.dayValue.hours || [];
    const validForm = this.isValidForm();
    return (
      <div className='form'>
        <div>
          <CityInfo
            type={'city'}
            value={cityValue}
            options={cityOptions}
            onChange={this.setCity}/>
        </div>
        <div className='form__row'>
          <Select
            type={'day'}
            placeholder={'Дата'}
            onBlur={this.onBlur}
            value={dayValue}
            options={dateOptions}
            onChange={this.setDay}
            renderValue={(value) => value && format(new Date(value.date), "EEEE, d MMMM", { locale: ru })}
            error={dayError} />
          <Select
            type={'hours'}
            placeholder={'Время'}
            onBlur={this.onBlur}
            value={hoursValue}
            options={hoursOptions}
            onChange={this.setHours}
            renderValue={(value) => value &&`${value.begin}-${value.end}`} />
        </div>
        <div>
          <TextField
            type={'phone'}
            value={phoneValue}
            placeholder={'+7 (___) ___-__-__'}
            onChange={this.onPhoneChange}
            onBlur={this.onBlur}
            error={phoneError} />
        </div>
        <div>
          <TextField
            type={'fio'}
            value={fioValue}
            placeholder={'Ваше Имя'}
            onChange={this.onFioChange}
            onBlur={this.onBlur}
            error={fioError} />
        </div>
        <div className='form__footer'>
          <Button onClick={this.onSumbit} title={'Записаться'} disabled={!validForm}/>
        </div>
        {isFetching && <Loader />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCitiesAction: () => dispatch(getCities()),
    getCityDateAction: (id) => dispatch(getCityDate(id)),
    addItemAction: (data) => dispatch(addItem(data))
  }
}

const mapStateToProps = (store) => {
  return {
    cities: store.cities,
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Form);