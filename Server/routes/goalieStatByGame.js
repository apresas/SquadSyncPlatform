const express = require('express');
const goalieStatControllers = require('../controllers/goalieStat.controller.js')

const router = express.Router();

router.get('/', goalieStatControllers.index);

router.get('/:gameID', goalieStatControllers.showByGameID);


module.exports = router;  