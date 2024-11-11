import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';
import expenseRoutes from './routes/ExpenseRoutes';
import categoryRoute from './routes/CategoryRoutes';
import reportRoutes from './routes/ReportRoutes';
import { responseMiddleware } from './middleware/ResponseMiddleware';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/ErrorHandler';

dotenv.config();

const app = express();

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API',
      version: '1.0.0',
      description: 'API documentation for the Expense Tracker application',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors());
app.use(responseMiddleware);

// API Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoute);
app.use('/api/reports', reportRoutes);

// Centralized error handling
app.use(errorHandler);

export default app;