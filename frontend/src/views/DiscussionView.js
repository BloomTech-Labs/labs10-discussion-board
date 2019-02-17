import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

// views
import { PostsView } from './index.js';

// action creators
import { getDiscussionById } from '../store/actions/index.js';

const DiscussionViewWrapper = styled.div`
    width: 90%;
`

class DiscussionView extends Component {
	componentDidMount = () => this.props.getDiscussionById(this.props.match.params.id);
	render() {
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
			<DiscussionViewWrapper>
				<h1>DISCUSSION</h1>
				<p>/d/{ category_name }</p>
				<p>Discussion Votes: { discussion_votes }</p>
				<p>Posted by: { username } { moment(created_at).fromNow() }</p>
				<p>Title: { title }</p>
				<p>Body: { body }</p>

				<PostsView posts = { posts } />
			</DiscussionViewWrapper>
		)
	}
};

const mapStateToProps = state => ({
	discussion: state.discussions.discussion,
});

export default connect(mapStateToProps, { getDiscussionById })(DiscussionView);
