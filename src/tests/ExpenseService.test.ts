import { ExpenseRepository } from '../repositories/ExpenseRepository';
import { Expense } from '../entities/Expense';
import { ExpenseService } from '../services/ExpenseService';

jest.mock('../repositories/ExpenseRepository');

describe('ExpenseService', () => {
  let expenseService: ExpenseService;
  let expenseRepository: jest.Mocked<ExpenseRepository>;

  beforeEach(() => {
    expenseRepository = new ExpenseRepository() as jest.Mocked<ExpenseRepository>;
    expenseService = new ExpenseService(expenseRepository);
  });

  describe('createExpense', () => {
    it('should create a new expense', async () => {
      const expenseData = { id: 1, amount: 100, description: 'Groceries', userId: 1, categoryId: null, date: new Date() };
      const savedExpense = expenseData as unknown as Expense;

      expenseRepository.create.mockReturnValue(savedExpense);
      expenseRepository.save.mockResolvedValue(savedExpense);

      const result = await expenseService.createExpense(expenseData);

      expect(expenseRepository.create).toHaveBeenCalledWith(expenseData);
      expect(expenseRepository.save).toHaveBeenCalledWith(savedExpense);
      expect(result).toEqual(savedExpense);
    });

    it('should throw an error if expense creation fails', async () => {
      const expenseData = { amount: 100, description: 'Groceries', userId: 1 };

      expenseRepository.create.mockReturnValue(expenseData as unknown as Expense);
      expenseRepository.save.mockRejectedValue(new Error('Failed to save'));

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow('Failed to create expenses: Failed to save');
    });
  });

  describe('getAllExpenses', () => {
    it('should return all expenses', async () => {
      const expenses: Expense[] = [
        { id: 1, amount: 100, description: 'Groceries' } as Expense,
        { id: 2, amount: 50, description: 'Transport' } as Expense,
      ];

      expenseRepository.find.mockResolvedValue(expenses);

      const result = await expenseService.getAllExpenses();

      expect(expenseRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expenses);
    });

    it('should throw an error if fetching expenses fails', async () => {
      expenseRepository.find.mockRejectedValue(new Error('Failed to fetch'));

      await expect(expenseService.getAllExpenses()).rejects.toThrow('Failed to retrieve expenses: Failed to fetch');
    });
  });
});