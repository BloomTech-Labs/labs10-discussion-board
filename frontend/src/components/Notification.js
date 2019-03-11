import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// globals
import { maxLengthInNotifications } from '../globals/globals.js';

const NotificationWrapper = styled.div`
	margin: 5px;
	border-radius: 5px;
	border: 1px solid black;
	padding: 5px;
	position: relative;

	* {
		margin: 0;
	}

	.remove-btn {
		position: absolute;
		top: 5px;
		right: 5px;

		&:hover {
			color: red;
			cursor: pointer;
		}
	}

	.links {
		font-weight: bold;

		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	}
`;

const Notification = ({ notification, goTo, removeNotification }) => {
	const {
		id,
		category_id,
		category_name,
		discussion_id,
		post_id,
		reply_id,
		created_at,
	} = notification;
	let {
		discussion_body,
		post_body,
		reply_body,
	} = notification;
	const goToDiscussion = () => goTo(`/discussion/${ discussion_id }`);
	const goToPost = () => goTo(`/discussion/${ discussion_id }#${ post_id }`);
	const handleRemove = () => removeNotification(id);
	if (discussion_body && discussion_body.length > maxLengthInNotifications) {
		discussion_body = discussion_body.slice(0, maxLengthInNotifications) + '...';
	}
	if (post_body && post_body.length > maxLengthInNotifications) {
		post_body = post_body.slice(0, maxLengthInNotifications) + '...';
	}
	if (reply_body && reply_body.length > maxLengthInNotifications) {
		reply_body = reply_body.slice(0, maxLengthInNotifications) + '...';
	}
	return(
		<NotificationWrapper>
			<i onClick = { handleRemove } className = 'far fa-times-circle remove-btn' />
			<p>New { category_id ? 'post' : reply_id ? 'reply' : 'comment' } added { moment(new Date(Number(created_at))).fromNow() } in</p>
			<p>{ category_id ? `/d/${ category_name }` : reply_id ? `${ post_body }` : `${ discussion_body }` }:</p>
			{
				category_id ?
				<p className = 'links' onClick = { goToDiscussion }>{ discussion_body }</p> :
				reply_id ?
				<p className = 'links' onClick = { goToPost }>{ reply_body }</p> :
				<p className = 'links' onClick = { goToPost }>{ post_body }</p>
			}
		</NotificationWrapper>
	);
};

export default Notification;
