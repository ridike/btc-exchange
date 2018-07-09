import React from 'react';

import { Title, Value, ValueList, ValueDropdown } from './stateless';
import InputForm from './Form';
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
      		"id" : 0,
      		"code" : "EUR",
      		"exchange_value" : 0,
      		"display" : true
      	},
      	{
      		"id" : 1,
      		"code" : "USD",
      		"exchange_value" : 0,
      		"display" : true
      	},
      	{
      		"id" : 2,
      		"code" : "GBP",
      		"exchange_value" : 0,
      		"display" : true
      	}
      ],
      "hidden_count" : 0,
      "custom_amount" : 0,
      "update_counts" : 0
    };
  }

  async componentDidMount() {
    interval(async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const exchange_data = await response.json();
        this.setState({ currencies_object: exchange_data.bpi }, function(){
          this.calculateValue(this.state.custom_amount);
          this.state.update_counts ++;
          console.log("Fetching data, recalculating: "+ this.state.update_counts);
        });
      }
      catch (error) {
        console.log(`Error: ${error.stack}`);
      }
      // remove iterations to keep fetching the data from the API
    }, 5000, {iterations: 100})
  }

  // Display a new value field
  displayField = (id) => {
		let new_values = this.state.currency_values.map((currency) => {
			if(currency.id === id){
				currency.display = true;
				this.setState(prevState => ({hidden_count: prevState.hidden_count - 1}));
			}
			return currency;
		});
		this.setState({currency_values: new_values});
  }
  // Hide a particular value field
  hideField = (id) => {
		let new_values = this.state.currency_values.map((currency) => {
			if(currency.id === id){
				currency.display = false;
				this.setState(prevState => ({hidden_count: prevState.hidden_count + 1}));
			}
			return currency;
		});
		this.setState({currency_values: new_values});
  }
  calculateValue = (btc_amount) => {
  	const { currencies_object } = this.state;
  	const { currency_values } = this.state;

  	this.setState({ custom_amount: btc_amount});

		let new_values = currency_values.map((currency) => {
			let c, currency_names = ["USD", "GBP", "EUR"];
			for (c of currency_names){
				if(currency.code === c){
					let result = currencies_object[c].rate_float * btc_amount;
					currency['exchange_value'] = result;
				}
			}
			return currency;
		});
		this.setState({currency_values: new_values});
  }
  render(){
  	const { currencies_object } = this.state;
  	const { currency_values } = this.state;
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
              <FlashMessage count={this.state.update_counts}/>
  						<InputForm calculate_value={this.calculateValue}/>
  						<ValueDropdown 
  		        	currency_values={currency_values}
  		        	hidden_count={this.state.hidden_count}
  		        	add={this.displayField.bind(this)}
  		        />
  		      </div>
  		    </div>
  		    <div className="row justify-content-center">
  		    	<div className="col-4">
  		        <ValueList
  		          currency_values={currency_values}
  		          remove={this.hideField.bind(this)}
  		        />
  		      </div>
  	      </div>
  	    </div>
      </div>
    );
  }
}