import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

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
  Search,
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
      background: ${props => props.theme.appBgColor};
      width: 100%;
	}
`;

const dayTheme = {
  appBgColor:  '#54BDFF',
  authBgColor: 'gray',
  authColor: 'white',
  authLinkRegColor: 'white',
  authLinkRegColorHov: 'black',
  authLoginColor: 'white',
  authLoginColorHov: 'black',
  catNameColor: 'black',
  catDiscussionCountColor: 'black',
  catBgColorHov: 'rgba(255, 255, 255, 0.6)',
  catTimestampColor: 'black',
  catTitleColor:'black',
  catNameDateColor:'black',
  discussionUsernameColor: 'black',
  discussionByCatWrapperBgColor: '#e8e3e0',
  discussionByCatWrapperBgColorHov: 'rgba(255, 255, 255, 0.195)',
  discussionByCatWrapperBxShdw:'2px 3px 2px 2px #610b07',
  discussionByCatTitleColor:'black',
  discussionByCatTitleBgColorHov:'rgba(255, 255, 255, 0.13)',
  discussionByCatTitleColorHov:'white',
  discussionByCatCategoryColor: 'black',
  discussionByCatCategoryBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatCategoryColorHov: 'white',
  discussionByCatNameDateColor: 'black',
  discussionByCatNameDateBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatNameDateColorHov: 'white',
  skyColor: '#37d8e6',
  symposiumProfileBgColor: '#ffdd00',
  symposiumBorderColor: '#f1c40f',
};

const nightTheme = {
  appBgColor: 'pink',
  authBgColor: 'black',
  authColor: 'gray',
  authLinkRegColor: 'black',
  authLinkRegColorHov: 'white',
  authLoginColor: 'black',
  authLoginColorHov: 'white',
  catNameColor: 'red',
  catDiscussionCountColor: 'red',
  catBgColorHov: 'rgba(100, 200, 200, 0.9)',
  catTimestampColor: 'red',
  catTitleColor: 'red',
  catNameDateColor:'red',
  discussionUsernameColor: 'white',
  discussionByCatWrapperBgColor: 'red',
  discussionByCatWrapperBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatWrapperBxShdw:'2px 3px 2px 2px pink',
  discussionByCatTitleColor:'white',
  discussionByCatTitleBgColorHov:'rgba(100, 200, 255, 0.33)',
  discussionByCatTitleColorHov:'black',
  discussionByCatCategoryColor: 'white',
  discussionByCatCategoryBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatCategoryColorHov: 'black',
  discussionByCatNameDateColor: 'white',
  discussionByCatNameDateBgColorHov: 'rgba(100, 200, 255, 0.33);',
  discussionByCatNameDateColorHov: 'black',
  skyColor: '#2c3e50',
  symposiumProfileBgColor: '#bdc3c7',
  symposiumBorderColor: '#eaeff2',
}

class App extends Component {
  
  constructor(props) {
    super(props);

    // Initial state: day time!
    this.state = {
      isDay: true,
      theme: dayTheme,
      showSearch: false,
    };
  }

  handleClick() {
    // Toggle day / night on click
    const isDay = !this.state.isDay;

    this.setState({
      isDay: isDay,
      theme: isDay ? dayTheme : nightTheme,
    });
  }

  toggleSearch = () => this.setState({ showSearch: !this.state.showSearch });
  isAuthenticated() {
    // check whether the current time is past the access token's expiry time
    const expiresAt = localStorage.getItem('symposium_auth0_expires_at');
    return new Date().getTime() < expiresAt;
  };
  goTo = async url => await this.setState({ showSearch: false }, () => this.props.history.push(url));
  scrollTo = id => {
		if (id || this.props.location.hash.substring(1)) {
      return scroller.scrollTo(id || this.props.location.hash.substring(1), {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  };
  handleHashChange = () => this.scrollTo();
  componentDidMount() {
    const user_id = localStorage.getItem('symposium_user_id');
    const token = localStorage.getItem('symposium_token');
    window.addEventListener('hashchange', this.handleHashChange, false);
    if (user_id && token) return this.props.logBackIn(user_id, token);
  };
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange, false);
  };
  render() {
    const { showSearch } = this.state;
    const { error, history, message, location } = this.props;
    if (this.isAuthenticated() || localStorage.getItem('symposium_user_id')) {
      return (
        <ThemeProvider theme={this.state.theme}>
        <AppWrapper>
          <GlobalStyle />
          <Header history={history} toggleSearch = { this.toggleSearch } />
          <button onClick={() => this.handleClick()}>
          Switch Theme</button>
          <Route path='/home' component={LandingView} />
          <Route path='/profiles' component={Profiles} />
          <Route path='/profile/:id' component={Profile} />
          <Route path='/categories' component={CategoriesView} />
          <Route path='/discussion/:id' render={props => <DiscussionView {...props} scrollTo = {this.scrollTo} />} />
          <Route path='/settings/:id' component={Settings} />
          <Route path='/discussions/category/:category_id' component={DiscussionsByCatView} />
          <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />

          {showSearch && <Search scrollTo = { this.scrollTo } pathname = { location.pathname } goTo = { this.goTo } toggleSearch = { this.toggleSearch } />}
          {error && <Error error={error} />}
          {message && <Message message={message} />}
        </AppWrapper>
        </ThemeProvider>
      );
    } else {
      // prettier-ignore
      return (
        <AppWrapper>
          <GlobalStyle />
          <Header history={history} toggleSearch = { this.toggleSearch } />
          <button
          onClick={() => this.handleClick()}>
          Dark Theme</button>
          <Switch>
            <Route path='/register' component={RegisterView} />
            <Route path='/request-reset-pw' component={RequestResetPWForm} />
            <Route path = '/reset/:reset_pw_token' component = {ResetPWForm} />
            <Route path='/home' component={LandingView} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/categories' component={CategoriesView} />
            <Route path='/discussion/:id' render={props => <DiscussionView {...props} scrollTo = {this.scrollTo} />} />
            <Route path='/discussions/category/:category_id' component={DiscussionsByCatView} />
            <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />
            <Route render={props => <Auth {...props} />}/>
          </Switch>

          {showSearch && <Search scrollTo = { this.scrollTo } pathname = { location.pathname } goTo = { this.goTo } toggleSearch = { this.toggleSearch } />}
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
