const express = require('express');
const eventControllers = require('../controllers/event.controller.js')

const router = express.Router();

router.post("/", eventControllers.save);

router.get("/:eventID", eventControllers.show);

router.get('/', eventControllers.index);

router.patch('/:eventID', eventControllers.update);

router.delete('/:eventID', eventControllers.destroy);

module.exports = router;      