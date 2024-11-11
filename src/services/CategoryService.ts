import { Service } from 'typedi';
import { Category } from '../entities/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';

/**
 * Service for managing category-related business logic.
 */
@Service()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  /**
   * Creates a new category.
   * 
   * @param data - The data for the category to be created.
   * @returns A promise that resolves to the created category.
   */
  async createCategory(data: Partial<Category>): Promise<Category> {
    try {
      const category = this.categoryRepository.create(data);
      return await this.categoryRepository.save(category);
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(`Failed to create categories: ${error.message}`);
        } else {
            throw new Error(`Failed to create categories: ${error}`);
        }
    }
  }

  /**
   * Retrieves all categories.
   * 
   * @returns A promise that resolves to an array of categories.
   */
  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(`Failed to retrieve categories: ${error.message}`);
        } else {
            throw new Error(`Failed to retrieve categories: ${error}`);
        }
    }
  }
}