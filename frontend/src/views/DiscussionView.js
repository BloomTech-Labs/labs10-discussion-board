import React from 'react';
import styled from 'styled-components';

// components
import { Discussion, Follow } from '../components/index.js';

const DiscussionViewWrapper = styled.div`
	width: 90%;

`;

const DiscussionView = ({ history, match, scrollTo }) => {
	const { id } = match.params;
	const historyPush = history.push;
	return(
		<DiscussionViewWrapper>
			<Follow discussion_id = {id} historyPush = { historyPush }/>
			<Discussion id = { id } scrollTo = {scrollTo} historyPush = { historyPush } history = { history } />
		</DiscussionViewWrapper>
	);
};

export default DiscussionView;
