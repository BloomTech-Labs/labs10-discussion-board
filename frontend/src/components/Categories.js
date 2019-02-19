import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleCategory = styled.div`
    width: 300px;
    margin: 5px 10px;
`

const CategoryName = styled.div`
    margin: 10px 0;
    font-weight: bold;
`

const CategoryLink = styled.div`
    .category-link {
        color: black;

        &:hover {
            cursor: pointer;
            color: white;
        }
    }
`

//import moment and add created_At in the migrations if wish to include 
//a timestamp of creation
const Categories = ({ category }) => {
    const {
        id,
        user_id,
        user_username,
        name,
        created_at,
    } = category;

    return(
        <SingleCategory>
            <CategoryName className ={`${category.name}`}>
                <CategoryLink>
                    <Link className='category-link' to = {`/discussions/category/${id}`} >{ name } </Link>
                </CategoryLink>
            </CategoryName>
            <div className = 'createdBy'><span>Created By: {user_username}</span></div>
            <div className = 'createdAt'><span>Created: { moment(created_at).fromNow() }</span></div>
        </SingleCategory>
    );
};

export default Categories;
