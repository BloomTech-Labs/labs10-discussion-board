import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../assets/gif/spinner/Spinner'; //need to move to assets folder
import { getProfile, getProfileDiscussions } from '../store/actions/index';
import styled from 'styled-components';

// components
import { Avatar } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const ProfileWrapper = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  align-content: space-between;
  width: 100%;
  background-color: #d3ccaf;

  .discussion-title {
    font-weight: bold;
  }
`;

const WrappedDiv = styled.div`
  margin: 5px;
  padding: 2%;
  display: flex;

  .property-title {
    font-weight: bold;
    display: flex;
    justify-content: space-around;
  }
  .property-content {
    padding: 0 0 0 5%;
    display: flex;
    justify-content: space-around;
  }
`;

const ProfileTitle = styled.div`
  margin: 5px;
  padding: 2%;
  display: flex;
  font-weight: bold;
  justify-content: space-around;
  color: black;
  font-size: 36px;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Profile extends Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
    // this.props.getProfileDiscussions(this.props.id);
    // console.log('profdisc', this.props.getProfileDiscussions(this.props.id));
  }

  /* we use profileItems to manipulate what data is displayed. if the data received from our props is 0,
  profileItems displays our spinner component, however if our props contains a profile we display that profile
  by mapping through our data received and choosing what properties we want to display with our profile parameter*/
  render() {
    let profileItems;
    if (this.props.profile.length === 0) {
      profileItems = <Spinner />;
    } else {
      if (this.props.profile) {
        profileItems = this.props.profile.map((profile, index) => (
          <div key={index}>
            <ProfileWrapper>
              <WrappedDiv>
                <p className='property-title'> </p>
                <p className='property-content'> {profile.id}</p>
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-title'>Avatar: </p>
                <Avatar
                  height = '50px'
                  width = '50px'
                  src = { profile.avatar }
                />
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-title'> Username: </p>
                <p className='property-content'> {profile.username}</p>
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-title'> Status: </p>
                <p className='property-content'> {profile.status}</p>
              </WrappedDiv>
              <WrappedDiv>
                <p className='property-title'> Discussions: </p>
                {profile.discussions.map((discussion, index)=> <p key= {index}>{discussion.title}</p>)}
              </WrappedDiv>
            </ProfileWrapper>
          </div>
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <div>
        <ProfileTitle> PROFILE </ProfileTitle>
        {profileItems}
      </div>
    );
  }
}

Profile.propTypes = {
    getProfile: PropTypes.func,
    profile: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
    }))
};
  
const mapStateToProps = state => ({
        profile: state.profilesData.singleProfileData
});

export default connect(mapStateToProps,{ getProfile, getProfileDiscussions })(Profile);
