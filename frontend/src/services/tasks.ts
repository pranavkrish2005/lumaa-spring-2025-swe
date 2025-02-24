import api from '../utils/axios';
import { Task } from '../types';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get('/tasks');
    return data;
  },

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const { data } = await api.post('/tasks', task);
    return data;
  },

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    const { data } = await api.put(`/tasks/${id}`, task);
    return data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
};
