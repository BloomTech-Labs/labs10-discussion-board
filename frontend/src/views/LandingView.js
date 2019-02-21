import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// views
import { TopDiscussionsView } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const LandingViewWrapper = styled.div`
  background-color: #d3ccaf;
  width: 90%;
  border: 1px solid white;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const LandingView = props => {
  return (
    <LandingViewWrapper>
      {props.loggingInLoadingMessage ? (
        <div>Logging in...</div>
      ) : (
        <TopDiscussionsView />
      )}
    </LandingViewWrapper>
  );
};

// LandingView.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  {}
)(LandingView);
