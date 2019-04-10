import React from 'react';
import { mount, shallow } from 'enzyme';
import { Title, CurrencyValue, CurrencyDropdown } from '../components/stateless';

/* global describe, test, expect */
describe('testing stateless components', () => {
  test('Title component displays page title', () => {
    const wrapper = mount(<Title values_count="3" />);

    const t = wrapper.find('h1');
    expect(t.text()).toBe('3 BTC exchange values');
  });

  test('CurrencyValue component displays a single line with BTC value in a currency', () => {
    const usdCurrency = {
      code: 'USD',
      exchange_value: 99,
      display: true,
    };

    function remove() {
      console.log('testing value'); // eslint-disable-line
    }

    const wrapper = mount(<CurrencyValue currency={usdCurrency} key="1" remove={remove} />);

    const v = wrapper.find('.list-group-item .text-success');
    expect(v.text()).toBe('$99.00');
  });

  test('CurrencyDropdown component displays a list of 3 currencies', () => {
    const currencyValues = [
      {
        code: 'USD',
        exchange_value: 0,
        display: false,
      },
      {
        code: 'GBP',
        exchange_value: 0,
        display: false,
      }];
    function add() {
      console.log('testing value'); // eslint-disable-line
    }
    const wrapper = shallow(<CurrencyDropdown currencies={currencyValues} add={add} />);
    expect(wrapper.find('.dropdown-item').length).toBe(2);
    expect(wrapper.find('.dropdown-item').first().text()).toBe('USD');
  });
});
