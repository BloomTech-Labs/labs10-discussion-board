import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// components
import { LandingView } from './views/index.js';

const AppWrapper = styled.div`
	display: flex;
`;

const GlobalStyle = createGlobalStyle`
	html,
	body,
	#root {
    	margin: 0;
    	padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
		'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif;
	}
`;

class App extends Component {
	render() {
		return (
			<AppWrapper>
				<GlobalStyle />
				<Route exact path = '/' component = { LandingView} />
			</AppWrapper>
		);
	}
}

export default App;
