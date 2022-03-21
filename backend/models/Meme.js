// constructor
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("memes", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: 'user',
            referencesKey: 'id'
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fileUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        likes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        dislikes: {
            type: Sequelize.INTEGER,
            defaultValue: false
        }
    });
};
