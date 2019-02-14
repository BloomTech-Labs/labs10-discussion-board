import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// components
import { Header, Profiles } from './components/index.js';

// views
import { LandingView, CategoriesView } from './views/index.js';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  width: 95vw;
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
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
	}
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <GlobalStyle />
        <Header />
        <Route exact path='/home' component={LandingView} />
        <Route exact path='/profiles' component={Profiles} />
        <Route path='/categories' component={CategoriesView} />
      </AppWrapper>
    );
  }
}

export default App;
