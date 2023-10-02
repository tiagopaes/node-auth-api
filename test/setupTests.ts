import '@jest/globals';
import { connect, disconnect } from 'mongoose';

require('dotenv').config({ path: '.env.testing' });

const mongoURI = process.env.MONGODB_URI as string;

beforeAll(async () => {
  await connect(mongoURI);
});

afterAll(async () => {
  await disconnect();
});
