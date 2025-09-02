import express from 'express';
import {
  addPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatientById
} from '../Controllers/patient.controller.js';
import { auth, requiredRole } from '../Middleware/auth.js';
const router = express.Router();

router.use(auth)

router.get('/patients', requiredRole(['doctor', 'nurse', 'receptionist']), await getAllPatients);

router.get('/patient/:id',requiredRole(['doctor', 'nurse', 'receptionist']), await getPatientById);

router.post('/add-patient',requiredRole(['receptionist', 'nurse']), await addPatient);

router.put('/update-patient/:id',requiredRole(['receptionist', 'nurse']), await updatePatientById);

router.delete('/delete-patient/:id',requiredRole(['nurse', 'admin']), await deletePatientById)

export default router;