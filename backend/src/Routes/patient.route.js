import express from 'express';
import { getAllPatients } from '../Controllers/patient.controller.js';
const router = express.Router();

router.get('/patient', await getAllPatients);

// router.get('/patient/:id', 

export default router;