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
exports.ExpenseService = void 0;
const typedi_1 = require("typedi");
const ExpenseRepository_1 = require("../repositories/ExpenseRepository");
let ExpenseService = class ExpenseService {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    async createExpense(data) {
        const expense = this.expenseRepository.create(data);
        return this.expenseRepository.save(expense);
    }
    async getAllExpenses() {
        return this.expenseRepository.find();
    }
    async getExpensesByUser(userId) {
        return this.expenseRepository.find({ where: { user: { id: userId } } });
    }
    async getMonthlyReport(userId, month, year) {
        return this.expenseRepository.query(`
            SELECT SUM(amount) AS total, date_trunc('day', date) AS day
            FROM expenses
            WHERE userId = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3
            GROUP BY day
            ORDER BY day
        `, [userId, month, year]);
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [ExpenseRepository_1.ExpenseRepository])
], ExpenseService);
