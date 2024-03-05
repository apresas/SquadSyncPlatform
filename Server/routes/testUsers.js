const express = require('express');
const scheduleControllers = require('../controllers/schedule.controller.js')

const router = express.Router();

router.get('/', scheduleControllers.index)

router.get('/:userID', scheduleControllers.showByUser);

module.exports = router; 

