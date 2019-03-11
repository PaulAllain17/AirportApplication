import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Rotation extends Component {
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
      <ListItem className={this.state.active ? "delete" : ""} key={this.props.id} alignItems="flex-start"
                onMouseOver={(e) => this.onMouseOver()} onMouseOut={(e) => this.onMouseOut()} onClick={(e) => this.props.removeRotation(e, this.props.rotation)}>
            <ListItemText
              className="pointer"
              primary={"Flight: " + this.props.rotation.id}
              secondary={
                <React.Fragment>
                  <tr>
                    <span className="flight-span">{this.props.rotation.origin}</span>
                    <i class="arrow right"></i>
                    <span className="rotation-span">{this.props.rotation.destination}</span>
                  </tr>
                  <tr>
                    <span className="flight-span">{this.props.rotation.readable_departure}</span>
                    <span className="rotation-arrival-span">{this.props.rotation.readable_arrival}</span>
                  </tr>
                </React.Fragment>
              }
            />
      </ListItem>
    )
  }
}
