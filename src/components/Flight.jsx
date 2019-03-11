import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Flight extends Component {
  constructor(props) {
		super(props);
		this.state = { active: false };
  }

  onMouseOver(){
    this.setState({ active: true });
  }

  onMouseOut(){
    this.setState({ active: false });
  }

  render() {
    return (
      <ListItem className={this.state.active ? "active" : ""} key={this.props.id} alignItems="flex-start"
                onMouseOver={(e) => this.onMouseOver()} onMouseOut={(e) => this.onMouseOut()} onClick={(e) => this.props.addRotation(e, this.props.flight)}>
      <ListItemText
        className="pointer flight"
        primary={this.props.flight.id}
        secondary={
          <React.Fragment>
            <tr>
              <span className="flight-span">{this.props.flight.origin}</span>
              <span>{this.props.flight.destination}</span>
            </tr>
            <tr>
              <span className="flight-span">{this.props.flight.readable_departure}</span>
              <span>{this.props.flight.readable_arrival}</span>
            </tr>
          </React.Fragment>
        }
      />
      </ListItem>
    )
  }
}
