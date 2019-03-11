import React, { Component } from 'react';

import Aircrafts from './Aircrafts.jsx';
import Flights from './Flights.jsx';
import Rotations from './Rotations.jsx';

export default class Container extends Component {
  constructor(props) {
		super(props);
		this.state = { aircrafts: [], flights: [], rotations: [] };
  }
  
	componentWillMount() {
    this.getAircrafts();
    this.getFlights();
  }
  
  getAircrafts(){
    const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/aircrafts', true);
		xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
			this.setState({ aircrafts: data.data });
		};
		xhr.send();
  }

  getFlights(){
    const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/flights', true);
		xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
			this.setState({ flights: data.data });
		};
		xhr.send();
  }

  onClick(e, data) {
    //This would give you all the field of the target
    //console.log(e.target.elements);
    alert("Click on " + data);
    // you can do all sorts of Css change by this way
    //e.target.element.class="newGreenColor";
  }

  onMouseOver(){
    //alert("Mouse over!");
  }

  render() {
    return (
      <div>
        <Aircrafts aircrafts={this.state.aircrafts}/>
        <Rotations rotations={this.state.rotations}/>
        <Flights flights={this.state.flights} onClick={this.onClick} onMouseOver={this.onMouseOver}/>
      </div>
    );
  }
}
