import pool from "./db";

export interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  userId: number;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  isComplete?: boolean;
}

export class TaskModel {
  static async findAll(userId: number): Promise<Task[]> {
    const result = await pool.query(
      `SELECT 
        id,
        title,
        description,
        is_complete as "isComplete",
        user_id as "userId",
        created_at as "createdAt",
        updated_at as "updatedAt"
       FROM tasks 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    return result.rows;
  }

  static async findById(id: number, userId: number): Promise<Task | null> {
    const result = await pool.query(
      `SELECT 
        id,
        title,
        description,
        is_complete as "isComplete",
        user_id as "userId",
        created_at as "createdAt",
        updated_at as "updatedAt"
       FROM tasks 
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    return result.rows[0] || null;
  }

  static async create(taskData: CreateTaskDTO): Promise<Task> {
    const { title, description, userId } = taskData;

    const result = await pool.query(
      `INSERT INTO tasks (title, description, user_id) 
       VALUES ($1, $2, $3) 
       RETURNING 
        id,
        title,
        description,
        is_complete as "isComplete",
        user_id as "userId",
        created_at as "createdAt",
        updated_at as "updatedAt"`,
      [title, description, userId]
    );

    return result.rows[0];
  }

  static async update(id: number, userId: number, updateData: UpdateTaskDTO): Promise<Task | null> {
    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updateData.title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(updateData.title);
      paramCount++;
    }

    if (updateData.description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(updateData.description);
      paramCount++;
    }

    if (updateData.isComplete !== undefined) {
      updates.push(`is_complete = $${paramCount}`);
      values.push(updateData.isComplete);
      paramCount++;
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    // Add id and userId to values array
    values.push(id);
    values.push(userId);

    const result = await pool.query(
      `UPDATE tasks 
       SET ${updates.join(', ')}
       WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
       RETURNING 
        id,
        title,
        description,
        is_complete as "isComplete",
        user_id as "userId",
        created_at as "createdAt",
        updated_at as "updatedAt"`,
      values
    );

    return result.rows[0] || null;
  }

  static async delete(id: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    return (result.rowCount ?? 0) > 0;
  }

  static async exists(id: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      'SELECT id FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    return (result.rowCount ?? 0) > 0;
  }
}
