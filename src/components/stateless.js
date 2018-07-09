import React from 'react';

export const Title = ({values_count}) => 
  <div>
  	<h1 className="display-3 text-center">{values_count} BTC exchange values</h1>
  </div>

export const Value = ({currency_value, remove}) => 
	<li className={"list-group-item list-group-item-action d-flex justify-content-between "+ (currency_value.display ? 'd-block' : 'd-none')}>
		<span>{currency_value.code} </span>
		<span className="text-success"><b>{new Intl.NumberFormat('US', { style: 'currency', currency: currency_value.code }).format(currency_value.exchange_value)}</b></span>
		<i className="icon-remove float-right" onClick={() => {remove(currency_value.id)}}></i>
	</li>

export const ValueList = ({currency_values, remove}) => {
  const currencyNode = currency_values.map((currency_value) => {
    return (<Value currency_value={currency_value} key={currency_value.id} remove={remove}/>)
  });
  return (<ul className="list-group" style={{marginTop:'30px'}}>{currencyNode}</ul>);
}

export const ValueDropdown = ({currency_values, hidden_count, add}) => 
	<div className={"dropdown show " + (hidden_count === 0 ? "d-none" : "")}>
	  <a className="btn btn-info dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Display a currency
	  </a>
	  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
	  	{
	  		currency_values.map((currency, id) => {
	  			if (!currency.display){
	  				return (<a className="dropdown-item" href="#" key={id} onClick={() => {add(currency.id)}}>{currency.code}</a>);
	  			}
	  			return null;
	  		})
			}
	  </div>
	</div>