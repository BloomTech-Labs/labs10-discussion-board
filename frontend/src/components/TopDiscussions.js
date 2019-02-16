import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { TopDiscussion } from '../components/index.js';

// action creators
import { getTopDiscussions, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionsViewWrapper = styled.div`

`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class TopDiscussions extends Component {
	componentDidMount = () => this.props.getTopDiscussions();
	handleDiscussionVote = (discussion_id, type) => {
		const { getTopDiscussions, handleDiscussionVote } = this.props;
		return handleDiscussionVote(discussion_id, this.props.user_id, type)
			.then(() => getTopDiscussions());
	};
	render() {
		const { topDiscussions } = this.props;
		return (
			<TopDiscussionsViewWrapper>
				{
					topDiscussions.map((discussion, index) =>
						<TopDiscussion
							key = { index }
							discussion = { discussion }
							handleDiscussionVote = { this.handleDiscussionVote }
						/>
					)
				}
			</TopDiscussionsViewWrapper>
		);
	}
};

const mapStateToProps = state => ({
	topDiscussions: state.discussions.topDiscussions,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { getTopDiscussions, handleDiscussionVote })(TopDiscussions);
