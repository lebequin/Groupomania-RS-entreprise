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

db.user.hasMany(db.meme, {as: "memes", onDelete: 'CASCADE', hooks: true});
db.meme.belongsTo(db.user, {
    foreignKey: {
        allowNull: false,
        name: "userId",
    },

});
db.user.hasMany(db.like, {as: "likes", onDelete: 'CASCADE', hooks: true});
db.like.belongsTo(db.user, {
    foreignKey: {
        allowNull: false,
        name: "userId",
    },
    as: "user",
});
db.meme.hasMany(db.like, {as: "likes", onDelete: 'CASCADE', hooks: true});
db.like.belongsTo(db.meme, {
    foreignKey: {
        allowNull: false,
        name: "memeId",
    },
});
db.meme.hasMany(db.comment, {as: "comments", onDelete: 'CASCADE', hooks: true});
db.comment.belongsTo(db.meme, {
    foreignKey: {
        allowNull: false,
        name: "memeId",
    },
    as: "meme",
});
db.user.hasMany(db.comment, {as: "comments", onDelete: 'CASCADE', hooks: true});
db.comment.belongsTo(db.user, {
    foreignKey: {
        allowNull: false,
        name: "userId",
    },
    as: "user",
});

module.exports = db;
