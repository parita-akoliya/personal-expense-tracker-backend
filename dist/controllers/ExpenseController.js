"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const typedi_1 = require("typedi");
const ExpenseService_1 = require("../services/ExpenseService");
let ExpenseController = class ExpenseController {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    async createExpense(req, res) {
        const expense = await this.expenseService.createExpense(req.body);
        res.json(expense);
    }
    async getAllExpenses(req, res) {
        const expenses = await this.expenseService.getAllExpenses();
        res.json(expenses);
    }
    async getExpenses(req, res) {
        const userId = req.params.userId || req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const expenses = await this.expenseService.getExpensesByUser(userId);
        res.json(expenses);
    }
};
exports.ExpenseController = ExpenseController;
exports.ExpenseController = ExpenseController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [ExpenseService_1.ExpenseService])
], ExpenseController);
