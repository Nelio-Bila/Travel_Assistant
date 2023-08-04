import request from 'supertest';
import express from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  login,
  loginValidation,
  getAuth,
  register,
} from '../../../controllers/authController'; // Adjust the path accordingly
import { PrismaClient, User } from '@prisma/client';
import HttpException from '../../../exceptions/HttpException';
import { GenerateTokenProvider } from '../../../provider/GenerateTokenProvider';
import { GenerateRefreshToken } from '../../../provider/GenerateRefreshToken';

jest.mock('@prisma/client');


const mockPrismaClient = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  refreshToken: {
    deleteMany: jest.fn(),
  },
};
(PrismaClient as jest.Mock).mockReturnValue(mockPrismaClient);


jest.mock('bcryptjs');
(bcrypt.compare as jest.Mock).mockResolvedValue(true);
(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');


jest.mock('jsonwebtoken');
(jwt.verify as jest.Mock).mockReturnValue({ id: 1 });

describe('Auth Controllers', () => {
  const app = express();
  app.use(express.json());

  app.post('/login', loginValidation, login);
  app.post('/getAuth', getAuth);
  app.post('/register', register);

  it('should login successfully', async () => {
    mockPrismaClient.user.findUnique.mockResolvedValueOnce({ id: 1, password: 'hashedPassword' });

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
    expect(response.body.user.id).toBe(1);
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should return 401 when login credentials are incorrect', async () => {
    mockPrismaClient.user.findUnique.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'wrongPassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('A user with this email could not be found');
  });

  it('should get authenticated user', async () => {
    const response = await request(app)
      .post('/getAuth')
      .send({ token: 'fakeToken' });

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({ id: 1 });
  });

  it('should register a new user', async () => {
    mockPrismaClient.user.create.mockResolvedValueOnce({ id: 1, email: 'test@example.com' });

    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should return 422 when validation fails during registration', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'invalid-email', password: 'short' });

    expect(response.status).toBe(422);
    expect(response.body.errors).toBeDefined();
  });
});
