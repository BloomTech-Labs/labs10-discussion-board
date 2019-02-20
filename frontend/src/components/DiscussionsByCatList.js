import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { DiscussionsByCat } from '../components/index.js';

// action creators
import { getDiscussionsByCat, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionsViewWrapper = styled.div`

`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class DiscussionsByCatList extends Component {
	componentDidMount = () =>{
        this.props.getDiscussionsByCat(this.props.category_id)};
	handleDiscussionVote = (discussion_id, type) => {
		const { getDiscussionsByCat, handleDiscussionVote } = this.props;
		return handleDiscussionVote(discussion_id, this.props.user_id, type)
			.then(() => getDiscussionsByCat());
	};
	render() {
		const { discussionsByCat } = this.props;
		return (
			console.log('in the DiscByCatList', this.props.handleDiscussionVote),
			<TopDiscussionsViewWrapper>
				{
					discussionsByCat.map((discussion, index) =>
						<DiscussionsByCat
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
	discussionsByCat: state.discussions.discussionsByCat,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { getDiscussionsByCat, handleDiscussionVote })(DiscussionsByCatList);
