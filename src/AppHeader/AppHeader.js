import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './AppHeader.css';


/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

class AppHeader extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<AppBar className='App-Header'
					title={<div className='App-Header-Title'>Wavestone Autonomous Car</div>}
					iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
			</MuiThemeProvider>
		);
	}
}

export default AppHeader;
