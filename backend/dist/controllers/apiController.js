"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRate = exports.getWeather = exports.getGdp = exports.getPopulation = void 0;
const dataService_1 = require("../models/dataService");
const getPopulation = async (req, res) => {
    const city = req.params.city;
    try {
        const populationData = await (0, dataService_1.getPopulationData)(city);
        res.json(populationData);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
exports.getPopulation = getPopulation;
const getGdp = async (req, res) => {
    const city = req.params.city;
    try {
        const gdpData = await (0, dataService_1.getGdpData)(city);
        res.json(gdpData);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
exports.getGdp = getGdp;
const getWeather = async (req, res) => {
    const city = req.params.city;
    try {
        const weatherData = await (0, dataService_1.getWeatherData)(city);
        res.json(weatherData);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
exports.getWeather = getWeather;
const getExchangeRate = async (req, res) => {
    const city = req.params.city;
    try {
        const exchangeRateData = await (0, dataService_1.getExchangeRateData)(city);
        res.json(exchangeRateData);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
exports.getExchangeRate = getExchangeRate;
