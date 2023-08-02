import express = require('express');
import { getPopulation, getWeather } from '../controllers/apiController';

const router = express.Router();

router.get('/population/:city', getPopulation);
router.get('/weather/:city', getWeather);

export default router;
