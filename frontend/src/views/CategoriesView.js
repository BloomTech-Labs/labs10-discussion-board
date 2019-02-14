import React from 'react';

import { CategoriesList } from '../components/index.js'

const CategoriesView = () => {
    return(
        <div className='wrapper'>
            <div className='header'>
                <div><h1> Categories (designs coming soon)</h1></div>
                <CategoriesList />
            </div>
        </div>
    )
}

export default CategoriesView;