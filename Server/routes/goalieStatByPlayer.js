const express = require('express');
const goalieStatControllers = require('../controllers/goalieStat.controller.js')

const router = express.Router();

router.get('/', goalieStatControllers.index);

router.get('/:playerID', goalieStatControllers.showByPlayerID);


module.exports = router;  