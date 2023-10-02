import '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/user-model';

describe('Get User Profile Endpoint', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  it('should retrieve a user profile with a valid user ID', async () => {
    const userData = {
      email: 'testuserprofile1@example.com',
      name: 'Test User',
      password: 'password123',
      contact: {
        whatsapp: '551188978564',
      },
    };
    const { body: user } = await request(app)
      .post('/register')
      .send(userData);

    const authData = {
      email: 'testuserprofile1@example.com',
      password: 'password123',
    };
    const authResponse = await request(app)
      .post('/login')
      .send(authData);
    expect(authResponse.status).toBe(200);

    const token = authResponse.body.token;
    const profileResponse = await request(app)
      .get('/profile/' + user.id)
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body).toHaveProperty('name', 'Test User');
  });

  it('should return a 404 error for a non-existing user ID', async () => {
    const userData = {
      email: 'testuserprofile@example.com',
      name: 'Test User',
      password: 'password123',
      contact: {
        whatsapp: '551188978564',
      },
    };
    await request(app)
      .post('/register')
      .send(userData);

    const authData = {
      email: 'testuserprofile@example.com',
      password: 'password123',
    };
    const authResponse = await request(app)
      .post('/login')
      .send(authData);
    const token = authResponse.body.token;

    const nonExistingUserId = '651b148d5f8fd9e516290b8c';
    const profileResponse = await request(app)
      .get('/profile/' + nonExistingUserId)
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.status).toBe(404);
  });

  it('should require authentication to retrieve a user profile', async () => {
    const userData = {
      email: 'testuserprofile2@example.com',
      name: 'Test User',
      password: 'password123',
      contact: {
        whatsapp: '551188978564',
      },
    };
    const { body: user } = await request(app)
      .post('/register')
      .send(userData);

    const profileResponse = await request(app).get('/profile/' + user.id);

    expect(profileResponse.status).toBe(401);
  });
});
