const db = require('../dbConfig.js');

//gets All Categories
const getCategories = () => {
    return db('categories as c')
        .select(
            'u.username as user_username', 
            'c.name', 
            'c.id', 
            'c.user_id', 
            'u.id',
            'c.created_at'
            )
        .join('users as u', 'u.id', 'c.user_id')
};

//Find By ID (categories own ID)
const findById = (id) => {
    return db('categories').where('id', id)
};

//Find by User ID (Original Creator)
const findByUserId = (user_id) => {
    return db('categories').where('user_id', user_id)
};

//AUTHORIZED ACCESS

//Add category into the categories table
const insert = (category) => {
    return db('categories').insert(category)
};


//EDIT [ACCOUNT TYPE ACCESS: USER_ID]
const update = (category, id) => {
    return db('categories')
            .where('id', id)
            .update(category)
};

//DELETE [ACCOUNT TYPE ACCESS: USER_ID, ADMIN]
const remove = (id) => {
    return db('categories')
            .where('id', id)
            .del()
};

module.exports = {
    getCategories,
    findById,
    findByUserId,
    insert,
    update,
    remove
};
