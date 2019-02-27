import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import chevron from '../assets/img/chevron.png';

// components
import { Avatar, AvatarDropdown, Notifications } from './index.js';

// action creators
import { signout, markNotificationsAsRead } from '../store/actions';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const DivUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 750px){
      width: 70%;
    }
    @media (max-width: 450px){
      width: 70%;
    }
`;

const DivAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    transform: ${props => props.isAvatarClicked && 'rotate(180deg)'};
  }
`;

const PWelcomeMessage = styled.p`
    font-size: 20px;
    margin-right: 10px;

    .notifications-icon {
      ${ ({ newNotifications }) => newNotifications && 'color: red;' }
      &:hover {
        color: #ddd;
        cursor: pointer;
      }
    }

    @media (max-width: 750px){
      font-size: 16px;
      width: 40%;
      margin-right: 0px;
    }
    @media (max-width: 570px){
      display: none;
    }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class DisplayUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAvatarClicked: false,
      showNotifications: false,
    }
  }

  componentDidMount() {
    this.setState({ isAvatarClicked: false });
  }

  hideAvatarDropdown = () => {
    this.setState({ isAvatarClicked: false });
  }

  toggleAvatarClicked = () => this.setState({
    isAvatarClicked: !this.state.isAvatarClicked,
    showNotifications: false,
  });

  toggleShowNotifications = () => this.setState({
    showNotifications: !this.state.showNotifications,
    isAvatarClicked: false,
  }, () => this.props.newNotifications && this.props.markNotificationsAsRead());

  clickSignout = ev => {
    ev.preventDefault();
    localStorage.removeItem('symposium_auth0_access_token');
    localStorage.removeItem('symposium_auth0_expires_at');
    return this.props.signout(this.props.uuid);
  };

  goToProfilePage = () => this.props.history.push(`/profile/${this.props.user_id}`);

  goTo = url => this.setState({ showNotifications: !this.state.showNotifications }, () => {
    return this.props.history.push(url);
  });

  render() {
    const { isAvatarClicked, showNotifications } = this.state;
    return (
      <DivWrapper>
        <PWelcomeMessage newNotifications = { this.props.newNotifications }>
          Welcome, {this.props.username}&nbsp;
          <span className = 'notifications-icon-wrapper'>
            { this.props.newNotifications ? this.props.newNotificationCount : null }
            <i
              onClick = { this.toggleShowNotifications }
              className = 'far fa-envelope notifications-icon'
            />
          </span>
        </PWelcomeMessage>
        {
          showNotifications &&
          <Notifications
            toggleShowNotifications = { this.toggleShowNotifications }
            notifications = { this.props.notifications }
            goTo = { this.goTo }
          />
        }
        <DivUser>
          <DivAvatar
            onClick={() => this.toggleAvatarClicked()}
            isAvatarClicked={isAvatarClicked}
          >
          
            <Avatar height={'72px'} width={'72px'} src={this.props.avatar} />
            <img src={chevron} alt='chevron' />
          </DivAvatar>
          {(isAvatarClicked) && <AvatarDropdown clickSignout={this.clickSignout} user_id={this.props.user_id} />}
        </DivUser>
      </DivWrapper>
    );
  }
}


const mapStateToProps = state => ({
  user_id: state.users.user_id,
  avatar: state.users.avatar,
  username: state.users.username,
  uuid: state.users.uuid,
  notifications: state.users.notifications,
  newNotifications: state.users.newNotifications,
  newNotificationCount: state.users.newNotificationCount,
  last_login: state.users.last_login,
  loggingInLoadingMessage: state.users.loggingInLoadingMessage,
});

export default connect(
  mapStateToProps,
  { signout, markNotificationsAsRead }
)(DisplayUser);