import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { removeNotification } from '../store/actions/index.js';

// components
import { Notification } from './index.js';

const NotificationsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 2;
	position: absolute;
	border: 1px solid red;
	border-radius: 5px;
	background-color: #54BDFF;
	color: black;
	padding: 5px;
	width: 310px;
	top: 90px;
	right: 0;
`;

const Notifications = ({ notifications, goTo, removeNotification }) => {
	return(
		<NotificationsWrapper>
			{
				notifications.length ?
				notifications.map((notification, i) =>
					<Notification
						key = { i }
						notification = { notification }
						goTo = { goTo }
						removeNotification = { removeNotification }
					/>
				) :
				<p>No notifications.</p>
			}
		</NotificationsWrapper>
	);
};

export default connect(null, { removeNotification })(Notifications);
