import React from 'react';

export const Title = ({values_count}) =>
  <div>
  	<h1 className="display-3 text-center">{values_count} BTC exchange values</h1>
  </div>

export const CurrencyValue = ({currency, remove}) => {
  return (
    <li className={"list-group-item list-group-item-action d-flex justify-content-between "+ (currency.display ? 'd-block' : 'd-none')}>
      <span>{currency.code}</span>
      <span className="text-success">
        <b>
          {new Intl.NumberFormat('US', { style: 'currency', currency: currency.code }).format(currency.exchange_value)}
        </b>
      </span>
      <i
        className="icon-remove float-right"
        onClick={() => {remove(currency.code)}}>
      </i>
    </li>
  )
}

export const CurrencyDropdown = ({currencies, add}) => {
  return (
    <div className="dropdown show">
      <a className="btn btn-info dropdown-toggle"
        href="#" role="button" id="dropdownMenuLink"
        data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false"
      >
        Display a currency
      </a>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        {currencies.map((c, id) =>
          <a className="dropdown-item" href="#" key={id} onClick={() => {add(c.code)}}>{c.code}</a>
        )}
      </div>
    </div>
  )
}
