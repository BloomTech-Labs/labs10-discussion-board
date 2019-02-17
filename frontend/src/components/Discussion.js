import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const DiscussionWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 5px;
	padding: 10px;
	
	box-shadow: 2px 3px 2px 2px gray;

	.discussion-title {
		font-weight: bold;
		font-size: 18px;
		color: black;
		&:hover {
			background-color:  rgba(255, 255, 255, 0.13);
			cursor: pointer;
			color:white;
		}
	}
	.discussion-body {
		font-size: 18px;
		color: black;
		&:hover {
			background-color:  rgba(255, 255, 255, 0.13);
			cursor: pointer;
			color:white;
		}
	}
	.nameanddate {
		font-size: 14px;
		color: black;
		&:hover {
			background-color:  rgba(255, 255, 255, 0.13);
			cursor: pointer;
			color:white;
		}
		cursor: pointer;
		
		:hover {
			text-decoration: underline;
		}
	}

	:hover {
		background-color:  rgba(255, 255, 255, 0.13);
	}

	.content {
		width: 85%;
	}

	p {
		margin-left: 10px;
		&:hover {
			background-color:  rgba(255, 255, 255, 0.13);
			cursor: pointer;
			color:white;
		}
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/

const Discussion = ({ discussion }) => {
    //user_id and category_id should be their respective names
    const {
        id,
        user_id,
        category_id,
        title,
        body,
        created_at
    } = discussion;
    
    return(
        <DiscussionWrapper>
                <span className = 'discussion-title'>
                    <Link className='discussion-link' to={`/discussions/${id}`}>
                        {title}
                    </Link>
                </span>
                <span className = 'discussion-body'> {body} </span>
                <span className = 'discussion-timestamp'> Created: { moment(created_at).fromNow() } </span>
        </DiscussionWrapper>
    )
}

export default Discussion;