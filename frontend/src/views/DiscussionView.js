import React from 'react';
import styled from 'styled-components';

// components
import { Discussion, Follow } from '../components/index.js';

const DiscussionViewWrapper = styled.div`
	width: 90%;
`;

const DiscussionView = ({ history, match }) => {
	const { id } = match.params;
	const historyPush = history.push;
	return(
		<DiscussionViewWrapper>
			<Follow discussion_id = {id}/>
			<Discussion id = { id } historyPush = { historyPush } />
			
		</DiscussionViewWrapper>
	);
};

export default DiscussionView;
