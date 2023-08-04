import { AxiosResponse } from "axios";
import { api } from "../config/api";

export const getPopulation = async (city: string) => {
    try {
      const { data }: AxiosResponse = await api.get(`/api/population/${city}`);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getGdpPerCapita = async (city: string) => {
    try {
      const { data }: AxiosResponse = await api.get(`/api/gdp/${city}`);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getWeather = async (city: string) => {
    try {
      const { data }: AxiosResponse = await api.get(`/api/weather/${city}`);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getExchangeRate = async (city: string) => {
    try {
      const { data }: AxiosResponse = await api.get(`/api/exchangerate/${city}`);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };