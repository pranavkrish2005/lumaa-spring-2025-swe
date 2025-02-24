import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import pool from './db';

export interface User {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

export interface CreateUserDTO {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  createdAt: Date;
}

export class UserModel {
  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async create(userData: CreateUserDTO): Promise<UserResponse> {
    const { username, password } = userData;
    const hashedPassword = await this.hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (username, password) 
       VALUES ($1, $2) 
       RETURNING id, username, created_at as "createdAt"`,
      [username, hashedPassword]
    );

    return result.rows[0];
  }

  static async findByUsername(username: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT id, username, password, created_at as "createdAt"
       FROM users 
       WHERE username = $1`,
      [username]
    );

    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<UserResponse | null> {
    const result = await pool.query(
      `SELECT id, username, created_at as "createdAt"
       FROM users 
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] || null;
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}