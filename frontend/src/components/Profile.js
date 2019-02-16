import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../assets/gif/spinner/Spinner'; //need to move to assets folder
import { getProfile } from '../store/actions/index';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const ProfilesWrapper = styled.div`
	margin: 4%;
	padding: 10px;
  border: 1px solid black;
  display: flex;
  align-content: space-between;
  width: 100%;
  background-color: #EEE7C8;

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


/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Profile extends Component {
    componentDidMount() {
      this.props.getProfile(this.props.match.params.id);
      console.log('profile component', this.props);
    }
  
    render() {
        let profileItems;
        console.log('save it', this.props.singleProfile)
      
    if (this.props.singleProfile.length === 0) {
        profileItems = <Spinner />;
    } else {
        if (this.props.singleProfile) {
          profileItems = this.props.singleProfile.map( (profile, index) => 
          <div key= {index}>
          <ProfilesWrapper>
            <WrappedDiv>
              <p className = 'property-title'> </p>
              <p className = 'property-content'> {profile.id}</p>
            </WrappedDiv>
            <WrappedDiv>
              <p className = 'property-title'> Username: </p>
              <p className = 'property-content'> {profile.username}</p>
            </WrappedDiv>
            <WrappedDiv>
              <p className = 'property-title'> Email: </p>
              <p className = 'property-content'> {profile.email}</p>
            </WrappedDiv>
            <WrappedDiv>
              <p className = 'property-title'> Status: </p>
              <p className = 'property-content'> {profile.status}</p>
            </WrappedDiv>
          </ProfilesWrapper>
          </div>)
        } else {
          profileItems = <h4>No profiles found...</h4>;
        }
    }
    console.log('profile props', this.props);
    return (
        
            <div>
              <h1 className = 'ProfileTitle'> PROFILE </h1>
              {profileItems}
            </div>
        );
    }
}

 Profile.propTypes = {
    getProfile: PropTypes.func,
    profile: PropTypes.shape({
      status: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
};
  
const mapStateToProps = state => ({
        singleProfile: state.profileRootReducer.singleProfileData
});
  
export default connect(mapStateToProps, { getProfile })(Profile);
  