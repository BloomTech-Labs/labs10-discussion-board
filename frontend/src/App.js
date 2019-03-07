import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// globals
import { dayTheme, nightTheme, sideNavWidth, topHeaderHeight } from './globals/globals.js';

// components
import {
  Header,
  SideNav,
  Profiles,
  Profile,
  Settings,
  Error,
  Footer,
  Message,
  ConfirmEmail,
  RequestResetPWForm,
  ResetPWForm,
  DiscussionsByCats,
  AddCategoryModal,
} from './components/index.js';

// views
import {
  LandingView,
  CategoriesView,
  DiscussionView,
  RegisterView,
} from './views/index.js';

// action creators
import { logBackIn } from './store/actions/index.js';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  position: relative;
  min-height: 100vh;
  justify-content: space-between;
`;

const DivBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

const DivSideNav = styled.div`
  display: flex;
  min-width: ${sideNavWidth};
  min-height: 100%;
  position: fixed;
  z-index: 7801;
  border-right: 2px solid rgb(243, 245, 248);
`;

const DivPage = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  position: relative;
  margin: 0 0 40px ${sideNavWidth};
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
      justify-content: center;
		  flex-wrap: wrap;
      flex-direction: column;
      background: ${props => props.theme.appBgColor};
      min-width: 100%;
      min-height: 100%;
	}
`;

class App extends Component {
  constructor(props) {
    super(props);

    // Initial state: day time!
    this.state = {
      isDay: true,
      theme: dayTheme,
      showSearch: false,
      isAddCatModalRaised: false
    };
  }

  switchTheme = () => {
    // Toggle day / night on click
    const isDay = !this.state.isDay;

    this.setState({
      isDay: isDay,
      theme: isDay ? dayTheme : nightTheme,
    });
  }

  setAddCatModalRaised = (ev, status) => {
    ev.stopPropagation();
    this.setState({ isAddCatModalRaised: status });
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
    const { showSearch, isDay } = this.state;
    const { error, history, message, location } = this.props;
    if (this.isAuthenticated() || localStorage.getItem('symposium_user_id')) {
      return (
        <ThemeProvider theme={this.state.theme}>
          <AppWrapper>
            <GlobalStyle />
            <Header showSearch={showSearch} scrollTo={this.scrollTo} pathname={location.pathname} goTo={this.goTo} isDay={isDay} history={history} isAuthenticated={this.isAuthenticated} toggleSearch={this.toggleSearch} switched={this.switchTheme} />
            <div style={{ width: '100%', height: topHeaderHeight }} />
            <DivBody>
              <DivSideNav>
                <SideNav setAddCatModalRaised={this.setAddCatModalRaised} />
              </DivSideNav>
              <DivPage>
                {(this.state.isAddCatModalRaised) && <AddCategoryModal historyPush={this.props.history.push} setAddCatModalRaised={this.setAddCatModalRaised} />}
                <Route exact path= '/' component={LandingView} />
                <Route exact path= '/home' component={LandingView} />
                <Route path='/profiles' component={Profiles} />
                <Route path='/profile/:id' component={Profile} />
                <Route path='/categories' render={() => <CategoriesView historyPush={this.props.history.push} setAddCatModalRaised={this.setAddCatModalRaised} isAddCatModalRaised={this.state.isAddCatModalRaised} />} />
                <Route path='/discussion/:id' render={props => <DiscussionView {...props} scrollTo={this.scrollTo} />} />
                <Route path='/settings/:id' component={Settings} />
                <Route path='/discussions/category/:category_id' component={DiscussionsByCats} />
                <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />
              </DivPage>
            </DivBody>
            <Footer toggleSearch={this.toggleSearch} switched={this.switchTheme} />
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
            <Header showSearch={showSearch} scrollTo={this.scrollTo} pathname={location.pathname} goTo={this.goTo} isDay={isDay} history={history} isAuthenticated={this.isAuthenticated} toggleSearch={this.toggleSearch} switched={this.switchTheme} />
            <div style={{ width: '100%', height: topHeaderHeight }} />
            <DivBody>
              <DivSideNav>
                {/* <SideNav /> */}
              </DivSideNav>
              <DivPage>
                <Switch>
                  <Route path='/register' component={RegisterView} />
                  <Route path='/request-reset-pw' component={RequestResetPWForm} />
                  <Route path='/reset/:reset_pw_token' component={ResetPWForm} />
                  <Route path='/home' component={LandingView} />
                  <Route path='/profile/:id' component={Profile} />
                  <Route path='/categories' render={() => <CategoriesView historyPush={this.props.history.push} setAddCatModalRaised={this.setAddCatModalRaised} isAddCatModalRaised={this.state.isAddCatModalRaised} />} />
                  <Route path='/discussion/:id' render={props => <DiscussionView {...props} scrollTo={this.scrollTo} />} />
                  <Route path='/discussions/category/:category_id' component={DiscussionsByCats} />
                  <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} /> */}
                </Switch>
              </DivPage>
            </DivBody>
            <Footer toggleSearch={this.toggleSearch} switched={this.switchTheme} />
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