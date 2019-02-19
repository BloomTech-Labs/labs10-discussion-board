import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GET_DISCUSSIONS_LOADING } from '../store/actions';

const SingleCategory = styled.div`
    width: 300px;
    margin: 5px 10px;
`

const CategoryName = styled.div`
    margin: 10px 0;
    font-weight: bold;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

//import moment and add created_At in the migrations if wish to include 
//a timestamp of creation
const DiscussionsByCat = ({ discussion }) => {
    const {
        id,
        user_id,
        username,
        created_at,
        category_name, 
        discussion_votes,
        title,
        body,
        category_id,
    } = discussion;

    return(
        <SingleCategory>
           <h1><Link className='discussion-link' to = {`/discussion/${category_id}`}>DISCUSSION</Link></h1>
				<p>/d/{ category_name }</p>
				<p>Discussion Votes: { discussion_votes }</p>
				<p>Posted by: { username } { moment(created_at).fromNow() }</p>
				<p>Title: { title }</p>
				<p>Body: { body }</p>
        </SingleCategory>
    );
};

export default DiscussionsByCat;
