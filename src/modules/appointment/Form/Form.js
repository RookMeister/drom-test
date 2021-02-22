import React , { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { format } from 'date-fns';
import ru from "date-fns/locale/ru";

import  "./Form.css";

// import { getCities, getCityDate } from '@actions/citiesActions';
import { addItem } from '@actions/ordersActions';

import TextField from '@modules/core/TextField/TextField';
import Select from '@modules/core/Select/Select';
import CityInfo from '@modules/appointment/CityInfo/CityInfo';
import Loader from '@modules/core/Loader/Loader';
import Button from '@modules/core/Button/Button';

const formConst = {
  city: {value: '', error: null},
  day: {value: '', error: null},
  hours: {value: '', error: null},
  phone: {value: '', error: null},
  fio: {value: '', error: null},
}

const getCities = async () => {
  const url = 'https://www.mocky.io/v2/5b34c0d82f00007400376066?mocky-delay=700ms';
  const response = await fetch(url);
  return response.json();
}

const getDays = async (id) => {
  const url = `https://www.mocky.io/v2/${id}?mocky-delay=700ms`;
  let response = await fetch(url);
  let {data} = await response.json();

  const keyData = Object.keys(data);
  return keyData.map((item) => {
    const hours = Object.values(data[item]);
    return {date: item, hours: hours.filter((el) => !el.is_not_free)};
  }).filter((item) => item.hours.length > 0);
}

const validateName = name => {
  const regex = /[A-Za-z]{3,}|[А-Я,а-яё]{3,}/;
  return !regex.test(name)
    ? "Пожалуйста, укажите имя"
    : "";
};

const validatePhone = phone => {
  const regex = /^(\+7|7|8){1}?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return !regex.test(phone)
    ? 'Пожалуйста, введите корректный телефон, наче наши специалисты не смогут вязаться с вами'
    : '';
};

const isValidForm = (form) => {
  const { phone, fio, day, city, hours } = form;
  const errors = phone.error === null || day.error=== null || fio.error === null;
  const values = !!(city.value && day.value && hours.value && phone.value && fio.value);
  return !(phone.error || day.error || fio.error) && !errors && values;
}

const validateIsRequired = value => !value ? 'Пожалуйста, выберите время' : '';

const FormComponent = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(formConst);
  const [isFetching, setFetching] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);

  const { phone, fio, day, city, hours } = form;

  const hoursOptions = (day.value && day.value.hours) || [];

  const validForm = isValidForm(form);

  const setCity = async (value) => {
    setFetching(true);
    setForm({...form, city: {value, error: null}, day: {value: null, error: null}, hours: {value: null, error: null}})
    const data = await getDays(value.id);
    setDateOptions(data);
    setFetching(false)
  }

  const onPhoneChange = event =>{
    const val = event.target.value.replace(/^(\+7|7|8)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    setForm((prevState) => {return {...prevState, phone: {value: val, error: validatePhone(val)}}});
  };

  const onBlur = (type) => {
    switch (type) {
      case 'fio':
        setForm((prevState) => {return {...prevState, fio: {...prevState.fio, error: validateName(prevState.fio.value)}}});
        break;
      case 'phone':
        setForm((prevState) => {return {...prevState, phone: {...prevState.phone, error: validatePhone(prevState.phone.value)}}});
        break;
      case 'day':
        setForm((prevState) => {return {...prevState, day: {...prevState.day, error: validateIsRequired(prevState.day.value)}}});
        break;
      case 'hours':
        setForm((prevState) => {return {...prevState, hours: {...prevState.hours, error: validateIsRequired(prevState.hours.value)}}});
        break;
      default:
        break;
    }
  };

  const onSumbit = () => {
    if (validForm) {
      dispatch(addItem({cityValue: city.value, dayValue: day.value, hoursValue: hours.value, phoneValue: phone.value, fioValue: fio.value}))
      setForm((prevState) => {
        return {
          ...prevState,
          fio: {...prevState.fio, value: ''},
          phone: {...prevState.phone, value: ''},
          day: {...prevState.day, value: ''},
          hours: {...prevState.hours, value: ''},
        };
      });
    }
  }

  useEffect( () => {
    (async () => {
      setFetching(true)
      const {cities} = await getCities();
      setCityOptions(cities);
      await setCity(cities[0]);
    })();
  }, [])

  return (
    <div className='form'>
      <div>
        <CityInfo
          type={'city'}
          value={city.value}
          options={cityOptions}
          onBlur={onBlur}
          onChange={setCity}/>
      </div>
      <div className='form__row'>
        <Select
          type={'day'}
          placeholder={'Дата'}
          onBlur={onBlur}
          value={day.value}
          options={dateOptions}
          onChange={value => setForm((prevState) => {return {...prevState, day: {...prevState.day, value}}})}
          renderValue={(value) => value && format(new Date(value.date), "EEEE, d MMMM", { locale: ru })}
          error={day.error} />
        <Select
          type={'hours'}
          placeholder={'Время'}
          onBlur={onBlur}
          value={hours.value}
          options={hoursOptions}
          onChange={value => setForm((prevState) => {return {...prevState, hours: {value, error: null}}})}
          renderValue={value => value &&`${value.begin}-${value.end}`} />
      </div>
      <div>
        <TextField
          type={'phone'}
          value={phone.value}
          placeholder={'+7 (___) ___-__-__'}
          onChange={onPhoneChange}
          onBlur={onBlur}
          error={phone.error} />
      </div>
      <div>
        <TextField
          type={'fio'}
          value={fio.value}
          placeholder={'Ваше Имя'}
          onChange={event => setForm((prevState) => {return {...prevState, fio: {value: event.target.value, error: validateName(event.target.value)}}})}
          onBlur={onBlur}
          error={fio.error} />
      </div>
      <div className='form__footer'>
        <Button onClick={onSumbit} title={'Записаться'} disabled={!validForm}/>
      </div>
      {isFetching && <Loader />}
    </div>
  );

}

