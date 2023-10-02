import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(process.env.PORT, () => {
  console.log('App is running on port ' + process.env.PORT)
});
