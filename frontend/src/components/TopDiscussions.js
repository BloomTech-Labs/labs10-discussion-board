import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { TopDiscussion } from '../components/index.js';

// action creators
import { getTopDiscussions } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionsViewWrapper = styled.div`
	padding: 10px;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class TopDiscussions extends Component {
	componentDidMount = () => this.props.getTopDiscussions();
	render() {
		const { topDiscussions } = this.props;
		return (
			<TopDiscussionsViewWrapper>
				{
					topDiscussions.map((discussion, index) => <TopDiscussion key = { index } discussion = { discussion } />)
				}
			</TopDiscussionsViewWrapper>
		);
	}
};

const mapStateToProps = state => ({
	topDiscussions: state.discussions.topDiscussions,
});

export default connect(mapStateToProps, { getTopDiscussions })(TopDiscussions);
