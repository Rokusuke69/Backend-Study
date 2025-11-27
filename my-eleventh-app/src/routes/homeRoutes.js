// src/routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const { getHome, getError } = require('../controllers/homeController');

// Map the path '/' to the controller function 'getHome'
router.get('/', getHome);
router.get('/broken', getError);

module.exports = router;
