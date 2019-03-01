import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// themes
import { dayTheme, nightTheme } from './globals/globals';

// components
import {
  Header,
  Logo,
  Profiles,
  Profile,
  Settings,
  Error,
  Footer,
  Message,
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
  RegisterView,
  HotDiscussionsView,
} from './views/index.js';

// action creators
import { logBackIn, editDiscussion } from './store/actions/index.js';

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

const ButtonContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    margin-top: 110px;
`;


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

  switchTheme =() => {
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
  componentDidUpdate(prevProps) {
    if (prevProps.location.hash.substring(1) !== this.props.location.hash.substring(1)) {
      return this.scrollTo();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange, false);
  };
  render() {
    const { showSearch } = this.state;
    const { error, history, message, location,  } = this.props;
    if (this.isAuthenticated() || localStorage.getItem('symposium_user_id')) {
      return (
        <ThemeProvider theme={this.state.theme}>
          <AppWrapper>
            <GlobalStyle />
            <Header history={history} isAuthenticated={this.isAuthenticated} toggleSearch={this.toggleSearch} switched={this.switchTheme}/>
            <Logo />
            <Route exact path='/' component={HotDiscussionsView} />
            <Route path='/home' component={LandingView} />
            <Route path='/profiles' component={Profiles} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/categories' component={CategoriesView} />
            <Route path='/discussion/:id' render={props => <DiscussionView {...props} scrollTo={this.scrollTo} />} />
            <Route path='/settings/:id' component={Settings} />
            <Route path='/discussions/category/:category_id' component={DiscussionsByCatView} />
            <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />
            <Footer toggleSearch={this.toggleSearch} switched={this.switchTheme}/>
            {showSearch && <Search scrollTo={this.scrollTo} pathname={location.pathname} goTo={this.goTo} toggleSearch={this.toggleSearch}  />}
            {error && <Error error={error} />}
            {message && <Message message={message} />}
          </AppWrapper>
        </ThemeProvider>
      );
    } else {
      // prettier-ignore
      return (
        <ThemeProvider theme={this.state.theme}>
          <AppWrapper>
            <GlobalStyle />
            <Header history={history} isAuthenticated={this.isAuthenticated} toggleSearch={this.toggleSearch } switched={this.switchTheme} />
            <Logo />
            <Switch>
              <Route path='/register' component={RegisterView} />
              <Route path='/request-reset-pw' component={RequestResetPWForm} />
              <Route path='/reset/:reset_pw_token' component={ResetPWForm} />
              <Route exact path='/' component={HotDiscussionsView} />
              <Route path='/home' component={LandingView} />
              <Route path='/profile/:id' component={Profile} />
              <Route path='/categories' component={CategoriesView} />
              <Route path='/discussion/:id' render={props => <DiscussionView {...props} scrollTo={this.scrollTo} />} />
              <Route path='/discussions/category/:category_id' component={DiscussionsByCatView} />
              <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />
            </Switch>

            {showSearch && <Search scrollTo={this.scrollTo} pathname={location.pathname} goTo={this.goTo} toggleSearch={this.toggleSearch} />}
            {error && <Error error={error} />}
            {message && <Message message={message} />}
          </AppWrapper>
        </ThemeProvider>
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
