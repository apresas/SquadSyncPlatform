import express from 'express';
import scheduleControllers from '../controllers/schedule.controller.js'

const router = express.Router();

router.get("/", scheduleControllers.index);

export default router;