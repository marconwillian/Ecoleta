import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
    development: {
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, '..', 'database', 'seeds')
        },
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE
        }
    },
    test: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, '..', 'database', 'dev.sqlite')
        },
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, '..', 'database', 'seeds')
        },
        useNullAsDefault: false
    },
    production: {
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, '..', 'database', 'seeds')
        },
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE
        }
    }
};
