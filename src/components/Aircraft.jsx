import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Aircraft extends Component {
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
                onMouseOver={(e) => this.onMouseOver()} onMouseOut={(e) => this.onMouseOut()} onClick={(e) => this.props.selectAircraft(e, this.props.aircraft)}>
            <ListItemText
              className="pointer aircraft"
              primary={this.props.aircraft.ident}
              secondary={
                <React.Fragment>
                  ({this.props.currentPercentage}%)
                </React.Fragment>
              }
            />
      </ListItem>
    )
  }
}
