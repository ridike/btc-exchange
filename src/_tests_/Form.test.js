import React from 'react';
import { mount } from 'enzyme';

import { InputForm } from '../components/Form';

test('Form component renders input field for a BTC value', () => {

	const calculateValue = function(){
		console.log("testing Form Input Field");
	}
	const wrapper = mount(
	  <InputForm calculate_value={calculateValue} />
	);
	expect(wrapper.find(".input-group-text").length).toBe(2);

});
