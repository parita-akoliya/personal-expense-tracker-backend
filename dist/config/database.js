"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.AppDataSource = void 0;
require("reflect-metadata");
const data_source_1 = require("./data-source");
exports.AppDataSource = data_source_1.DbDataSource;
const connectDatabase = async () => {
    try {
        await exports.AppDataSource.initialize();
        logger.debug('Database connected successfully');
    }
    catch (error) {
        console.error('Error connecting to database:', error);
    }
};
exports.connectDatabase = connectDatabase;
