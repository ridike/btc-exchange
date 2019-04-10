import React from 'react';
import { mount } from 'enzyme';
import InputForm from '../components/Form';

/* global test, expect */
test('Form component renders input field for a BTC value', () => {
  const calculateValue = () => {
    console.log('testing Form Input Field'); // eslint-disable-line
  }
  const wrapper = mount(<InputForm calculate_value={calculateValue} />);
  expect(wrapper.find('.input-group-text').length).toBe(2);
});
