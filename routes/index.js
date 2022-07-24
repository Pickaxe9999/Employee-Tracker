const express = require('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');

//api routes
router.use('/api', apiRoutes);

module.exports = router;

