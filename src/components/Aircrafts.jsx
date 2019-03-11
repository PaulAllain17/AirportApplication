import React, { Component } from 'react';

import List from '@material-ui/core/List';
import Aircraft from './Aircraft';

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

export default class Aircrafts extends Component {
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
      <div className="aircrafts">
        Aircrafts:
       <List>
       {
         this.state.data.map(d => {
          return (
            <Aircraft key={d.ident} aircraft={d}></Aircraft>)
         })
       }
       </List>
      </div>
    )
  }
}