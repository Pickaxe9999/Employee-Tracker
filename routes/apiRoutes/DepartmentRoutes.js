const express = require('express');
const router = express.Router();
const db = require('../../db/connection.js');


router.get('/', (req,res) => {
    res.json({message: 'department routes success'});
})

module.exports = router;