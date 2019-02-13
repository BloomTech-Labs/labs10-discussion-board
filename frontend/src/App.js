import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Nav from './components/Nav.js';
import LandingView from './views/LandingView.js';

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
      <DivWrapper>
        <GlobalStyle />
        <Nav />
        <LandingView />
      </DivWrapper>
    );
  }
}

export default App;
