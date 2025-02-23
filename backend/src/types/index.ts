import { Request } from 'express';

export interface User {
    id: number;
    username: string;
    password: string;
}
  
export interface Task {
    id: number;
    title: string;
    description?: string;
    isComplete: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
  
export interface AuthenticatedRequest extends Request {
    user?: {
      id: number;
      username: string;
    };
}