import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import chevron from '../assets/img/chevron.png';

// components
import { Avatar, AvatarDropdown } from './index.js';

// action creators
import { signout } from '../store/actions';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  @media (max-width: 750px){
      width: 100%;
      display: flex;
    }
    @media (max-width: 450px){
      width: 100%;
      display: flex;
    }
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
    @media (max-width: 750px){
      font-size: 16px;
      width: 40%;
      margin-right: 0px;
    }
    @media (max-width: 450px){
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
      isAvatarClicked: false
    }
  }

  componentDidMount() {
    this.setState({ isAvatarClicked: false });
  }

  hideAvatarDropdown = () => {
    this.setState({ isAvatarClicked: false });
  }

  toggleAvatarClicked = () => {
    this.setState({ isAvatarClicked: !this.state.isAvatarClicked });
  }

  clickSignout = ev => {
    ev.preventDefault();
    localStorage.removeItem('symposium_auth0_access_token');
    localStorage.removeItem('symposium_auth0_expires_at');
    return this.props.signout().then(() => this.props.history.push('/'));
  };

  goToProfilePage = () => this.props.history.push(`/profile/${this.props.user_id}`);

  render() {
    return (
      <DivWrapper>
        <PWelcomeMessage>Welcome, {this.props.username}</PWelcomeMessage>
        <DivUser>
          <DivAvatar
            onClick={() => this.toggleAvatarClicked()}
            isAvatarClicked={this.state.isAvatarClicked}
          >
          
            <Avatar height={'72px'} width={'72px'} src={this.props.avatar} />
            <img src={chevron} alt='chevron' />
          </DivAvatar>
          {(this.state.isAvatarClicked) && <AvatarDropdown clickSignout={this.clickSignout} user_id={this.props.user_id} />}
          <button>Switch Theme</button>
        </DivUser>
      </DivWrapper>
    );
  }
}


const mapStateToProps = state => ({
  user_id: state.users.user_id,
  avatar: state.users.avatar,
  username: state.users.username,
  loggingInLoadingMessage: state.users.loggingInLoadingMessage
});

export default connect(
  mapStateToProps,
  { signout }
)(DisplayUser);