import axios from "axios";
import { getCountryCodeByCity, getLastYear, getLocalCurrencyByCity } from '../helpers/apiHelpers';

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
      `http://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}&q=${city}&units=metric&cnt=1`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export const getExchangeRateData = async (city: string) => {
  try {
    const localCurrency = await getLocalCurrencyByCity(city);
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_API_KEY}`
      // `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_API_KEY}&base=${localCurrency}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Exchange Rate data");
  }
};
