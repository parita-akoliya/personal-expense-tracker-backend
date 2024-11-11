import { DataSource } from 'typeorm';

export const DbDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "expense_tracker",
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.ts'],
    subscribers: [],
    migrations: ['src/migrations/*.ts'],
})