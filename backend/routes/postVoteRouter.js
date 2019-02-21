require('dotenv').config();
const express = require('express');
const { postVotesDB } = require('../db/models/index.js');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
// None

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

//add post vote 
router.post('/', (req, res) => {
    console.log('in the router')
    // post_id, user_id, and type must be integers
    const { post_id, user_id, type } = req.body;
    if(
        !Number.isInteger(post_id) ||
        !Number.isInteger(user_id) ||
        !Number.isInteger(type)
    ){
        return res.status(400).json({ error:  'post_id, user_id, and type must all be integers.' })
    }
        //Check to see if User has already voted
        return postVotesDB.get(post_id, user_id)
            .then(post => {
                //If user had already voted
                if (post.length) {
                    //and it was the same vote type
                } if(post[0].type === type) {
                    //then remove the vote
                    return postVotesDB.remove(post.id, user.id)
                        .then(() => res.status(201).json({ error: 'Vote has been removed' }))
                        .catch(() => res.status(500).json({ error: `Failed to update(): ${ err }` }))        
                }
                //Else If user has not voted, add the vote type
                return postVotesDB.add( post.id, user.id, type)
                    .then(() => res.status(200).json({ message: 'Vote added!'}))
                    .catch(() => res.status(500).json({ error: `Failed to add(): ${ err }` }))
                })
            .catch(() => {
                res.status(500).json({ error: `Failed to get(): ${ err }`});
            });
});

module.exports = router;