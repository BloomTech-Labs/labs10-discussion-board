import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import LandingView from './views/LandingView.js';

const DivWrapper = styled.div`
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
      <DivWrapper>
        <GlobalStyle />
        <LandingView />
        hello world
      </DivWrapper>
    );
  }
}

export default App;
