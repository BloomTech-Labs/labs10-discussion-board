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

//add discussion vote 
router.post('/', (req, res) => {
    // post_id, user_id, and type must be integers
    const { post_id, user_id, type } = req.body;
    if(
        !Number.isInteger(post_id) ||
        !Number.isInteger(user_id) ||
        !Number.isInteger(type)
    ){
        return res.status(400).json({ error:  'post_id, user_id, and type must all be integers.' })
    }
})

module.exports = router;