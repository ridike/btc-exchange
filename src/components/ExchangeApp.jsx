import React from 'react';
import interval from 'interval-promise'
import { Title, CurrencyDropdown, CurrencyValue } from './stateless';
import InputForm from './Form';
import FlashMessage from './FlashMessage';

const API = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export default class ExchangeApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currenciesObject: {},
      currencyValues: [
        {
          code: 'EUR',
          exchange_value: 0,
          display: true,
        },
        {
          code: 'USD',
          exchange_value: 0,
          display: true,
        },
        {
          code: 'GBP',
          exchange_value: 0,
          display: true,
        },
      ],
      counter: 0,
      errorMessage: 'Unfortunately, fetching data was unsuccessful.',
      errorVisible: false,
    };
    this.displayCurrencyField = this.displayCurrencyField.bind(this);
    this.hideCurrencyField = this.hideCurrencyField.bind(this);
    this.calculateValue = this.calculateValue.bind(this);
  }

  async componentDidMount() {
    this.fetchExchangeData()
    interval(async () => {
      this.fetchExchangeData()
    }, 60000, { iterations: 100 })
  }

  async fetchExchangeData() {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const exchangeData = await response.json();
      this.setState({ currenciesObject: exchangeData.bpi }, () => {
        this.calculateValue(0);
        this.setState(prevState => ({ counter: prevState.counter + 1 }));
      });
    } catch (error) {
      this.setState({ errorVisible: true })
      console.log(`Error: ${error.stack}`); // eslint-disable-line
    }
  }

  displayCurrencyField(code) {
    const { currencyValues } = this.state
    const newValues = currencyValues.map((cv) => {
      if (cv.code === code) {
        cv.display = true
      }
      return cv
    })
    this.setState({ currencyValues: newValues })
  }

  hideCurrencyField(code) {
    const { currencyValues } = this.state
    const newValues = currencyValues.map((cv) => {
      if (cv.code === code) {
        cv.display = false;
      }
      return cv;
    })
    this.setState({ currencyValues: newValues });
  }

  calculateValue(amount) {
    const { currenciesObject, currencyValues } = this.state;
    const updatedValues = currencyValues.map((cv) => {
      const calculatedValue = currenciesObject[cv.code].rate_float * amount;
      cv.exchange_value = calculatedValue;
      return cv;
    })
    this.setState({ currencyValues: updatedValues });
  }

  render() {
    const {
      currencyValues,
      counter,
      errorMessage,
      errorVisible,
    } = this.state;
    const hiddenCurrencies = currencyValues.filter(cv => !cv.display)
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <Title valuesCount={currencyValues.length} />
          </div>
        </div>
        <div className="container">
          { errorVisible && (
            <div className="row justify-content-center">
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            </div>
          )}
          <div className="row">
            <div className="col">
              <FlashMessage count={counter} />
              <InputForm calculateValue={this.calculateValue} />
              { hiddenCurrencies.length > 0 && (
                <CurrencyDropdown
                  currencies={hiddenCurrencies}
                  add={this.displayCurrencyField}
                />
              )}
            </div>
          </div>
          { hiddenCurrencies.length === 0 && (
            <div className="row justify-content-center">
              <span className="font-italic text-secondary">
                <i className="fas fa-info-circle text-warning" />
                Try removing a currency field
              </span>
            </div>
          )}
          <div className="row justify-content-center">
            <div className="col-6">
              { currencyValues.map(v => v.display
                  && <CurrencyValue currency={v} key={v.code} remove={this.hideCurrencyField} />)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
