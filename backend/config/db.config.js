const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const PASSWORD = process.env.DB_PASSWORD;
const DIALECT = process.env.DB_DIALECT;

module.exports = {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASSWORD,
    DB: DB_NAME,
    DIALECT: DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