// class Form extends React.Component {
//   state = {
//     cityValue: '',
//     dayValue: '',
//     dayError: null,
//     hoursValue: '',
//     hoursError: null,
//     phoneValue: '',
//     phoneError: null,
//     fioValue: '',
//     fioError: null,
//   };

//   placeholder = { name: 'Владивосток' };

//   componentDidMount() {
//     this.props.getCitiesAction();
//   }

//   componentDidUpdate() {
//     const { cityOptions } = this.props.cities;
//     const value = cityOptions[0];
//     !this.state.cityValue && value && this.setCity(value);
//   }

//   setCity = (value) => {
//     this.setState({cityValue: value, dayValue: null, hoursValue: null});
//     this.props.getCityDateAction(value.id)
//   }

//   setDay = (value) => {
//     this.setState({dayValue: value, dayError: ''});
//   }

//   setHours = (value) => {
//     this.setState({hoursValue: value, dayError: ''});
//   }

//   validateName = name => {
//     const regex = /[A-Za-z]{3,}|[А-Я,а-яё]{3,}/;
//     return !regex.test(name)
//       ? "Пожалуйста, укажите имя"
//       : "";
//   };

//   validatePhone = phone => {
//     const regex = /^(\+7|7|8){1}?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
//     return !regex.test(phone)
//       ? 'Пожалуйста, введите корректный телефон, наче наши специалисты не смогут вязаться с вами'
//       : '';
//   };

//   validateIsRequired = value => {
//     return !value ? 'Пожалуйста, выберите время' : '';
//   }

//   onBlur = (type) => {
//     const { fioValue, phoneValue, dayValue, hoursValue } = this.state;
//     switch (type) {
//       case 'fio':
//         const fioError = this.validateName(fioValue);
//         this.setState({ fioError });
//         break;
//       case 'phone':
//         const phoneError = this.validatePhone(phoneValue);
//         this.setState({ phoneError });
//         break;
//       case 'day':
//         const dayError = this.validateIsRequired(dayValue);
//         this.setState({ dayError });
//         break;
//       case 'hours':
//         const hoursError = this.validateIsRequired(hoursValue);
//         this.setState({ dayError: hoursError });
//         break;
//       default:
//         break;
//     }
//   };

//   onFioChange = event => this.setState({fioValue: event.target.value, fioError: this.validateName(event.target.value)});
//   onPhoneChange = event =>{
//     const val = event.target.value.replace(/^(\+7|7|8)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
//     this.setState({phoneValue: val, phoneError: this.validatePhone(val)})
//   };

//   isValidForm = () => {
//     const { phoneError, fioError, dayError, cityValue, dayValue, hoursValue, phoneValue, fioValue } = this.state;
//     const errors = phoneError === null || dayError=== null || fioError === null;
//     const values = !!(cityValue && dayValue && hoursValue && phoneValue && fioValue);
//     return !(phoneError || dayError || fioError) && !errors && values;
//   }

//   onSumbit = () => {
//     const { cityValue, dayValue, hoursValue, phoneValue, fioValue } = this.state;
//     const validForm = this.isValidForm();
//     if (validForm) {
//       this.props.addItemAction({cityValue, dayValue, hoursValue, phoneValue, fioValue})
//       this.setState({fioValue: '', phoneValue: '', dayValue: '', hoursValue: ''});
//     }
//   }

//   render() {
//     const { phoneError, fioError, dayError, cityValue, dayValue, hoursValue, phoneValue, fioValue } = this.state;
//     const { cityOptions, dateOptions, isFetching } = this.props.cities;
//     const hoursOptions = (this.state.dayValue && this.state.dayValue.hours) || [];
//     const validForm = this.isValidForm();
//     return (
//       <div className='form'>
//         <div>
//           <CityInfo
//             type={'city'}
//             value={cityValue}
//             options={cityOptions}
//             onBlur={this.onBlur}
//             onChange={this.setCity}/>
//         </div>
//         <div className='form__row'>
//           <Select
//             type={'day'}
//             placeholder={'Дата'}
//             onBlur={this.onBlur}
//             value={dayValue}
//             options={dateOptions}
//             onChange={this.setDay}
//             renderValue={(value) => value && format(new Date(value.date), "EEEE, d MMMM", { locale: ru })}
//             error={dayError} />
//           <Select
//             type={'hours'}
//             placeholder={'Время'}
//             onBlur={this.onBlur}
//             value={hoursValue}
//             options={hoursOptions}
//             onChange={this.setHours}
//             renderValue={(value) => value &&`${value.begin}-${value.end}`} />
//         </div>
//         <div>
//           <TextField
//             type={'phone'}
//             value={phoneValue}
//             placeholder={'+7 (___) ___-__-__'}
//             onChange={this.onPhoneChange}
//             onBlur={this.onBlur}
//             error={phoneError} />
//         </div>
//         <div>
//           <TextField
//             type={'fio'}
//             value={fioValue}
//             placeholder={'Ваше Имя'}
//             onChange={this.onFioChange}
//             onBlur={this.onBlur}
//             error={fioError} />
//         </div>
//         <div className='form__footer'>
//           <Button onClick={this.onSumbit} title={'Записаться'} disabled={!validForm}/>
//         </div>
//         {isFetching && <Loader />}
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getCitiesAction: () => dispatch(getCities()),
//     getCityDateAction: (id) => dispatch(getCityDate(id)),
//     addItemAction: (data) => dispatch(addItem(data))
//   }
// }

// const mapStateToProps = (store) => {
//   return {
//     cities: store.cities,
//   }
// }

export default FormComponent;