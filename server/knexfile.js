"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dbConfig = {
    development: {
        client: "sqlite3",
        connection: {
            filename: path_1.default.join(__dirname, "dev.sqlite3")
        },
        useNullAsDefault: true,
        migrations: {
            directory: path_1.default.join(__dirname, "./src/db/migrations"),
        },
        seeds: {
            directory: path_1.default.join(__dirname, "./src/db/seeders"),
        }
    },
    staging: {
        client: "mysql2",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },
    production: {
        client: "mysql2",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
module.exports = dbConfig;
