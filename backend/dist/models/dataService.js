"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRateData = exports.getWeatherData = exports.getGdpData = exports.getPopulationData = void 0;
const axios_1 = __importDefault(require("axios"));
const apiHelpers_1 = require("../helpers/apiHelpers");
const getPopulationData = async (city) => {
    try {
        const countryCode = await (0, apiHelpers_1.getCountryCodeByCity)(city);
        const lastYear = await (0, apiHelpers_1.getLastYear)();
        const response = await axios_1.default.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json&date=${lastYear}`);
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to fetch population data");
    }
};
exports.getPopulationData = getPopulationData;
const getGdpData = async (city) => {
    try {
        const countryCode = await (0, apiHelpers_1.getCountryCodeByCity)(city);
        const lastYear = await (0, apiHelpers_1.getLastYear)();
        const response = await axios_1.default.get(`https://api.worldbank.org/v2/countries/${countryCode}/indicators/NY.GDP.MKTP.CD?format=json&date=${lastYear}`);
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to fetch GDP data");
    }
};
exports.getGdpData = getGdpData;
const getWeatherData = async (city) => {
    try {
        const response = await axios_1.default.get(`http://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&q=${city}`);
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to fetch weather data");
    }
};
exports.getWeatherData = getWeatherData;
const getExchangeRateData = async (city) => {
    try {
        const localCurrency = await (0, apiHelpers_1.getLocalCurrencyByCity)(city);
        const response = await axios_1.default.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_API_KEY}&base=${localCurrency}`);
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to fetch Exchange Rate data");
    }
};
exports.getExchangeRateData = getExchangeRateData;
