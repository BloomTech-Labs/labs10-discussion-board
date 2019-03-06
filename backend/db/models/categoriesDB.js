const db = require('../dbConfig.js');

//gets All Categories
const getCategories = (order, orderType) => {
    return db('categories as c')
        .select(
            'u.username as user_username', 
            'c.name', 
            'c.id', 
            'c.user_id', 
            'c.created_at',
        )
        .count('d.id as discussion_count')
        .leftOuterJoin('users as u', 'u.id', 'c.user_id')
        .leftOuterJoin('discussions as d', 'd.category_id', 'c.id')
        .groupBy('c.name', 'c.id', 'u.username')
        // order by given order and orderType
        // else default to ordering by name ascending
        .orderBy(`${ order ? order : 'name' }`, `${ orderType ? orderType : 'asc' }`);
};

const getFollowedCategoryNames = user_id => {
    const categoryFollowsQuery = db('category_follows')
        .select('category_id')
        .where({ user_id });

    return db('categories as c')
        .select('c.id', 'c.name')
        .join(categoryFollowsQuery.as('cf'), function() {
            this.on('cf.category_id', '=', 'c.id');
        })
        .orderBy('c.id');
};

// get category by name
const getCategoryByName = name => {
    return db('categories')
        .select('name')
        .whereRaw('LOWER(name) = ?', name.toLowerCase())
        .first();
};

//Find By ID (categories own ID)
const findById = id => {
    return db('categories').where({ id });
};

//Add category into the categories table
const insert = category => {
    return db('categories').insert(category).returning('id');
};

const search = (searchText, order, orderType) => {
    return db('categories as c')
        .select('c.id', 'c.name', 'c.user_id', 'u.username', 'c.created_at')
        .leftOuterJoin('users as u', 'u.id', 'c.user_id')
        .whereRaw('LOWER(c.name) LIKE ?', `%${ searchText.toLowerCase() }%`)
        // order by given order and orderType, else default to ordering by created_at descending
        .orderBy(`${ order ? order : 'c.created_at' }`, `${ orderType ? orderType : 'desc' }`);
};

// //Find by User ID (Original Creator)
// const findByUserId = (user_id) => {
//     return db('categories').where('user_id', user_id)
// };

//AUTHORIZED ACCESS

// //EDIT [ACCOUNT TYPE ACCESS: USER_ID]
// const update = (category, id) => {
//     return db('categories')
//             .where('id', id)
//             .update(category)
// };

// //DELETE [ACCOUNT TYPE ACCESS: USER_ID, ADMIN]
// const remove = (id) => {
//     return db('categories')
//             .where('id', id)
//             .del()
// };

module.exports = {
    getCategories,
    getCategoryByName,
    getFollowedCategoryNames,
    findById,
    search,
    insert,
    // findByUserId,
    // update,
    // remove
};
