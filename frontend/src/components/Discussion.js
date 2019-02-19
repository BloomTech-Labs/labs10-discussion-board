import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

// components
import { AddPostForm } from './index.js';

// views
import { PostsView } from '../views/index.js';

// action creators
import { getDiscussionById, removePost } from '../store/actions/index.js';

const DiscussionWrapper = styled.div`
    width: 90%;
`;

class Discussion extends Component {
	state = { showAddPostForm: false, showEditPostForm: null };
	toggleAddPostForm = () => this.setState({ showAddPostForm: !this.state.showAddPostForm });
	updateEditPostForm = post_id => this.setState({ showEditPostForm: post_id });
	handleRemovePost = (user_id, post_id, historyPush, discussion_id) => {
		return this.props.removePost(user_id, post_id, historyPush, discussion_id);
	};
	componentDidMount = () => this.props.getDiscussionById(this.props.id);
	render() {
		const { showAddPostForm, showEditPostForm } = this.state;
		const { discussion, historyPush } = this.props;
		const {
			body,
			category_id,
			category_name,
			created_at,
			discussion_votes,
			id,
			posts,
			title,
			user_id,
			username,
		} = discussion;

		return(
			<DiscussionWrapper>
				<h1>DISCUSSION</h1>
				<p>/d/{ category_name }</p>
				<p>Discussion Votes: { discussion_votes }</p>
				<p>Posted by: { username } { moment(created_at).fromNow() }</p>
				<p>Title: { title }</p>
				<p>Body: { body }</p>

				<button onClick = { this.toggleAddPostForm }>Add a Post</button>
				{
					showAddPostForm &&
					<AddPostForm
						user_id = { this.props.user_id }
						discussion_id = { id }
						historyPush = { historyPush }
					/>
				}

				<PostsView
					posts = { posts }
					historyPush = { historyPush }
					showEditPostForm = { showEditPostForm }
					updateEditPostForm = { this.updateEditPostForm }
					handleRemovePost = { this.handleRemovePost }
				/>
			</DiscussionWrapper>
		);
	}
};

const mapStateToProps = state => ({
	discussion: state.discussions.discussion,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { getDiscussionById, removePost })(Discussion);
