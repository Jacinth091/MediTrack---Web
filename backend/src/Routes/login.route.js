import express from 'express';
import { loginUser } from '../Controllers/login.controller.js';

const router = express.Router();

router.post('/login', await loginUser);


export default router;