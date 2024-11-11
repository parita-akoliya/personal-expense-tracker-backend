import Joi from 'joi';

/**
 * Joi schema for validating expense creation data.
 */
const createExpenseSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be a positive number',
    'any.required': 'Amount is required',
  }),
  category: Joi.number().optional().messages({
    'number.base': 'Category ID must be a number',
  }),
  description: Joi.string().min(3).max(255).optional().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description should have a minimum length of 3',
    'string.max': 'Description should have a maximum length of 255',
    'any.required': 'Description is required',
  }),
  date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date',
    'any.required': 'Date is required',
  }),
});

export default { createExpenseSchema };