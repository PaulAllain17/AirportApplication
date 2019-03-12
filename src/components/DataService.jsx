import React, { Component } from 'react';

export default class DataService extends Component {
  constructor(props) {
		super(props);
    this.state = { validAircraftType: "A320" };
  }

  componentWillMount() {
    this.getAircrafts();
    this.getFlights();
  }

  getAircrafts(){
    const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/aircrafts', true);
		xhr.onload = () => {
      let data = JSON.parse(xhr.responseText).data.filter(aircraft => aircraft.type === this.state.validAircraftType);
      data = [{"ident":"GABCD","type":"A320","economySeats":186,"base":"LFSB"},{"ident":"ERBCD","type":"A320","economySeats":200,"base":"EHAM"}
                  ,{"ident":"HDBCD","type":"A320","economySeats":200,"base":"LEBL"}];
      const rotationObject = data.map(aircraft => { return {aircraft: aircraft, rotation: []} });
      const aircraftList = data.map(aircraft => { return {aircraft: aircraft, percentage: 0} });
      this.props.setAircrafts(aircraftList, data[0], rotationObject);
		};
		xhr.send();
  }

  getFlights(){
    const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/flights', true);
		xhr.onload = () => {
      const data = JSON.parse(xhr.responseText).data;
      this.props.setFlights(data);
		};
		xhr.send();
  }

  render() {
    return (
      <div className="dataservice">
        { this.props.children }
      </div>
    )
  }
}
