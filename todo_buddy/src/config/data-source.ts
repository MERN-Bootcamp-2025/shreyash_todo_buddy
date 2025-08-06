import { DataSource } from 'typeorm';
import { User } from '../models/user';
import { Todo } from '../models/todo';
require('dotenv').config();

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Mindbowser@123',
    database: process.env.DB_NAME || 'todo_buddy',
    synchronize: true,
    entities: [User, Todo],
    subscribers: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await PostgresDataSource.initialize();
    console.log('Database connection initialized successfully');
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
}; 