import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from "fs";

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
  console.log('Loaded .env.local');
} else {
  dotenv.config();
  console.log('Loaded .env');
}

console.log('Database URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;