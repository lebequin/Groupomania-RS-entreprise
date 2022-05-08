// constructor
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("like", {
        isLike: {
            type: Sequelize.BOOLEAN,
            default: false
        },
    });
};