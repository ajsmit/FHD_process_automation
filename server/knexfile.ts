import type { Knex } from "knex";
import path from 'path';
import config from "./src/config";

const dbConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "dev.sqlite3")
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "./src/db/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "./src/db/seeders"),
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
