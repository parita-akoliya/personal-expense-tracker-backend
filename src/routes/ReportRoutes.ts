import { Router } from "express";
import { Container } from "typedi";
import { ReportController } from "../controllers/ReportController";

const router = Router();
const reportController = Container.get(ReportController);

/**
 * @swagger
 * /api/reports/daily:
 *   get:
 *     summary: Get daily expense report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Daily report generated
 *       500:
 *         description: Internal server error
 */
router.get("/daily", async (req, res, next) => {
  try {
    await reportController.getDailyReport(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reports/weekly:
 *   get:
 *     summary: Get weekly expense report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Weekly report generated
 *       500:
 *         description: Internal server error
 */
router.get("/weekly", async (req, res, next) => {
  try {
    await reportController.getWeeklyReport(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reports/monthly:
 *   get:
 *     summary: Get monthly expense report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Monthly report generated
 *       500:
 *         description: Internal server error
 */
router.get("/monthly", async (req, res, next) => {
  try {
    await reportController.getMonthlyReport(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reports/yearly:
 *   get:
 *     summary: Get yearly expense report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Yearly report generated
 *       500:
 *         description: Internal server error
 */
router.get("/yearly", async (req, res, next) => {
  try {
    await reportController.getYearlyReport(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reports/dashboard:
 *   get:
 *     summary: Get dashboard report comparing current vs previous periods
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Dashboard report generated
 *       500:
 *         description: Internal server error
 */
router.get("/dashboard", async (req, res, next) => {
  try {
    await reportController.getDashboardReport(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reports/category:
 *   get:
 *     summary: Get expenses by category
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Expenses by category generated
 *       500:
 *         description: Internal server error
 */
router.get("/category", async (req, res, next) => {
  try {
    await reportController.getExpensesByCategory(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/reports/spending-patterns:
 *   get:
 *     summary: Get monthly spending patterns
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Monthly spending patterns generated
 *       500:
 *         description: Internal server error
 */
router.get("/spending-patterns", async (req, res, next) => {
  try {
    await reportController.getSpendingPatterns(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/total-expenses", async (req, res, next) => {
  try {
    await reportController.getTotalExpenses(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
