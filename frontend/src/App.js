import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';


// components
import {
  Header,
  Profiles,
  Profile,
  Settings,
  Error,
  Message,
  Auth,
  ConfirmEmail,
  RequestResetPWForm,
  ResetPWForm,
} from './components/index.js';

// views
import {
  LandingView,
  CategoriesView,
  DiscussionView,
  DiscussionsByCatView,
  RegisterView
} from './views/index.js';

// action creators
import { logBackIn } from './store/actions/index.js';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
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
      background: #54BDFF;
      width: 100%;
	}
`;

class App extends Component {
  isAuthenticated() {
    // check whether the current time is past the access token's expiry time
    const expiresAt = localStorage.getItem('symposium_auth0_expires_at');
    return new Date().getTime() < expiresAt;
  }
  componentDidMount() {
    const user_id = localStorage.getItem('symposium_user_id');
    const token = localStorage.getItem('symposium_token');
    if (user_id && token) return this.props.logBackIn(user_id, token);
  }
  render() {
    const { error, history, message } = this.props;
    if (this.isAuthenticated() || localStorage.getItem('symposium_user_id')) {
      return (
        <AppWrapper>
          <GlobalStyle />
          <Header history={history} />
          <Route path='/home' component={LandingView} />
          <Route path='/profiles' component={Profiles} />
          <Route path='/profile/:id' component={Profile} />
          <Route path='/categories' component={CategoriesView} />
          <Route path='/discussion/:id' component={DiscussionView} />
          <Route path='/settings/:id' component={Settings} />
          <Route path='/discussions/category/:category_id' component={DiscussionsByCatView} />
          <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />

          {error && <Error error={error} />}
          {message && <Message message={message} />}
        </AppWrapper>
      );
    } else {
      // prettier-ignore
      return (
        <AppWrapper>
          <GlobalStyle />
          <Header history={history} />
          <Switch>
            <Route path='/register' component={RegisterView} />
            <Route path='/request-reset-pw' component={RequestResetPWForm} />
            <Route path = '/reset/:reset_pw_token' component = {ResetPWForm} />
            <Route path='/home' component={LandingView} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/categories' component={CategoriesView} />
            <Route path='/discussion/:id' component={DiscussionView} />
            <Route path='/discussions/category/:category_id' component={DiscussionsByCatView} />
            <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />
            <Route render={props => <Auth {...props} />}/>
          </Switch>
          {error && <Error error={error} />}
          {message && <Message message={message} />}
        </AppWrapper>
      );
    }
  }
};

const mapStateToProps = state => ({
  error: state.users.error,
  message: state.users.message
});

export default connect(
  mapStateToProps,
  { logBackIn }
)(App);
