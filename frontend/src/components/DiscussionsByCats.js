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
	state = {
		order: 'created_at', // possible values: 'created_at', 'post_count', 'discussion_votes'
		orderType: '', // possible values: 'desc', 'asc'
	};
	handleDiscussionVote = (discussion_id, type) => {
		const { order, orderType } = this.state;
		const { getDiscussionsByCat, handleDiscussionVote, category_id, user_id } = this.props;
		return handleDiscussionVote(discussion_id, user_id, type)
			.then(() => getDiscussionsByCat(category_id, order, orderType));
	};
	handleSelectChange = e => this.setState({ [e.target.name]: e.target.value }, () => {
		return this.props.getDiscussionsByCat(this.props.category_id, this.state.order, this.state.orderType);
	});
	componentDidMount = () => {
		const { order, orderType } = this.state;
		const { getDiscussionsByCat, category_id } = this.props;
		return getDiscussionsByCat(category_id, order, orderType);
	};

	componentDidUpdate(prevProps) {
		const { category_id, getDiscussionsByCat } = this.props;
		const { order, orderType } = this.state;
		if (prevProps.category_id !== category_id) {
			return getDiscussionsByCat(category_id, order, orderType);
		};
	};
	render() {
		const { discussions } = this.props;
		const { order } = this.state;
		return (
			<DiscussionsByCatViewWrapper>
				<span>Sort by: </span>
				<select onChange = { this.handleSelectChange } name = 'order'>
					<option value = 'created_at'>date created</option>
					<option value = 'post_count'>number of posts</option>
					<option value = 'discussion_votes'>votes</option>
				</select>
				<select onChange = { this.handleSelectChange } name = 'orderType'>
					<option value = 'desc'>
						{ order === 'created_at' ? 'most recent first' : 'most first' }
					</option>
					<option value = 'asc'>
						{ order === 'created_at' ? 'least recent first' : 'least first' }
					</option>
				</select>
				{
					discussions.map((discussion, index) =>
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
	discussions: state.discussions.discussions,
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { getDiscussionsByCat, handleDiscussionVote })(DiscussionsByCats);
