import React from 'react';
import styled from 'styled-components';

const CategoryName = styled.div`
    margin: 5px 20px;
    font-weight: bold;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

const CreatedBy = styled.div`
    margin: 5px 20px;
`

//import moment and add created_At in the migrations if wish to include 
//a timestamp of creation
const Categories = ({ category }) => {
    const {
        id,
        user_id,
        name
    } = category;

    return(
        <div>
            <CategoryName><span> { name } </span></CategoryName>
            <CreatedBy><span>Created By: {user_id} </span></CreatedBy>
        </div>
    )
}

export default Categories;
