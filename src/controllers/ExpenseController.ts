import { Request, Response } from "express";
import { Service } from "typedi";
import { ExpenseService } from "../services/ExpenseService";

/**
 * Controller for managing expenses.
 */
@Service()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  /**
   * Creates a new expense.
   *
   * @param req - Express request object containing expense data
   * @param res - Express response object
   */
  async createExpense(req: Request, res: Response): Promise<void> {
    try {
      const expense = await this.expenseService.createExpense(req.body);
      res.status(201).json(expense);
    } catch (error) {
      throw new Error(`Error creating expense: ${error}`);
    }
  }

  /**
   * Retrieves all expenses.
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  async getAllExpenses(req: Request, res: Response): Promise<void> {
    try {
      const expenses = await this.expenseService.getAllExpenses();
      res.status(200).json(expenses);
    } catch (error) {
      throw new Error(`Error retrieving expenses: ${error}`);
    }
  }

  /**
   * Updates an existing expense.
   *
   * @param req - Express request object with expense ID in params and update data in body
   * @param res - Express response object
   */
  async updateExpense(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedExpense = await this.expenseService.updateExpense(
        Number(id),
        req.body
      );
      res.status(200).json(updatedExpense);
    } catch (error) {
        throw error;
    }
  }

  /**
   * Deletes an expense.
   *
   * @param req - Express request object with expense ID in params
   * @param res - Express response object
   */
  async deleteExpense(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.expenseService.deleteExpense(Number(id));
      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        throw error;
    }
  }
}
