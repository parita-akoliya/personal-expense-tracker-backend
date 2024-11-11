import { Router } from 'express';
import { Container } from 'typedi';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();
const categoryController = Container.get(CategoryController);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res, next) => {
  try {
    await categoryController.createCategory(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res, next) => {
  try {
    await categoryController.getAllCategories(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;