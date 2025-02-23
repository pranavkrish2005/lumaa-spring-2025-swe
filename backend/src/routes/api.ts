import { Router } from 'express';
import authRouter from './auth';
import taskRouter from './tasks';

export const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', taskRouter);
