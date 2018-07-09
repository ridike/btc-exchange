import { Title, Value, ValueList, ValueDropdown } from '../components/stateless';
import React from 'react';
import { mount, shallow } from 'enzyme';



describe('testing SFCs', () => {
	test('Title component displays page title', () => {

		const wrapper = mount(
		  <Title values_count="3" />
		);

		const t = wrapper.find('h1');
		expect(t.text()).toBe('3 BTC exchange values');

	});

	test('Value component displays a single line with BTC value in a currency', () => {

		const USD_currency =  {
	      		"id" : 1,
	      		"code" : "USD",
	      		"exchange_value" : 99,
	      		"display" : true
	      	}

	  function remove(){
	  	console.log("testing value")
	  } 

		const wrapper = mount(
		  <Value currency_value={USD_currency} key="1" remove={remove} />
		)

		const v = wrapper.find('.list-group-item .text-success')
		expect(v.text()).toBe('$99')

	});

  test('ValueList renders three <Value /> components', () => {
  	const currency_values = [
      	{ 
      		"id" : 0,
      		"code" : "EUR",
      		"exchange_value" : 0,
      		"display" : true
      	},
      	{
      		"id" : 1,
      		"code" : "USD",
      		"exchange_value" : 0,
      		"display" : true
      	},
      	{
      		"id" : 2,
      		"code" : "GBP",
      		"exchange_value" : 0,
      		"display" : true
      	}];
  	function remove(){
	  	console.log("testing value")
	  }
    const wrapper = shallow(<ValueList currency_values={currency_values}
			          remove={remove} />);
    expect(wrapper.find(Value).length).toBe(3);
  });


	test('ValueDropdown component displays a list of 3 currencies', () => {
		const currency_values = [
      	{ 
      		"id" : 0,
      		"code" : "EUR",
      		"exchange_value" : 0,
      		"display" : true
      	},
      	{
      		"id" : 1,
      		"code" : "USD",
      		"exchange_value" : 0,
      		"display" : false
      	},
      	{
      		"id" : 2,
      		"code" : "GBP",
      		"exchange_value" : 0,
      		"display" : false
      	}];
		function add(){
	  	console.log("testing value")
	  }
	  const wrapper = shallow(<ValueDropdown 
		        	currency_values={currency_values}
		        	hidden_count="2"
		        	add={add}
		        />);
    expect(wrapper.find(".dropdown-item").length).toBe(2);
  	expect(wrapper.find(".dropdown-item").first().text()).toBe('USD');
	});

});