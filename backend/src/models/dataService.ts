import axios from "axios";
import { getCountryCodeByCity, getLastYear } from '../helpers/apiHelpers';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;

export const getPopulationData = async (city: string) => {
  try {
    const countryCode = await getCountryCodeByCity(city);
    const lastYear = await getLastYear();
    const response = await axios.get(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json&date=${lastYear}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch population data");
  }
};

export const getGdpData = async (city: string) => {
  try {
    const countryCode = await getCountryCodeByCity(city);
    const lastYear = await getLastYear();
    const response = await axios.get(
      `https://api.worldbank.org/v2/countries/${countryCode}/indicators/NY.GDP.MKTP.CD?format=json&date=${lastYear}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch GDP data");
  }
};

export const getWeatherData = async (city: string) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?appid=${WEATHER_API_KEY}&q=${city}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export const getExchangeRateData = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.exchangeratesapi.io/v1/latest?access_key=${EXCHANGE_API_KEY}&base=USD`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Exchange Rate data");
  }
};
