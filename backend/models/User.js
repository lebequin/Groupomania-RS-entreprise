// constructor
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        pseudo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatarUrl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return User;
};