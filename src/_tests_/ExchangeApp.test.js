import React from 'react';
import { mount, shallow} from 'enzyme';

import { Title, ValueList, ValueDropdown } from '../components/stateless';
import InputForm from '../components/Form';
import ExchangeApp from '../components/ExchangeApp';

test('ExchangeApp component renders all the other components for the BTC exchange', () => {

	const wrapper = mount(<ExchangeApp />);
  expect(wrapper.find(Title).length).toBe(1);
  expect(wrapper.find(ValueList).length).toBe(1);
  expect(wrapper.find(ValueDropdown).length).toBe(1);
  expect(wrapper.find(InputForm).length).toBe(1);
});