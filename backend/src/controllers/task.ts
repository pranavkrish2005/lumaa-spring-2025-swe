import { Response } from 'express';
import { Pool } from 'pg';
import { AuthenticatedRequest, Task } from '../types';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT id, title, description, is_complete as "isComplete", 
       created_at as "createdAt", updated_at as "updatedAt"
       FROM tasks 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [req.user?.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description } = req.body;

  try {
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, user_id) 
       VALUES ($1, $2, $3) 
       RETURNING id, title, description, is_complete as "isComplete", 
       created_at as "createdAt", updated_at as "updatedAt"`,
      [title, description, req.user?.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;

  try {
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const taskExists = await pool.query(
      'SELECT id FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user?.id]
    );

    if (taskExists.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, is_complete = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 AND user_id = $5 
       RETURNING id, title, description, is_complete as "isComplete", 
       created_at as "createdAt", updated_at as "updatedAt"`,
      [title, description, isComplete, id, req.user?.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    // Check if task exists and belongs to user
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user?.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
};
