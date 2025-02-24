import api from '../utils/axios';
import { AuthResponse } from '../types';

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', { username, password });
    return data;
  },

  async register(username: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', { username, password });
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};
