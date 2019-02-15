import React from 'react';
import styled from 'styled-components';

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
`

const CategoriesView = () => {
    return(
        <CategoriesWrapper>
            <div className='header'>
                <h1> Categories (designs coming soon)</h1>
            </div>
            <hr></hr>
                <CategoriesList />
        </CategoriesWrapper>
    )
}



export default CategoriesView;