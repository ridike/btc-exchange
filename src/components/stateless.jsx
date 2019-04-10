import React from 'react';

export const Title = ({ valuesCount }) => (
  <div>
    <h1 className="display-3 text-center">
      {valuesCount}
      BTC exchange values
    </h1>
  </div>
)

export const CurrencyValue = ({ currency, remove }) => (
  <li className={`list-group-item list-group-item-action d-flex justify-content-between ${currency.display ? 'd-block' : 'd-none'}`}>
    <span>{currency.code}</span>
    <span className="text-success">
      <b>
        {new Intl.NumberFormat('US', { style: 'currency', currency: currency.code }).format(currency.exchange_value)}
      </b>
    </span>
    <i
      role="button"
      className="icon-remove float-right"
      onClick={() => { remove(currency.code) }}
    />
  </li>
)

export const CurrencyDropdown = ({ currencies, add }) => (
  <div className="dropdown show">
    <button
      type="button"
      className="btn btn-info dropdown-toggle"
      href=""
      id="dropdownMenuLink"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Display a currency
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      {currencies.map(c => (
        <button
          type="button"
          className="dropdown-item"
          href="#"
          key={c.code}
          onClick={() => { add(c.code) }}
        >
          {c.code}
        </button>
      ))}
    </div>
  </div>
)
