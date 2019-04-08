import { Title, CurrencyValue, CurrencyDropdown } from '../components/stateless';
import React from 'react';
import { mount, shallow } from 'enzyme';

describe('testing stateless components', () => {
	test('Title component displays page title', () => {

		const wrapper = mount(
		  <Title values_count="3" />
		);

		const t = wrapper.find('h1');
		expect(t.text()).toBe('3 BTC exchange values');

	});

	test('CurrencyValue component displays a single line with BTC value in a currency', () => {

		const USD_currency =  {
	      		"code" : "USD",
	      		"exchange_value" : 99,
	      		"display" : true
	      	}

	  function remove(){
	  	console.log("testing value")
	  }

		const wrapper = mount(
		  <CurrencyValue currency={USD_currency} key="1" remove={remove} />
		)

		const v = wrapper.find('.list-group-item .text-success')
		expect(v.text()).toBe('$99.00')

	});

	test('CurrencyDropdown component displays a list of 3 currencies', () => {
		const currency_values = [
      	{
      		"code" : "USD",
      		"exchange_value" : 0,
      		"display" : false
      	},
      	{
      		"code" : "GBP",
      		"exchange_value" : 0,
      		"display" : false
      	}];
		function add(){
	  	console.log("testing value")
	  }
	  const wrapper = shallow(<CurrencyDropdown
		        	currencies={currency_values}
		        	add={add}
		        />);
    expect(wrapper.find(".dropdown-item").length).toBe(2);
  	expect(wrapper.find(".dropdown-item").first().text()).toBe('USD');
	});

});
