const express = require('express');
const testControllers = require('../controllers/test.controller.js')

const router = express.Router();

router.get('/', testControllers.index)

router.get('/:userID', testControllers.showByUser);

module.exports = router; 

