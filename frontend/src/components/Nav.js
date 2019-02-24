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
 ********************************************** Styles ********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-self: flex-end;
  @media(max-width: 768px){
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Welcome = styled.div`
width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  font-size: 18px;
  @media (max-width: 450px){
    display: none;
  }

    a {
      margin-left: 5px;
      color: black;
      text-decoration: none;
      &:hover {
        color: white;
        text-decoration: underline;
      }
    }
`;

const Signoutwrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Signout = styled.a`
  margin-top: 7px;
  font-size: 16px;
  user-select: none;
  cursor: pointer;
  &:hover {
    text-decoration: line-through;
    font-weight: bold;
  }
  @media (max-width: 450px){
    margin-bottom: 7px;
  }
`;

const AvatarPic = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserNav = styled.div`
  display: flex;
  flex-direction: column;
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
    if (localStorage.getItem('symposium_user_id')) {
      return (
        <DivWrapper>
          <AvatarPic>
            <div onClick = { this.goToProfilePage }>
              <Avatar
                height = '100px'
                width = '100px'
                src = { avatar }
              />
            </div>
          </AvatarPic>
          <UserNav>
            <Welcome>Welcome,
              <Link className = 'username' to = { `/settings/${ user_id }` }>{ username }</Link>
            </Welcome>
              <Signoutwrapper>
                <Signout onClick = { ev => this.clickSignout(ev) }>Sign Out</Signout>
              </Signoutwrapper>
          </UserNav>
        </DivWrapper>
      );
    } else {
      return(
        <DivWrapper>
          <div>
          Want to participate in the conversation?<br/>
          <Link to ='/'>Sign up / Log in</Link>
          </div>
        </DivWrapper>
      );
    }
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
