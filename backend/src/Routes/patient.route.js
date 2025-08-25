import express from 'express';
import {
  createPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatientById
} from '../Controllers/patient.controller.js';
const router = express.Router();

router.get('/patient', await getAllPatients);

router.get('/patient/:id', await getPatientById);

router.post('/add-patient', await createPatient);

router.put('/update-patient/:id', await updatePatientById);

router.delete('/delete-patient/:id', await deletePatientById)


export default router;