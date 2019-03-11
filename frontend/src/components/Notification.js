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
  z-index: 9999;

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
    created_at,
  } = notification;
  let {
    discussion_body,
    post_body,
  } = notification;
  const handleRemove = () => removeNotification(id);
  if (discussion_body && discussion_body.length > maxLengthInNotifications) {
    discussion_body = discussion_body.slice(0, maxLengthInNotifications) + '...';
  }
  if (post_body && post_body.length > maxLengthInNotifications) {
    post_body = post_body.slice(0, maxLengthInNotifications) + '...';
  }
  return (
    <NotificationWrapper>
      <i onClick={handleRemove} className='far fa-times-circle remove-btn' />
      <p>New {category_id ? 'discussion' : 'post'} added {moment(new Date(Number(created_at))).fromNow()} in</p>
      <p>{category_id ? `/d/${category_name}` : `${discussion_body}`}:</p>
      {
        category_id ?
          <p className='links' onClick={(ev) => goTo(ev, `/discussion/${discussion_id}`)}>{discussion_body}</p> :
          <p className='links' onClick={(ev) => goTo(ev, `/discussion/${discussion_id}#${post_id}`)}>{post_body}</p>
      }
    </NotificationWrapper>
  );
};

export default Notification;
