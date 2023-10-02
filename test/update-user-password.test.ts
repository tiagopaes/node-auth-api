import '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/user-model';

describe('Update User Password Endpoint', () => {

  beforeAll(async () => {
    await User.deleteMany({});
  });

  it('should update the user password with valid data', async () => {
    const userData = {
      email: 'testuserupdate@example.com',
      name: 'Test User',
      password: 'password123',
      contact: {
        whatsapp: '551188978564',
      },
    };
    const authData = {
      email: 'testuserupdate@example.com',
      password: 'password123',
    };

    const { body: user } = await request(app)
      .post('/register')
      .send(userData);

    const { body: {token }} = await request(app)
      .post('/login')
      .send(authData);

    const newPasswordData = {
      currentPassword: 'password123',
      newPassword: 'newpassword456',
    };

    const response = await request(app)
      .patch(`/profile/password/${user.id}`)
      .send(newPasswordData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    const updatedAuthData = {
      email: 'testuserupdate@example.com',
      password: 'newpassword456',
    };

    const authResponse = await request(app)
      .post('/login')
      .send(updatedAuthData);

    expect(authResponse.status).toBe(200);
    expect(authResponse.body).toHaveProperty('token');
  });
});
