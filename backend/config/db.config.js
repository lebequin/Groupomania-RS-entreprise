const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const PASSWORD = process.env.DB_PASSWORD;

module.exports = {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASSWORD,
    DB: DB_NAME,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
