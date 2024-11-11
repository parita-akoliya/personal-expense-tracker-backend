import { Request, Response, NextFunction } from 'express';

/**
 * Centralized error handling middleware.
 * Logs and formats errors before sending a response.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error stack:', err.stack);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ status: 'error', message, error: err.stack });
}