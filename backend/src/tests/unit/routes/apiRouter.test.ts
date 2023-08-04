import request from 'supertest';
import express from 'express';
import apiRouter from '../../../routes/apiRouter'; // Adjust the path accordingly
import * as apiController from '../../../controllers/apiController'; // Adjust the path accordingly

jest.mock('../../../controllers/apiController');

const app = express();
app.use('/api', apiRouter);

describe('API Routes', () => {
  it('should call getPopulation controller when /api/population/:city is accessed', async () => {
    await request(app).get('/api/population/test-city');
    expect(apiController.getPopulation).toHaveBeenCalled();
  });

  it('should call getGdp controller when /api/gdp/:city is accessed', async () => {
    await request(app).get('/api/gdp/test-city');
    expect(apiController.getGdp).toHaveBeenCalled();
  });

  it('should call getWeather controller when /api/weather/:city is accessed', async () => {
    await request(app).get('/api/weather/test-city');
    expect(apiController.getWeather).toHaveBeenCalled();
  });

  it('should call getExchangeRate controller when /api/exchangerate/:city is accessed', async () => {
    await request(app).get('/api/exchangerate/test-city');
    expect(apiController.getExchangeRate).toHaveBeenCalled();
  });
});
