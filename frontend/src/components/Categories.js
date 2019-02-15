import React from 'react';


//import moment and add created_At in the migrations if wish to include 
//a timestamp of creation
const Categories = ({ category }) => {
    const {
        id,
        user_id,
        user_username,
        name,
        created_at
    } = category;

    return(
        <div>
            <div>
                <span> { name } </span>
            </div>
            <div>
                <span>Created By: {user_username} </span>
                <span>Created At: {created_at} </span>
            </div>
        </div>
    );
};

export default Categories;
