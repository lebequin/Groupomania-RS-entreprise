const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

/*
* Initialisation de sequelize avec les variables d'environnement
*/
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

// Création de la base de donnée et ajout des modèles
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./User.js")(sequelize, Sequelize);
db.meme = require("./Meme.js")(sequelize, Sequelize);
db.like = require("./Like.js")(sequelize, Sequelize);
db.comment = require("./Comment.js")(sequelize, Sequelize);

// Ajout des dépendances entre les tables, des contraintes et des onDelete sur les models

db.user.hasMany(db.meme, { as: "memes" });
db.meme.belongsTo(db.user, {
    foreignKey: {
        allowNull: false,
        name: "userId",
    },
    onDelete: 'CASCADE',
});
db.like.belongsTo(db.user, {
    foreignKey: {
        allowNull: false,
        name: "userId",
    },
    onDelete: 'CASCADE',
    as: "user",
});
db.meme.hasMany(db.like, { as: "likes" });
db.like.belongsTo(db.meme, {
    foreignKey: {
        allowNull: false,
        name: "memeId",
    },
    onDelete: 'CASCADE',
});
db.meme.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.meme, {
    foreignKey: {
        allowNull: false,
        name: "memeId",
    },
    onDelete: 'CASCADE',
});
db.comment.belongsTo(db.user, {
    foreignKey: {
        allowNull: false,
        name: "userId",
    },
    onDelete: 'CASCADE',
    as: "user",
});

module.exports = db;
