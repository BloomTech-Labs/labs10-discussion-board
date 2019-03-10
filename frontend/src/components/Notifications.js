import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { removeNotification } from '../store/actions/index.js';

// components
import { Notification } from './index.js';

const DivBackgroundModal = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const NotificationsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 2;
	position: absolute;
	border: 1px solid black;
	border-radius: 5px;
	background-color: white;
	color: black;
	padding: 5px;
	width: 310px;
	top: 90px;
	right: 0;
`;

const Notifications = ({ notifications, goTo, removeNotification, toggleShowNotifications }) => {
  return (
    <DivBackgroundModal onClick={() => toggleShowNotifications()}>
      <NotificationsWrapper>
        {
          notifications.length ?
            notifications.map((notification, i) =>
              <Notification
                key={i}
                notification={notification}
                goTo={goTo}
                removeNotification={removeNotification}
              />
            ) :
            <p>No notifications.</p>
        }
      </NotificationsWrapper>
    </DivBackgroundModal>
  );
};

export default connect(null, { removeNotification })(Notifications);
