import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { AuthService } from '../services/AuthService';

jest.mock('../repositories/UserRepository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService(userRepository);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const hashedPassword = 'hashedPassword123';
      const savedUser = { id: 1, email: userData.email, password: hashedPassword } as User;

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      userRepository.create.mockReturnValue(savedUser);
      userRepository.save.mockResolvedValue(savedUser);

      const result = await authService.register(userData.email, userData.password);

      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(userRepository.create).toHaveBeenCalledWith({ email: userData.email, password: hashedPassword });
      expect(userRepository.save).toHaveBeenCalledWith(savedUser);
      expect(result).toEqual(savedUser);
    });

    it('should throw an error if registration fails', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');
      userRepository.create.mockImplementation(() => { throw new Error('Failed to create'); });

      await expect(authService.register(userData.email, userData.password)).rejects.toThrow('Registration failed: Failed to create');
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const user = { id: 1, email: userData.email, password: 'hashedPassword123' } as User;
      const token = 'jwtToken';

      userRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = await authService.login(userData.email, userData.password);

      expect(userRepository.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      expect(result).toEqual({ user, token });
    });

    it('should throw an error if login credentials are invalid', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };

      userRepository.findOne.mockResolvedValue(null);

      await expect(authService.login(userData.email, userData.password)).rejects.toThrow('Login failed: Invalid credentials');
    });
  });
});