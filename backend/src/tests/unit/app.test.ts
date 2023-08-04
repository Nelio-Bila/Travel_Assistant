import request from 'supertest';
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from '../../routes/apiRouter'; 
import { errorHandler } from '../../middlewares/errorHandler'; 
import authRoutes from '../../routes/authRoutes'; 

describe('Travel Assistance App', () => {
  let app: Application;


  beforeAll(() => {
    app = express();
    app.use(morgan('combined'));
    app.use(cors());
    app.use(express.json());

    app.use('/api', apiRouter);
    app.use('/auth', authRoutes);
    app.use(errorHandler);
  });

  // it('responds with "Server is running" message on root path', async () => {
  //   const response = await request(app).get('/');
  //   expect(response.status).toBe(200);
  //   expect(response.text).toContain('Server is running');
  // });

  it('responds with 404 on unknown routes', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
  });

});
