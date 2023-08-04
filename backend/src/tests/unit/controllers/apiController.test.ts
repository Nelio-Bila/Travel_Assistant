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
		"AED": 4.018714,
		"AFN": 93.108369,
		"ALL": 104.624783,
		"AMD": 422.941698,
		"ANG": 1.968102,
		"AOA": 905.369839,
		"ARS": 304.246232,
		"AUD": 1.671,
		"AWG": 1.972144,
		"AZN": 1.852594,
		"BAM": 1.953222,
		"BBD": 2.20491,
		"BDT": 119.032871,
		"BGN": 1.955401,
		"BHD": 0.412519,
		"BIF": 3093.116951,
		"BMD": 1.094116,
		"BND": 1.465965,
		"BOB": 7.546039,
		"BRL": 5.381521,
		"BSD": 1.092068,
		"BTC": 0.000037538054,
		"BTN": 90.363616,
		"BWP": 14.647664,
		"BYN": 2.756361,
		"BYR": 21444.668102,
		"BZD": 2.201214,
		"CAD": 1.462827,
		"CDF": 2669.642823,
		"CHF": 0.960284,
		"CLF": 0.033758,
		"CLP": 931.475438,
		"CNY": 7.859802,
		"COP": 4504.813593,
		"CRC": 594.914687,
		"CUC": 1.094116,
		"CUP": 28.994067,
		"CVE": 110.121145,
		"CZK": 24.298724,
		"DJF": 194.435114,
		"DKK": 7.451563,
		"DOP": 61.678582,
		"DZD": 148.753789,
		"EGP": 33.869007,
		"ERN": 16.411736,
		"ETB": 59.940515,
		"EUR": 1,
		"FJD": 2.47768,
		"FKP": 0.861111,
		"GBP": 0.861715,
		"GEL": 2.850188,
		"GGP": 0.861111,
		"GHS": 12.20389,
		"GIP": 0.861111,
		"GMD": 66.077927,
		"GNF": 9391.82982,
		"GTQ": 8.585667,
		"GYD": 228.468412,
		"HKD": 8.544185,
		"HNL": 26.857547,
		"HRK": 7.35668,
		"HTG": 149.602518,
		"HUF": 392.043378,
		"IDR": 16621.42307,
		"ILS": 4.033753,
		"IMP": 0.861111,
		"INR": 90.651316,
		"IQD": 1430.511662,
		"IRR": 46294.77206,
		"ISK": 144.707741,
		"JEP": 0.861111,
		"JMD": 169.006904,
		"JOD": 0.774746,
		"JPY": 156.246292,
		"KES": 156.459021,
		"KGS": 96.03141,
		"KHR": 4515.03995,
		"KMF": 492.160567,
		"KPW": 984.690973,
		"KRW": 1434.946831,
		"KWD": 0.336551,
		"KYD": 0.909999,
		"KZT": 486.268105,
		"LAK": 21220.182381,
		"LBP": 16391.762158,
		"LKR": 349.458699,
		"LRD": 204.280658,
		"LSL": 20.452857,
		"LTL": 3.23064,
		"LVL": 0.661819,
		"LYD": 5.257215,
		"MAD": 10.811528,
		"MDL": 19.262573,
		"MGA": 4874.285234,
		"MKD": 61.538766,
		"MMK": 2293.193843,
		"MNT": 3787.065005,
		"MOP": 8.78031,
		"MRO": 390.599124,
		"MUR": 49.486708,
		"MVR": 16.794402,
		"MWK": 1147.185665,
		"MXN": 19.053533,
		"MYR": 4.983655,
		"MZN": 69.202665,
		"NAD": 20.460125,
		"NGN": 843.018679,
		"NIO": 39.968095,
		"NOK": 11.177667,
		"NPR": 144.582145,
		"NZD": 1.802249,
		"OMR": 0.421257,
		"PAB": 1.091959,
		"PEN": 3.983342,
		"PGK": 3.967726,
		"PHP": 60.949933,
		"PKR": 314.968554,
		"PLN": 4.446378,
		"PYG": 7947.581485,
		"QAR": 3.983655,
		"RON": 4.953174,
		"RSD": 117.279315,
		"RUB": 103.940814,
		"RWF": 1295.433012,
		"SAR": 4.104696,
		"SBD": 9.156421,
		"SCR": 14.509954,
		"SDG": 658.110673,
		"SEK": 11.711228,
		"SGD": 1.470092,
		"SHP": 1.331265,
		"SLE": 22.850068,
		"SLL": 21608.785534,
		"SOS": 623.076324,
		"SRD": 41.740723,
		"STD": 22645.986383,
		"SVC": 9.555386,
		"SYP": 14332.916201,
		"SZL": 20.311374,
		"THB": 38.081743,
		"TJS": 11.973894,
		"TMT": 3.829405,
		"TND": 3.37945,
		"TOP": 2.592562,
		"TRY": 29.528434,
		"TTD": 7.402229,
		"TWD": 34.709181,
		"TZS": 2740.760038,
		"UAH": 40.332459,
		"UGX": 3936.803248,
		"USD": 1.094116,
		"UYU": 40.965923,
		"UZS": 12762.860035,
		"VEF": 3243835.843111,
		"VES": 32.896334,
		"VND": 25968.836602,
		"VUV": 131.690807,
		"WST": 3.014032,
		"XAF": 655.09225,
		"XAG": 0.046629,
		"XAU": 0.000566,
		"XCD": 2.956902,
		"XDR": 0.813127,
		"XOF": 657.016278,
		"XPF": 119.42271,
		"YER": 273.911793,
		"ZAR": 20.473586,
		"ZMK": 9848.354599,
		"ZMW": 20.994478,
		"ZWL": 352.304815
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
              // ... other currency rate checks
            }),
          }),
        })
      );
    });
  });
  