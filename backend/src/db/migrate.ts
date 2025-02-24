import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
  console.log('Loaded .env.local');
} else {
  dotenv.config();
  console.log('Loaded .env');
}

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
  try {
    const migrationPath = path.join(process.cwd(), 'src', 'db', 'migrations', '001_init.sql');

    if (!fs.existsSync(migrationPath)) {
      console.error('Migration file not found:', migrationPath);
      return;
    }

    // Read and execute migration script
    const migration = fs.readFileSync(migrationPath, 'utf8');
    await pool.query(migration);

    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await pool.end();
  }
}

// Run migrations
runMigrations();
