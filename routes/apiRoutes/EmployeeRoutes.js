const express = require('express');
const router = express.Router();
const db = require('../../db/connection.js');


router.get('/', (req,res) => {
    res.json({message: 'employee routes success'});
})

module.exports = router;