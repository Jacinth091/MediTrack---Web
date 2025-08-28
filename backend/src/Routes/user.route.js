import express from 'express';
import { getUserInfo } from '../Controllers/user.controller.js';
import auth from '../Middleware/auth.js';

const router = express.Router()


router.get('/info', auth, getUserInfo)

export default router;