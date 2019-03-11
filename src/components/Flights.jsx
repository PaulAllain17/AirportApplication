import React, { Component } from 'react';

import List from '@material-ui/core/List';

import Flight from './Flight.jsx';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

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
      Flights:
       <List>
       {
         this.state.data.map(d => {
          return (
            <Flight key={d.id} flight={d}></Flight>)
         })
       }
       </List>
      </div>
    )
  }
}
