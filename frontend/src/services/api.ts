import api from '../utils/axios';
import { Task, AuthResponse } from '../types';
import axios, { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
  throw error;
};
