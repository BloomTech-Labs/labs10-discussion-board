import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

// components
import { AddPostForm } from './index.js';

// views
import { PostsView } from '../views/index.js';

// action creators
import { getDiscussionById } from '../store/actions/index.js';

const DiscussionWrapper = styled.div`
    width: 90%;
`;

class Discussion extends Component {
	state = { showAddPostForm: false };
	toggleAddPostForm = () => this.setState({ showAddPostForm: !this.state.showAddPostForm });
	componentDidMount = () => this.props.getDiscussionById(this.props.id);
	render() {
		const { showAddPostForm } = this.state;
		const { discussion } = this.props;
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
				{ showAddPostForm && <AddPostForm user_id = { this.props.user_id } /> }

				<PostsView posts = { posts } />
			</DiscussionWrapper>
		);
	}
};

const mapStateToProps = state => ({
	discussion: state.discussions.discussion,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { getDiscussionById })(Discussion);
