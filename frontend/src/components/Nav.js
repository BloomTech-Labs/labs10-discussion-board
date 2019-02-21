import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// components
import { Avatar } from './index.js';

// action creators
import { signout } from '../store/actions';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  @media(max-width: 768px){
    diplay: flex;
    flex-direction: column;
    align-items: center;
  }
  &:hover {
    cursor: pointer;
  }
  
  @media (max-width: 450px){
    
    
    .avatarWelcome {
      display: flex
      flex-direction: column;
      align-items: center;
    }
    @media (max-width: 450px){
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: 1px solid gray;
    }
  }
  

`;

const Welcome = styled.div`
  margin: 25px;
  font-size: 24px;
  @media (max-width: 450px){
    display: none;
  }

    .username {
      color: black;
      text-decoration: none;
      &:hover {
        color: white;
        text-decoration: underline;
      }
    }
`;

const Signout = styled.a`
  font-size: 30px;
  user-select: none;
  cursor: pointer;


  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Profile = styled.a`
&:hover {
  cursor: pointer;
}
  `;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
  clickSignout = ev => {
    ev.preventDefault();
    localStorage.removeItem('symposium_auth0_access_token');
    localStorage.removeItem('symposium_auth0_expires_at');
    return this.props.signout().then(() => this.props.history.push('/'));
  };

  goToProfilePage = () => this.props.history.push(`/profile/${ this.props.user_id }`);

  render() {
    const { user_id, username, avatar } = this.props;
    return (
      <DivWrapper>
      <div className = 'avatarWelcome'>
        <div onClick = { this.goToProfilePage }>
          <Avatar
            height = '100px'
            width = '100px'
            src = { avatar }
          />
        </div>
      </div>
        <Welcome>Welcome, <Link className = 'username' to = { `/settings/${ user_id }` }>{ username }</Link>!</Welcome>
        <Signout onClick = { ev => this.clickSignout(ev) }>
          Sign Out
        </Signout>
      </DivWrapper>
    );
  }
};

// Nav.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  avatar: state.users.avatar,
  username: state.users.username,
  loggingInLoadingMessage: state.users.loggingInLoadingMessage
});

export default connect(
  mapStateToProps,
  { signout }
)(Nav);
