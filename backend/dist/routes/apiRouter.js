"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiController_1 = require("../controllers/apiController");
const router = express.Router();
router.get('/population/:city', apiController_1.getPopulation);
router.get('/weather/:city', apiController_1.getWeather);
exports.default = router;
