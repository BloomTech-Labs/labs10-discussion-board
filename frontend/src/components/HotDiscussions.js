import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { HotDiscussion } from '../components/index.js';

// action creators
import { getHotDiscussions, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const HotDiscussionsViewWrapper = styled.div`
.sort{
	color: ${props => props.theme.topDiscussionTitleColor};
	padding: 5px;
}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class HotDiscussions extends Component {
	handleDiscussionVote = (discussion_id, type) => {
		const { getHotDiscussions, handleDiscussionVote } = this.props;
		return handleDiscussionVote(discussion_id, this.props.user_id, type)
			.then(() => getHotDiscussions());
	};
	componentDidMount = () => this.props.getHotDiscussions();
	render() {
		const { hotDiscussions } = this.props;
		return (
			<HotDiscussionsViewWrapper>
				{
					hotDiscussions.map((discussion, index) =>
						<HotDiscussion
							key = { index }
							discussion = { discussion }
							handleDiscussionVote = { this.handleDiscussionVote }
						/>
					)
				}
			</HotDiscussionsViewWrapper>
		);
	}
};

const mapStateToProps = state => ({
	hotDiscussions: state.discussions.hotDiscussions,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { getHotDiscussions, handleDiscussionVote })(HotDiscussions);
