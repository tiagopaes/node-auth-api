import express, { json } from 'express';
import { connectDB } from './db'
import userRoutes from './routes/user-routes';

const app = express();
app.use(json());

connectDB();

app.use('/', userRoutes);


export default app;

