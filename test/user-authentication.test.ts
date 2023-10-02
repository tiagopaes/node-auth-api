import '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/user-model';

describe('User Authentication Endpoint', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });
  it('should authenticate a user with valid credentials', async () => {
    const userData = {
      email: 'testuserauth@example.com',
      name: 'Test User',
      password: 'password123',
      contact: {
        whatsapp: '551188978564',
      },
    };

    const registerResponse = await request(app)
      .post('/register')
      .send(userData);

    expect(registerResponse.status).toBe(201);

    const authData = {
      email: 'testuserauth@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/login')
      .send(authData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('payload');
    expect(response.body).toHaveProperty('expiresIn');
  });

  it('should reject authentication with incorrect password', async () => {
    const userData = {
      email: 'testuserauth1@example.com',
      name: 'Test User',
      password: 'password123',
      contact: {
        whatsapp: '551188978564',
      },
    };
    const registerResponse = await request(app)
      .post('/register')
      .send(userData);

    expect(registerResponse.status).toBe(201);

    const authData = {
      email: 'testuserauth1@example.com',
      password: 'incorrectpassword',
    };

    const response = await request(app)
      .post('/login')
      .send(authData);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('should reject authentication for non-existing user', async () => {
    const authData = {
      email: 'nonexistinguser@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/login')
      .send(authData);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });
});
