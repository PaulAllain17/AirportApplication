import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Flight extends Component {
  render() {
    return (
      <ListItem key={this.props.id} alignItems="flex-start" onMouseOver={() => this.props.onMouseOver()} onClick={() => this.props.onClick(this.props.id)}>
            <ListItemText
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
