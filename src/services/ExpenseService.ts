import { Service } from 'typedi';
import { ExpenseRepository } from '../repositories/ExpenseRepository';
import { Expense } from '../entities/Expense';

/**
 * Service for managing expense-related business logic.
 */
@Service()
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  /**
   * Creates a new expense entry in the database.
   * 
   * @param data - The data for the expense to be created.
   * @returns A promise that resolves to the created expense.
   */
  async createExpense(data: Partial<Expense>): Promise<Expense> {
    try {
      const expense = this.expenseRepository.create(data);
      return await this.expenseRepository.save(expense);
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(`Failed to create expenses: ${error.message}`);
        } else {
            throw new Error(`Failed to create expenses: ${error}`);
        }
    }
  }

  /**
   * Retrieves all expenses from the database.
   * 
   * @returns A promise that resolves to an array of expenses.
   */
  async getAllExpenses(): Promise<Expense[]> {
    try {
      return await this.expenseRepository.find({relations: ['category']});
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(`Failed to retrieve expenses: ${error.message}`);
        } else {
            throw new Error(`Failed to retrieve expenses: ${error}`);
        }
    }
  }

    /**
   * Updates an existing expense.
   * 
   * @param id - ID of the expense to update
   * @param data - Updated data for the expense
   * @returns A promise that resolves to the updated expense
   */
    async updateExpense(id: number, data: Partial<Expense>): Promise<Expense> {
        try {
          await this.expenseRepository.update(id, data);
          const updatedExpense = await this.expenseRepository.findOne({  id },{ relations: ['category']  });
          if (!updatedExpense) {
            throw new Error('Expense not found');
          }
          return updatedExpense;
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(`Failed to update expenses: ${error.message}`);
            } else {
                throw new Error(`Failed to update expenses: ${error}`);
            }
        }
      }
    
      /**
       * Deletes an expense.
       * 
       * @param id - ID of the expense to delete
       * @returns A promise that resolves when the expense is deleted
       */
      async deleteExpense(id: number): Promise<void> {
        try {
          const expense = await this.expenseRepository.findOne({ id });
          if (!expense) {
            throw new Error('Expense not found');
          }
          await this.expenseRepository.delete(id);
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(`Failed to delete expenses: ${error.message}`);
            } else {
                throw new Error(`Failed to delete expenses: ${error}`);
            }
        }
      }

}