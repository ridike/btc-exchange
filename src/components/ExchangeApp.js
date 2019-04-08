import React from 'react';
import { Title, CurrencyDropdown, CurrencyValue } from './stateless';
import { InputForm } from './Form';
import FlashMessage from './FlashMessage';

const interval = require('interval-promise');
const API = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export default class ExchangeApp extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      currencies_object: {},
      currency_values: [
      	{
      		code: "EUR",
      		exchange_value: 0,
      		display: true
      	},
      	{
      		code: "USD",
      		exchange_value: 0,
      		display: true
      	},
      	{
      		code: "GBP",
      		exchange_value: 0,
      		display: true
      	}
      ],
      btc_amount: 0,
      counter: 0
    };
  }

  addAPICallCount = (function() {
    let counter = 0
    return function () {
      counter += 1;
      return counter;
    }
  })()

  async fetchExchangeData() {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const exchange_data = await response.json();
      this.setState({ currencies_object: exchange_data.bpi }, function(){
        this.calculateValue(0);
        this.state.counter ++;
        console.log("Fetching data, recalculating: "+ this.state.counter);
      });
    }
    catch (error) {
      console.log(`Error: ${error.stack}`);
    }
  }

  async componentDidMount() {
    this.fetchExchangeData()
    interval(async () => {
      this.fetchExchangeData()
    }, 60000, {iterations: 100})
  }

  displayCurrencyField = (code) => {
    const new_values = this.state.currency_values.map(c => {
      if (c.code === code) {
        c.display = true
      }
      return c
    })
    this.setState({currency_values: new_values})
  }

  hideCurrencyField = (code) => {
		let new_values = this.state.currency_values.map((cv) => {
			if (cv.code === code){
				cv.display = false;
			}
			return cv;
		});
		this.setState({currency_values: new_values});
  }

  calculateValue = (amount) => {
  	const { currencies_object, currency_values } = this.state;
    const updated_values = currency_values.map(cv => {
      const calculatedValue = currencies_object[cv.code].rate_float * amount
      cv['exchange_value'] = calculatedValue
      return cv
    })
    this.setState({btc_amount: amount, currency_values: updated_values});
  }

  render() {
  	const { currency_values } = this.state;
    const hiddenCurrencies = this.state.currency_values.filter(cv => !cv.display)
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <Title values_count={currency_values.length}/>
          </div>
        </div>
      	<div className="container">
  	      <div className="row">
  	      	<div className="col">
              <FlashMessage count={this.state.counter}/>
  						<InputForm calculateValue={this.calculateValue}/>
              { hiddenCurrencies.length > 0 &&
                <CurrencyDropdown
    		        	currencies={hiddenCurrencies}
    		        	add={this.displayCurrencyField}
    		        />
              }
  		      </div>
  		    </div>
  		    <div className="row justify-content-center">
  		    	<div className="col-4">
              { this.state.currency_values.map(v =>
                v.display && <CurrencyValue currency={v} key={v.code} remove={this.hideCurrencyField}/>
              )}
  		      </div>
  	      </div>
  	    </div>
      </div>
    );
  }
}
