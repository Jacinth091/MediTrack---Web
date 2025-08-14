import dotenv from 'dotenv';
import express from 'express';
import Patientroute from './Routes/patient.route.js';
import RegisterRoute from './Routes/register.route.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use('/api', RegisterRoute);
app.use('/api',Patientroute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
