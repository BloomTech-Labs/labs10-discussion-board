import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Categories } from '../components/index.js';

import { getCategories } from '../store/actions/index.js';

const CategoryWrapper = styled.div`
    display: flex;
`

class CategoriesList extends Component {
    componentDidMount = () => this.props.getCategories();
    render() {
        console.log('in the CategoriesList', this.props)
        const { categories } = this.props;
        return(
            <CategoryWrapper>
                {
                    categories.map((category, index) => 
                    <Categories 
                        key = {index} 
                        category = {category}
                    />)
                }
            </CategoryWrapper>
        )
    }
}

const mapStateToProps = state => ({
	categories: state.categories.categories,
});

export default connect(mapStateToProps, { getCategories })(CategoriesList);
