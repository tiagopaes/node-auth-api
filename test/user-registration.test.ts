import '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/user-model';

describe('User Registration Endpoint', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });
  it('should register a new user', async () => {
    const userData = {
      email: 'testuser@example.com',
      name: 'Test User',
      password: 'password123',
      contact: {
        whatsapp: '551188978564'
      }
    };

    const response = await request(app)
      .post('/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    const savedUser = await User.findOne({ email: userData.email });
    expect(savedUser).not.toBeNull();
  });

  it('should handle validation errors', async () => {
    const emptyUserData = {};

    const response = await request(app)
      .post('/register')
      .send(emptyUserData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation Error');
  });

  it('should handle duplicate email errors', async () => {
    const existingUser = new User({
      email: 'existinguser@example.com',
      name: 'Existing User',
      password: 'existingpassword',
      contact: {
        whatsapp: '551188978564'
      }
    });
    await existingUser.save();

    const duplicateUserData = {
      email: 'existinguser@example.com', // Duplicate email
      name: 'Duplicate User',
      password: 'duplicatepassword',
      contact: {
        whatsapp: '551188978564'
      }
    };

    const response = await request(app)
      .post('/register')
      .send(duplicateUserData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation Error');
  });
});
