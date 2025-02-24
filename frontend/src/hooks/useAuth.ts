import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password);
      localStorage.setItem('token', response.token);
      navigate('/tasks');
    } catch (err) {
      setError('Invalid credentials');
    }
  }, [navigate]);

  const register = useCallback(async (username: string, password: string) => {
    try {
      const response = await authService.register(username, password);
      localStorage.setItem('token', response.token);
      navigate('/tasks');
    } catch (err) {
      setError('Registration failed');
    }
  }, [navigate]);

  const logout = useCallback(() => {
    authService.logout();
    navigate('/login');
  }, [navigate]);

  return { login, register, logout, error };
};
