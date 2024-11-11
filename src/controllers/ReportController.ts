import { Request, Response } from 'express';
import { Service } from 'typedi';
import { ReportService } from '../services/ReportService';

/**
 * Controller for handling report-related operations.
 */
@Service()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  async getTotalExpenses(req: Request, res: Response): Promise<void> {
    try {
        const totalExpenses = await this.reportService.generateTotalExpenses();
        const dailyExpenses = await this.reportService.generateDailyExpenses();
        const monthlyExpenses = await this.reportService.generateMonthlyExpenses();
        let reports:{
            totalExpenses: number,
            dailyExpenses: number,
            monthlyExpenses: number
        } = {
            totalExpenses: totalExpenses,
            dailyExpenses: dailyExpenses,
            monthlyExpenses: monthlyExpenses
        }
      res.status(200).json(reports);
    } catch (error) {
        throw new Error(`Failed to generate total expenses report: ${error}`);
    }
  }

  async getDailyReport(req: Request, res: Response): Promise<void> {
    try {
      const report = await this.reportService.generateDailyReport();
      res.status(200).json(report);
    } catch (error) {
        throw new Error(`Failed to generate daily report: ${error}`);
    }
  }

  async getWeeklyReport(req: Request, res: Response): Promise<void> {
    try {
      const report = await this.reportService.generateWeeklyReport();
      res.status(200).json(report);
    } catch (error) {
        throw new Error(`Failed to generate weekly report: ${error}`);
    }
  }

  async getMonthlyReport(req: Request, res: Response): Promise<void> {
    try {
      const report = await this.reportService.generateMonthlyReport();
      res.status(200).json(report);
    } catch (error) {
        throw new Error(`Failed to generate monthly report: ${error}`);
    }
  }

  async getYearlyReport(req: Request, res: Response): Promise<void> {
    try {
      const report = await this.reportService.generateYearlyReport();
      res.status(200).json(report);
    } catch (error) {
        throw new Error(`Failed to generate yearly report: ${error}`);
    }
  }

  async getDashboardReport(req: Request, res: Response): Promise<void> {
    try {
      const dashboard = await this.reportService.generateDashboardComparison();
      res.status(200).json(dashboard);
    } catch (error) {
        throw new Error(`Failed to generate dashboard report: ${error}`);
    }
  }

  async getExpensesByCategory(req: Request, res: Response): Promise<void> {
    try {
      const report = await this.reportService.generateExpensesByCategory();
      res.status(200).json(report);
    } catch (error) {
        throw new Error(`Failed to generate expenses by category: ${error}`);
    }
  }

  async getSpendingPatterns(req: Request, res: Response): Promise<void> {
    try {
      const patterns = await this.reportService.generateSpendingPatterns();
      res.status(200).json(patterns);
    } catch (error) {
        throw new Error(`Failed to generate spending patterns: ${error}`);
    }
  }
}