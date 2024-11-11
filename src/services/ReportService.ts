import { Service } from 'typedi';
import { ExpenseRepository } from '../repositories/ExpenseRepository';
import logger from '../config/logger';
import { MoreThanOrEqual, LessThan, Between } from 'typeorm';

/**
 * Service for generating various expense reports.
 */
@Service()
export class ReportService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async generateMonthlyExpenses() {
    try {
      // Calculate monthly expenses for the current month
      const today = new Date();
      today.setMonth(today.getMonth() - 1, 1);

      const expenses = await this.expenseRepository.find({
        where: {
          date: Between(today, new Date(today.getFullYear(), today.getMonth() + 1, 0)),
        },
        relations: ['category'],
      });
      return expenses.reduce((total, expense) => Number(total) + Number(expense.amount), 0);
    } catch (error) {
      logger.error('Error generating monthly report:', error instanceof Error? error.message : 'Unknown error');
      throw new Error(`Failed to generate monthly report: ${error}`);
    }
  }

  async generateDailyExpenses() {
    try {
      // Calculate daily expenses for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expenses  = await this.expenseRepository.find({
        where: {
          date: today,
        },
        relations: ['category'],
      });
      return expenses.reduce((total, expense) => Number(total) + Number(expense.amount), 0);
    } catch (error) {
      logger.error('Error generating daily report:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error(`Failed to generate daily report: ${error}`);
    }
  }


  async generateTotalExpenses() {
    try {
      // Calculate total expenses for the current month
      const today = new Date();

      const expenses = await this.expenseRepository.find({
        where: {
          date: LessThan(today),
        },
        relations: ['category'],
      });
      return expenses.reduce((total, expense) => Number(total) + Number(expense.amount), 0);
    } catch (error) {
      logger.error('Error generating total expenses:', error instanceof Error? error.message : 'Unknown error');
      throw new Error(`Failed to generate total expenses: ${error}`);
    }
  }

  async generateDailyReport() {
    try {
      // Calculate daily expenses for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return await this.expenseRepository.find({
        where: {
          date: today,
        },
        relations: ['category'],
      });
    } catch (error) {
      logger.error('Error generating daily report:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error(`Failed to generate daily report: ${error}`);
    }
  }

  async generateWeeklyReport() {
    try {
      // Calculate expenses for the current week
      const today = new Date();
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

      return await this.expenseRepository.find({
        where: {
          date: MoreThanOrEqual(firstDayOfWeek),
        },
        relations: ['category'],
      });
    } catch (error) {
      logger.error('Error generating weekly report:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error(`Failed to generate weekly report: ${error}`);
    }
  }

  async generateMonthlyReport() {
    try {
      // Calculate expenses for the current month
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      return await this.expenseRepository.find({
        where: {
          date: MoreThanOrEqual(firstDayOfMonth),
        },
        relations: ['category'],
      });
    } catch (error) {
      logger.error('Error generating monthly report:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error(`Failed to generate monthly report: ${error}`);
    }
  }

  async generateYearlyReport() {
    try {
      // Calculate expenses for the current year
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

      return await this.expenseRepository.find({
        where: {
          date: MoreThanOrEqual(firstDayOfYear),
        },
        relations: ['category'],
      });
    } catch (error) {
      logger.error('Error generating yearly report:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error(`Failed to generate yearly report: ${error}`);
    }
  }

  async generateDashboardComparison() {
    try {
      // Compare current month vs previous month
      const today = new Date();
      const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

      const currentMonthExpenses = await this.expenseRepository.find({
        where: {
          date: MoreThanOrEqual(firstDayOfCurrentMonth),
        },
      });

      const previousMonthExpenses = await this.expenseRepository.find({
        where: {
            date: Between(firstDayOfPreviousMonth, firstDayOfCurrentMonth)
        },
      });

      const currentTotal = currentMonthExpenses.reduce((sum, expense) => Number(sum) + Number(expense.amount), 0);
      const previousTotal = previousMonthExpenses.reduce((sum, expense) => Number(sum) + Number(expense.amount), 0);

      return {
        current: currentTotal,
        previous: previousTotal,
      };
    } catch (error) {
      logger.error('Error generating dashboard comparison:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error(`Failed to generate dashboard comparison: ${error}`);
    }
  }

  async generateExpensesByCategory() {
    try {
      // Group expenses by category
      const expenses = await this.expenseRepository.find({
        relations: ['category'],
      });

      const groupedByCategory = expenses.reduce((acc, expense) => {
        const categoryName = expense.category ? expense.category.name : 'Uncategorized';
        acc[categoryName] = (acc[categoryName] || 0) + Number(expense.amount);
        return acc;
      }, {} as Record<string, number>);

      return groupedByCategory;
    } catch (error) {
      logger.error('Error generating expenses by category:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error(`Failed to generate expenses by category: ${error}`);
    }
  }

  async generateSpendingPatterns() {
    try {
      // Analyze monthly spending patterns
      const expenses = await this.expenseRepository.find({
        relations: ['category'],
      });

      const patterns = expenses.reduce((acc, expense) => {
        if (expense.date instanceof Date) {
          const month = expense.date.getMonth();
          acc[month] = (acc[month] || 0) + Number(expense.amount);
        }
        return acc;
      }, {} as Record<number, number>);

      return patterns;
    } catch (error) {
      logger.error('Error generating spending patterns:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error(`Failed to generate spending patterns: ${error}`);
    }
  }
}