import { Sequelize } from "sequelize";

export const db = new Sequelize('coffee_order', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});