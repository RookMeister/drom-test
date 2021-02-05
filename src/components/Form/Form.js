import React from "react";
import { connect } from 'react-redux'

import  "./Form.css";

import { getCities } from '../../actions/citiesActions'
// import Greetings from './Greetings';
// import FirstNameField from './FirstNameField';
// import LastNameField from './LastNameField';
import TextField from '../TextField/TextField';
import CityInfo from '../CityInfo/CityInfo';
import Loader from '../Loader/Loader';

class Form extends React.Component {
  state = {
    cityValue: {},
  };

  placeholder = { name: 'Владивосток' };

  componentDidMount() {
    this.props.getCitiesAction();
  }

  componentDidUpdate() {
    // console.log(this.props);
  }

  getCity = (value) => {
    this.setState({cityValue: value});
  }

  validateName = name => {
    const regex = /[A-Za-z]{3,}/;

    return !regex.test(name)
      ? "The name must contain at least three letters. Numbers and special characters are not allowed."
      : "";
  };

  onFirstNameBlur = () => {
    const { firstName } = this.state;

    const firstNameError = this.validateName(firstName);

    return this.setState({ firstNameError });
  };

  onFirstNameChange = event =>
    this.setState({
      firstName: event.target.value
  });

  onLastNameBlur = () => {
    const { lastName } = this.state;

    const lastNameError = this.validateName(lastName);

    return this.setState({ lastNameError });
  };

  onLastNameChange = event =>
    this.setState({
      lastName: event.target.value
  });

  render() {
    const { firstNameError, firstName, lastName, lastNameError } = this.state;
    const { cities } = this.props.cities;
    const { isFetching } = this.props.cities;
    return (
      <div className='form'>
        <div>
          <CityInfo
            value={this.state.cityValue}
            placeholder={cities[0] || this.placeholder}
            options={cities}
            onChange={this.onFirstNameChange}
            onClick={this.getCity}
            onBlur={this.onFirstNameBlur}
            error={firstNameError}/>
        </div>
        <div className='form__row'>
          <TextField
            placeholder={'Дата'}
            onChange={this.onFirstNameChange}
            onBlur={this.onFirstNameBlur}
            error={firstNameError} />
            <TextField
            placeholder={'Время'}
            onChange={this.onFirstNameChange}
            onBlur={this.onFirstNameBlur}
            error={firstNameError} />
        </div>
        <div>
          <TextField
            placeholder={'+7 (___) ___-__-__'}
            onChange={this.onFirstNameChange}
            onBlur={this.onFirstNameBlur}
            error={firstNameError} />
        </div>
        <div>
          <TextField
            placeholder={'Ваше Имя'}
            onChange={this.onFirstNameChange}
            onBlur={this.onFirstNameBlur}
            error={firstNameError} />
        </div>
        {isFetching && <Loader />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCitiesAction: () => dispatch(getCities()),
  }
}

const mapStateToProps = (store) => {
  return {
    cities: store.cities,
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Form);