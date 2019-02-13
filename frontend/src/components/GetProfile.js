import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopPostWrapper = styled.div`
	margin: 5px;
	padding: 10px;
	border: 1px solid black;

	.discussion-title {
		font-weight: bold;
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const GetProfile = ({ profile }) => {
	const {
		username,
		password,
		email,
		status
	} = profile;
	return (
		<TopPostWrapper>
			<div>
				<span className = 'discussion-title'>{ username }</span>&#8201;
				<span>/d/{ username }</span>
			</div>

			<div>
				<span>{ email }</span>&#8201;
				<span> - { moment(status).fromNow() }</span>
			</div>
			<p>{ password }</p>
		</TopPostWrapper>
	);
};

export default GetProfile;
