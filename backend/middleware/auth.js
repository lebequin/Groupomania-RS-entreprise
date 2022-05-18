const jwt = require('jsonwebtoken');
const db = require("../models");
const TOKEN = process.env.TOKEN;
const User = db.user;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${TOKEN}`);

        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;

        req.admin = { isAdmin };
        const user = User.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(401).json({ message: `Id : ${userId} does not exist.` });
        } else if (req.body.userId && req.body.userId !== userId) {
            return res.status(401).json({ message: "Your not authorized" });
        } else {
            req.auth = { userId };
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
