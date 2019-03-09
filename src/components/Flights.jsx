import React, { Component } from 'react';

export default class Flights extends Component {
  constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	componentWillMount() {
		const xhr = new XMLHttpRequest();
		xhr.open('get', this.props.url, true);
		xhr.onload = () => {
			const data = JSON.parse(xhr.responseText);
			this.setState({ data: data.data });
		};
		xhr.send();
	}
  render() {
    return (
      <div className="flights">
        {
         this.state.data.map(d => {
          return (<li key={d.id}>{d.id}</li>)
         })
       }
      </div>
    )
  }
}
