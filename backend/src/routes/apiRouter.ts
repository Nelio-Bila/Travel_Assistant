import express = require('express');
import { getPopulation,getGdp, getWeather, getExchangeRate } from '../controllers/apiController';

const router = express.Router();

router.get('/population/:city', getPopulation);
router.get('/gdp/:city', getGdp);
router.get('/weather/:city', getWeather);
router.get('/exchangerate/:city', getExchangeRate);

export default router;
