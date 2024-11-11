import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export function validateSchema(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map(detail => detail.message);
      return res.sendFormatted(400, errorDetails, 'Validation Error');
    }
    next();
  };
}