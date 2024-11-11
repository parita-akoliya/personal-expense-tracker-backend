import { Service } from 'typedi';
import { Category } from '../entities/Category';
import { AppDataSource } from '../config/database';
import { BaseRepository } from './BaseRepository';

/**
 * Repository for accessing category data.
 */
@Service()
export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(Category, AppDataSource);
  }
}