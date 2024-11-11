import { Service } from 'typedi';
import { Expense } from '../entities/Expense';
import { DbDataSource } from '../config/data-source';
import { BaseRepository } from './BaseRepository';

/**
 * Repository for accessing expense data.
 */
@Service()
export class ExpenseRepository extends BaseRepository<Expense> {
  constructor() {
    super(Expense, DbDataSource);
  }

}