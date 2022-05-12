const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./User.js")(sequelize, Sequelize);
db.meme = require("./Meme.js")(sequelize, Sequelize);
db.like = require("./Like.js")(sequelize, Sequelize);
db.comment = require("./Comment.js")(sequelize, Sequelize);
db.user.hasMany(db.meme, { as: "memes" });
db.meme.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});
db.meme.hasMany(db.like, { as: "likes" });
db.like.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});
db.like.belongsTo(db.meme, {
    foreignKey: "memeId",
    as: "meme",
});
db.comment.belongsTo(db.meme, {
    foreignKey: "memeId",
    as: "meme",
});
db.comment.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});
module.exports = db;
