import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// components
import { Nav } from './components/index.js';

// views
import { LandingView } from './views/index.js';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: gray;
`;

const GlobalStyle = createGlobalStyle`
	html,
	body,
	#root {
    	margin: 0;
    	padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		display: flex;
		flex-direction: column;
	}
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <GlobalStyle />
        <Nav />
        <Route exact path='/' component={LandingView} />
      </AppWrapper>
    );
  }
}

export default App;
