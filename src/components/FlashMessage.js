import React from 'react';
import './FlashMessage.css';

export default class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  counter: props.count
		};
  }
	componentWillReceiveProps(nextProps) {
	  this.setState({ counter: nextProps.count });
	}
  render() {
    return (
        <div className="" >No of times data fetched from the API: {this.state.counter} </div>
    );
  }
}
