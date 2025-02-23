import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { router } from './routes/api';

// Constants
const app = express();

// Common Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Add API routes
app.use('/api', router);

// Error handling
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: err.message,
  });
  return;
});

export default app;
