import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { TopPost } from '../components/index.js';

// action creators
import { getTopPosts } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopPostsViewWrapper = styled.div`
	padding: 10px;
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class TopPostsView extends Component {
	componentDidMount = () => this.props.getTopPosts();
	render() {
		const { topPosts } = this.props;
		return (
			<TopPostsViewWrapper>
				{
					topPosts.map((post, index) => <TopPost key = { index } post = { post } />)
				}
			</TopPostsViewWrapper>
		);
	}
};

const mapStateToProps = state => ({
	topPosts: state.posts.topPosts,
});

export default connect(mapStateToProps, { getTopPosts })(TopPostsView);
