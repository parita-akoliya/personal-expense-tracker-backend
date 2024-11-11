import { Router } from 'express';
import { Container } from 'typedi';
import { ExpenseController } from '../controllers/ExpenseController';

const router = Router();
const expenseController = Container.get(ExpenseController);

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               userId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res, next) => {
  try {
    await expenseController.createExpense(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Retrieve all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: A list of expenses
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res, next) => {
  try {
    await expenseController.getAllExpenses(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the expense to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               userId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res, next) => {
  try {
    await expenseController.updateExpense(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the expense to delete
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await expenseController.deleteExpense(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;