import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Categories } from '../components/index.js';

import { getCategories } from '../store/actions/index.js';


class CategoriesList extends Component {
    componentDidMount = () => this.props.getCategories();
    render() {
        const { categories } = this.props;
        return(
            <div>
                {
                    categories.map((category, index) => 
                    <Categories 
                        key = {index} 
                        category = {category}
                    />)
                }
            </div>
        );
    };
};

const mapStateToProps = state => ({
	categories: state.categories.categories,
});

export default connect(mapStateToProps, { getCategories })(CategoriesList);
