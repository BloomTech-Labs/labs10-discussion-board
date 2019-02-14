import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../assets/gif/spinner/Spinner'; //need to move to assets folder
import { getProfiles } from '../../store/actions/index';
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
  background-color: pink;

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
class Profiles extends Component {
    componentDidMount() {
      this.props.getProfiles();
    }
  
    render() {
      const { profiles, loading } = this.props.profiles;
      let profileItems;
      
    if (profiles === null || loading ) {
        profileItems = <Spinner />;
    } else {
        if (profiles.length > 0) {
          profileItems = profiles.map( (profile, index) => 
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
  
    return (
            <div>
              <h1 className = 'property-title'> PROFILES </h1>
              {profileItems}
            </div>
        );
    }
}
  
 Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      status: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    })
};
  
const mapStateToProps = state => ({
        profiles: state.profiles.profiles
});
  
export default connect(mapStateToProps, { getProfiles })(Profiles);
  