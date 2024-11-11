import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    sendFormatted: (statusCode: number, data: any, message?: string) => void;
  }
}

/**
 * Middleware to add a formatted response method to the response object.
 */
export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  res.sendFormatted = (statusCode: number, data: any, message: string = '') => {
    const isSuccess = statusCode >= 200 && statusCode < 300;
    res.status(statusCode).json({
      status: isSuccess ? 'success' : 'error',
      message: message || (isSuccess ? 'Success' : 'Error occurred'),
      data: isSuccess ? data : undefined,
      error: isSuccess ? undefined : data,
    });
  };
  next();
}