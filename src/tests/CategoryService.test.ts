import { CategoryRepository } from '../repositories/CategoryRepository';
import { Category } from '../entities/Category';
import { CategoryService } from '../services/CategoryService';

jest.mock('../repositories/CategoryRepository');

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    categoryRepository = new CategoryRepository() as jest.Mocked<CategoryRepository>;
    categoryService = new CategoryService(categoryRepository);
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const categoryData = { name: 'Food', description: 'Expenses for food' };

      const savedCategory = {
        id: 1,
        ...categoryData,
      } as Category;

      categoryRepository.create.mockReturnValue(savedCategory);
      categoryRepository.save.mockResolvedValue(savedCategory);

      const result = await categoryService.createCategory(categoryData);

      expect(categoryRepository.create).toHaveBeenCalledWith(categoryData);
      expect(categoryRepository.save).toHaveBeenCalledWith(savedCategory);
      expect(result).toEqual(savedCategory);
    });

    it('should throw an error if category creation fails', async () => {
      const categoryData = { name: 'Food', description: 'Expenses for food' };

      categoryRepository.create.mockReturnValue(categoryData as Category);
      categoryRepository.save.mockRejectedValue(new Error('Failed to save'));

      await expect(categoryService.createCategory(categoryData)).rejects.toThrow('Failed to create categories: Failed to save');
    });
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      const categories: Category[] = [
        { id: 1, name: 'Food', description: 'Expenses for food' } as Category,
        { id: 2, name: 'Transport', description: 'Expenses for transport' } as Category,
      ];

      categoryRepository.find.mockResolvedValue(categories);

      const result = await categoryService.getAllCategories();

      expect(categoryRepository.find).toHaveBeenCalled();
      expect(result).toEqual(categories);
    });

    it('should throw an error if fetching categories fails', async () => {
      categoryRepository.find.mockRejectedValue(new Error('Failed to fetch'));

      await expect(categoryService.getAllCategories()).rejects.toThrow('Failed to retrieve categories: Failed to fetch');
    });
  });
});