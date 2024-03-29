const jwt = require('jsonwebtoken');
const db = require("../models");
const TOKEN = process.env.TOKEN;
const User = db.user;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${TOKEN}`);

        if (decodedToken.iat > decodedToken.exp) {
            return res.status(401).json({message: `Vous devez vous reconnecter pour accéder à votre espace`});
        }
        const userId = decodedToken.id;
        const user = User.findOne({
            where: {
                id: userId,
            },
        }).then(user => {
            if (!user) {
                return res.status(401).json({message: `Id : ${userId} does not exist.`});
            } else if (parseInt(req.body.userId) && parseInt(req.body.userId) !== parseInt(userId)) {
                return res.status(401).json({message: "Vous n'êtes pas autorisé à accéder à cette page"});
            } else {
                req.auth = {userId};
                req.admin = {isAdmin: user.isAdmin};
                next();
            }
        });

        // suppression req.Admin
    } catch {
        res.status(401).json({
            error: new Error('Requête invalide!')
        });
    }
};
