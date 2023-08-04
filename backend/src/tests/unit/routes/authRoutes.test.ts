import request from 'supertest';
import express from 'express';
import authRoutes from '../../../routes/authRoutes';
import * as authController from '../../../controllers/authController';
import { RefreshTokenUserController } from '../../../RefreshTokenUser/RefreshTokenUserController';

jest.mock('../../../controllers/authController');
jest.mock('../../../RefreshTokenUser/RefreshTokenUserController');

const app = express();
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  it('should call login controller when POST /auth/login is accessed', async () => {
    await request(app).post('/auth/login').send({ email: 'test@example.com', password: 'testpassword' });
    expect(authController.login).toHaveBeenCalled();
  });

  it('should call register controller when POST /auth/register is accessed', async () => {
    await request(app).post('/auth/register').send({ email: 'test@example.com', password: 'testpassword' });
    expect(authController.register).toHaveBeenCalled();
  });

  it('should call getAuth controller when POST /auth/user is accessed', async () => {
    await request(app).post('/auth/user').send({ token: 'testtoken' });
    expect(authController.getAuth).toHaveBeenCalled();
  });

  it('should call RefreshTokenUserController.handle when POST /auth/refresh_token is accessed', async () => {
    await request(app).post('/auth/refresh_token');
    expect(RefreshTokenUserController.prototype.handle).toHaveBeenCalled();
  });
});
