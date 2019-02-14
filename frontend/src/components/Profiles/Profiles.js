import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner'; //need to move to assets folder
import { getProfiles } from '../../store/actions/index.js';


class Profiles extends Component {
    componentDidMount() {
      this.props.getProfiles();
    }
  
    render() {
      const { profiles, loading } = this.props.getprofiles;
      let profileItems;
  
    if (profiles === null || loading) {
        profileItems = <Spinner />;
    } else {
        if (profiles.length > 0) {
          profileItems = <h1>hey</h1>
        } else {
          profileItems = <h4>No profiles found...</h4>;
        }
    }
  
    return (
            <div>{profileItems}</div>
        );
    }
}
  
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
        profile: state.profile
});
  
export default connect(mapStateToProps, { getProfiles })(Profiles);
  