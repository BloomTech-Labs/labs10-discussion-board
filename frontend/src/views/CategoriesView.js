import React from 'react';
import styled from 'styled-components';

import { CategoriesList } from '../components/index.js'

const CategoriesWrapper = styled.div`

    .header {
        text-align: center;
        margin-bottom: 40px;
    }
`

const CategoriesView = () => {
    return(
        <CategoriesWrapper>
            <div className='header'>
                <h1> Categories (designs coming soon)</h1>
            </div>
                <CategoriesList />
        </CategoriesWrapper>
    )
}

export default CategoriesView;