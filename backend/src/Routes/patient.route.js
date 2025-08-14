import express from 'express';
import { getAllPatients } from '../Controllers/patient.controller.js';
const router = express.Router();

router.get('/patient', await getAllPatients);

export default router;