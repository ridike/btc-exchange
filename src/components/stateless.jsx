import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-one-expression-per-line */
export const Title = ({ valuesCount }) => (
  <div>
    <h1 className="display-3 text-center">
      {valuesCount} BTC exchange values
    </h1>
  </div>
)
/* eslint-enable */

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
      className="btn btn-light dropdown-toggle"
      id="dropdownMenuLink"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Add a currency to display
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      {currencies.map(c => (
        <a
          href="#"
          className="dropdown-item"
          key={c.code}
          onClick={() => { add(c.code) }}
        >
          {c.code}
        </a>
      ))}
    </div>
  </div>
)

Title.propTypes = {
  valuesCount: PropTypes.number.isRequired,
}

CurrencyValue.propTypes = {
  currency: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  remove: PropTypes.func.isRequired,
}

CurrencyDropdown.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  add: PropTypes.func.isRequired,
}
