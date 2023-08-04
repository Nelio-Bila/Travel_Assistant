import request from 'supertest';
import express from 'express';
import { Request, Response } from 'express';
import {
  getPopulation,
  getGdp,
  getWeather,
  getExchangeRate,
} from '../../../controllers/apiController'; 
import {
  getPopulationData,
  getWeatherData,
  getGdpData,
  getExchangeRateData,
} from '../../../services/dataService'; 


jest.mock('../../../models/dataService');

const app = express();


(getPopulationData as jest.Mock).mockResolvedValue({ population: [
	{
		"page": 1,
		"pages": 1,
		"per_page": 50,
		"total": 1,
		"sourceid": "2",
		"lastupdated": "2023-07-25"
	},
	[
		{
			"indicator": {
				"id": "SP.POP.TOTL",
				"value": "Population, total"
			},
			"country": {
				"id": "MZ",
				"value": "Mozambique"
			},
			"countryiso3code": "MOZ",
			"date": "2022",
			"value": 32969518,
			"unit": "",
			"obs_status": "",
			"decimal": 0
		}
	]
] });
(getGdpData as jest.Mock).mockResolvedValue({ gdp: [
	{
		"page": 1,
		"pages": 1,
		"per_page": 50,
		"total": 1,
		"sourceid": "2",
		"lastupdated": "2023-07-25"
	},
	[
		{
			"indicator": {
				"id": "NY.GDP.MKTP.CD",
				"value": "GDP (current US$)"
			},
			"country": {
				"id": "MZ",
				"value": "Mozambique"
			},
			"countryiso3code": "MOZ",
			"date": "2022",
			"value": 17851491427.6765,
			"unit": "",
			"obs_status": "",
			"decimal": 0
		}
	]
] });
(getWeatherData as jest.Mock).mockResolvedValue({ weather: {
	"coord": {
		"lon": 32.5892,
		"lat": -25.9653
	},
	"weather": [
		{
			"id": 801,
			"main": "Clouds",
			"description": "few clouds",
			"icon": "02d"
		}
	],
	"base": "stations",
	"main": {
		"temp": 22.82,
		"feels_like": 22.44,
		"temp_min": 22.59,
		"temp_max": 22.82,
		"pressure": 1029,
		"humidity": 49
	},
	"visibility": 10000,
	"wind": {
		"speed": 3.6,
		"deg": 80
	},
	"clouds": {
		"all": 20
	},
	"dt": 1691146491,
	"sys": {
		"type": 1,
		"id": 2202,
		"country": "MZ",
		"sunrise": 1691123210,
		"sunset": 1691162680
	},
	"timezone": 7200,
	"id": 1040652,
	"name": "Maputo",
	"cod": 200
} });
(getExchangeRateData as jest.Mock).mockResolvedValue({ exchangeRate: {
	"success": true,
	"timestamp": 1691146503,
	"base": "EUR",
	"date": "2023-08-04",
	"rates": {
		"USD": 1.094116,
              "EUR": 1,
	}
} });


const req = {} as Request;
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
} as unknown as Response;
describe('API Controllers', () => {
    it('should get population data', async () => {
      req.params = { city: 'maputo' };
      await getPopulation(req, res);
  
      expect(getPopulationData).toHaveBeenCalledWith('maputo');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          population: expect.arrayContaining([
            expect.objectContaining({
              country: {
                value: 'Mozambique',
              },
              value: 32969518,
            }),
          ]),
        })
      );
    });
  
    it('should get GDP data', async () => {
      req.params = { city: 'maputo' };
      await getGdp(req, res);
  
      expect(getGdpData).toHaveBeenCalledWith('maputo');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          gdp: expect.arrayContaining([
            expect.objectContaining({
              country: {
                value: 'Mozambique',
              },
              value: 17851491427.6765,
            }),
          ]),
        })
      );
    });
  
    it('should get weather data', async () => {
      req.params = { city: 'maputo' };
      await getWeather(req, res);
  
      expect(getWeatherData).toHaveBeenCalledWith('maputo');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          weather: expect.objectContaining({
            main: 'Clouds',
            description: 'few clouds',
          }),
        })
      );
    });
  
    it('should get exchange rate data', async () => {
      req.params = { city: 'maputo' };
      await getExchangeRate(req, res);
  
      expect(getExchangeRateData).toHaveBeenCalledWith('maputo');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          exchangeRate: expect.objectContaining({
            rates: expect.objectContaining({
              USD: 1.094116,
              EUR: 1,
            }),
          }),
        })
      );
    });
  });
  