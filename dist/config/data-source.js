"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.DbDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "expense_tracker",
    synchronize: true,
    logging: true,
    entities: ['src/entities/*.ts'],
    subscribers: [],
    migrations: ['src/migrations/*.ts'],
});
