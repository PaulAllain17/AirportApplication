import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Flight extends Component {
  render() {
    return (
      <ListItem key={this.props.id} alignItems="flex-start">
            <ListItemText
              primary={this.props.flight.id}
              secondary={
                <React.Fragment>
                  <span>{this.props.flight.origin}:
                  {this.props.flight.readable_departure}
                  </span>
                  <span>{this.props.flight.destination}:
                  {this.props.flight.readable_arrival}
                  </span>
                </React.Fragment>
              }
            />
      </ListItem>
    )
  }
}
