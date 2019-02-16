import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CategoriesList } from '../components/index.js'

const CategoriesWrapper = styled.div`
    width: 90%;

    .header {
        text-align: center;
        margin-bottom: 10px;
    }
    hr {
        border-color: black;
        margin-bottom: 5px;
    }
    .link{
        font-size: 18px;
        display: flex;
        margin-left: 48%;
        align-items: center;
        text-decoration: none;
        color: white
        &:hover {
			cursor: pointer;
			color: black;
		}
    }
`

const CategoriesView = () => {
    return(
        <CategoriesWrapper>
            <div className='header'>
            <Link className="link c-link" to="/profiles">Profiles</Link>
                <h1> Categories (designs coming soon)</h1>
            </div>
            <hr></hr>
                <CategoriesList />
        </CategoriesWrapper>
    )
}



export default CategoriesView;