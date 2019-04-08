import React from 'react';

export class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.calculateValue(this.state.value);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">BTC</span>
          </div>
          <input
            type="number" min="0" step="0.0001"
            value={this.state.value} onChange={this.handleChange}
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
