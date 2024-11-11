import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CategoryService } from '../services/CategoryService';

/**
 * Controller for handling category-related operations.
 */
@Service()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Creates a new category.
   * 
   * @param req - Express request object containing category data
   * @param res - Express response object
   */
  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = await this.categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
        throw new Error(`Failed to create category: ${error}`);
    }
  }

  /**
   * Retrieves all categories.
   * 
   * @param req - Express request object
   * @param res - Express response object
   */
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
        throw new Error(`Failed to retrieve categories: ${error}`);
    }
  }
}