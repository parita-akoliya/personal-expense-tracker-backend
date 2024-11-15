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
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const typedi_1 = require("typedi");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        const { email, password } = req.body;
        const user = await this.authService.register(email, password);
        res.json(user);
    }
    async login(req, res) {
        const { email, password } = req.body;
        const { user, token } = await this.authService.login(email, password);
        res.json({ user, token });
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [AuthService_1.AuthService])
], AuthController);
