import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import DepartmentRoute from '../src/Routes/department.route.js';
import AuthRoute from './Routes/auth.route.js';
import Patientroute from './Routes/patient.route.js';
import { connectDB } from './config/db.js';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
connectDB();

app.use(cookieParser());
app.use(cors({credentials: true}));
app.use(express.json());


// app.use('/api', RegisterRoute);
app.use('/api', DepartmentRoute)
app.use('/api/patient',Patientroute);
app.use('/api/auth', AuthRoute)
// app.use('/api', LoginRoute)

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
