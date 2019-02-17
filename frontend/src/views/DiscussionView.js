import React from 'react';
import styled from 'styled-components';

// components
import { Discussion } from '../components/index.js';

const DiscussionViewWrapper = styled.div`
    width: 90%;
`;

const DiscussionView = ({ match }) => {
	const { id } = match.params;
	return(
		<DiscussionViewWrapper>
			<Discussion id = { id } />
		</DiscussionViewWrapper>
	);
};

export default DiscussionView;
