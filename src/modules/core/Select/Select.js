import React from 'react';
import './Select.css';

class Option extends React.Component {

  setValue(value) {
    this.props.onChange(value);
  }

  render() {
    let name = this.props.renderValue(this.props.value);
    return <div onClick={this.setValue.bind(this, this.props.value)}>{name}</div>;
  }
}

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    this.toggleContainer = React.createRef()
    this.buttonContainer = React.createRef()
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    window.addEventListener(
      'click',
      this.onClickOutsideHandler
    )
  }

  componentWillUnmount() {
    window.removeEventListener(
      'click',
      this.onClickOutsideHandler
    )
  }

  onClickOutsideHandler(event) {
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ isOpen: false })
      this.props.onBlur(this.props.type);
    }
  }

  changeToggle() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
    !this.state.isOpen && this.buttonContainer.current.focus();
  }

  handleToggleClick() {
    if (this.props.options.length) {
      this.changeToggle();
    }
  }

  setValue(value) {
    this.props.onChange(value);
    this.changeToggle();
  }

  render() {
    const {error, renderValue, value, placeholder} = this.props
    const isOpen = this.state.isOpen;
    const cities = this.props.options || [];
    const name = renderValue(value);
    const optionItems = cities.map((city) =>
      <Option renderValue={renderValue} onChange={this.setValue} key={renderValue(city)} value={city} />
    );
    return (
      <div>
        <div className='select' ref={this.toggleContainer}>
          <button ref={this.buttonContainer} onClick={this.handleToggleClick} className={isOpen ? 'focus' : ''}>
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
  }
}

export default Select;