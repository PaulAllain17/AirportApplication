import React, { Component } from 'react';
import './App.css';

import Aircrafts from './components/Aircrafts.jsx';
import Flights from './components/Flights.jsx';
import Rotation from './components/Rotation.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
          <Aircrafts url='https://infinite-dawn-93085.herokuapp.com/aircrafts'/>
          <Rotation/>
          <Flights/>
        </body>
      </div>
    );
  }
}

export default App;
