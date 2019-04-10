import React from 'react';
import { mount } from 'enzyme';
import { Title, CurrencyValue, CurrencyDropdown } from '../components/stateless';
import InputForm from '../components/Form';
import ExchangeApp from '../components/ExchangeApp';

/* global test, expect */
test('ExchangeApp component renders all the other components for the BTC exchange', () => {
  const wrapper = mount(<ExchangeApp />);
  expect(wrapper.find(Title).length).toBe(1);
  expect(wrapper.find(CurrencyDropdown).length).toBe(0);
  expect(wrapper.find(CurrencyValue).length).toBe(3);
  expect(wrapper.find(InputForm).length).toBe(1);
});
