const express = require('express');
const eventControllers = require('../controllers/event.controller.js')

const router = express.Router();

router.get('/', eventControllers.index);

router.get("/:goalID", eventControllers.showByGoalID)

module.exports = router; 