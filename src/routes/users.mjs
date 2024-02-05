import express from 'express';

import {userControl} from '../controllers/index.mjs'

const router = express.Router();

// routes
router.post('/signup', userControl.signup);
router.post('/login', userControl.login);

export default router;