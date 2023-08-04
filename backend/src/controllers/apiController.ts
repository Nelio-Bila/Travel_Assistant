import { Request, Response } from 'express';
import { getPopulationData,getWeatherData,getGdpData, getExchangeRateData } from '../services/dataService';



export const getPopulation = async (req: Request, res: Response) => {
  const city = req.params.city;
  
  try {
    const populationData = await getPopulationData(city);
    res.json(populationData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getGdp = async (req: Request, res: Response) => {
  const city = req.params.city;
  try {
    const gdpData = await getGdpData(city);
    res.json(gdpData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getWeather = async (req: Request, res: Response) => {
  const city = req.params.city;
  try {
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getExchangeRate = async (req: Request, res: Response) => {
  const city = req.params.city;
  try {
    const exchangeRateData = await getExchangeRateData(city);
    res.json(exchangeRateData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

