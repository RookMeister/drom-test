import React from 'react'
import './Select.css';

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.setValue = this.setValue.bind(this);
  }

  setValue(city) {
    this.props.onClick(city);
  }

  render() {;
    return <div onClick={this.setValue.bind(this, this.props.value)}>{this.props.value.name}</div>;
  }
}

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    this.toggleContainer = React.createRef()
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
    }
  }

  handleToggleClick() {
    if (this.props.options.length) {
      this.setState(state => ({
        isOpen: !state.isOpen
      }));
    }
  }

  setValue(city) {
    this.props.onClick(city);
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  render() {
    let cities = this.props.options || [];
    let optionItems = cities.map((city) =>
      <Option onClick={this.setValue} key={city.name} value={city} />
    );
    return (
      <div className='select' ref={this.toggleContainer}>
        <button onClick={this.handleToggleClick}>
          {this.props.value ? <span className='select__value'>{this.props.value.name}</span> : <span className='select__placeholder'>{this.props.placeholder}</span>}
        </button>
        <svg width="10" height="6" viewBox="0 0 10 6">
          <path d="M1.429.253a.819.819 0 0 0-1.184 0 .883.883 0 0 0 0 1.22l4.142 4.274A.821.821 0 0 0 5 6a.821.821 0 0 0 .612-.253l4.143-4.273a.883.883 0 0 0 0-1.221.819.819 0 0 0-1.184 0L5 3.937 1.429.253z" fill="currentColor"></path>
        </svg>
        { this.state.isOpen && <div className='select__dropdown'> {optionItems} </div> }
    </div>
    );
  }
}

export default Select;