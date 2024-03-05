const express = require('express');
const scheduleControllers = require('../controllers/schedule.controller.js')

const router = express.Router();

router.post("/", scheduleControllers.save);

router.get("/:id", scheduleControllers.show);

router.get('/', scheduleControllers.index);

router.patch('/:id', scheduleControllers.update);

router.delete('/:id', scheduleControllers.destroy);

module.exports = router;              