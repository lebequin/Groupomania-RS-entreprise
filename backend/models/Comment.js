// constructor
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("comment", {
        message: {
            type: Sequelize.STRING,
            default: false
        },
        pseudo: {
            type: Sequelize.STRING,
            default: 'Unknown'
        }
    });
};
