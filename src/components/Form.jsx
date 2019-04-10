import React from 'react';
import PropTypes from 'prop-types';

export default class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    const { calculateValue } = this.props;
    event.preventDefault();
    calculateValue(value);
  }

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">BTC</span>
          </div>
          <input
            type="number"
            min="0"
            max="100000000000000"
            step="0.0001"
            value={value}
            onChange={this.handleChange}
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
          />
          <div className="input-group-append">
            <input className="input-group-text" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    );
  }
}

InputForm.propTypes = {
  calculateValue: PropTypes.func.isRequired,
}
