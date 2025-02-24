import { useState, useEffect } from 'react';
import { Task } from '../types';
import { taskService } from '../services/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const updateTask = async (id: number, task: Partial<Task>) => {
    try {
      const updatedTask = await taskService.updateTask(id, task);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return { tasks, loading, error, createTask, updateTask, deleteTask };
};
