import 'reflect-metadata';
import { DbDataSource } from './data-source';
import logger from './logger';

export const AppDataSource = DbDataSource;

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.debug('Database connected successfully');
  } catch (error) {
    logger.error('Error connecting to database:', error);
  }
};