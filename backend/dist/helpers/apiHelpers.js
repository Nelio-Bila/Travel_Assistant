"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastYear = exports.getCountryCodeByCity = void 0;
const axios_1 = __importDefault(require("axios"));
const getCountryCodeByCity = async (city) => {
    try {
        const username = process.env.USERNAME;
        const response = await axios_1.default.get(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`);
        return response.data.geonames[0].countryCode;
    }
    catch (error) {
        throw new Error("Failed to fetch Country Code");
    }
};
exports.getCountryCodeByCity = getCountryCodeByCity;
const getLastYear = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear - 1;
};
exports.getLastYear = getLastYear;
