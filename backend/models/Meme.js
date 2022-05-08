// constructor
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("meme", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fileUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
};

