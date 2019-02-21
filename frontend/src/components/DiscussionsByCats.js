import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { DiscussionsByCat } from './index.js';

// action creators
import { getDiscussionsByCat, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const DiscussionsByCatViewWrapper = styled.div`

`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class DiscussionsByCats extends Component {
	componentDidMount = () =>{
        this.props.getDiscussionsByCat(this.props.category_id, this.props.category_name)};
	handleDiscussionVote = (discussion_id, type) => {
		const { getDiscussionsByCat, handleDiscussionVote } = this.props;
		return handleDiscussionVote(discussion_id, this.props.user_id, type)
			.then(() => getDiscussionsByCat(this.props.category_id, this.props.category_name));
	};
	render() {
		const { discussionsC } = this.props;
		return (
			<DiscussionsByCatViewWrapper>
				{
					discussionsC.map((discussion, index) =>
						<DiscussionsByCat
							key = { index }
							discussion = { discussion }
							handleDiscussionVote = { this.handleDiscussionVote }
						/>
					)
				}
			</DiscussionsByCatViewWrapper>
		);
	}
};

const mapStateToProps = state => ({
	discussionsC: state.discussions.discussionsC,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { getDiscussionsByCat, handleDiscussionVote })(DiscussionsByCats);
