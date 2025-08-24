import express from 'express';
import { getAllDepartment } from '../Controllers/department.controller.js';

const router = express.Router();

router.get('/departments', getAllDepartment)

export default router;