const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const JWT_TOKEN = process.env.TOKEN;


module.exports = {
    parseAuthorization: function (authorization) {
        return authorization != null ? authorization.replace("Bearer ", "") : null;
    },

    getUserId: function (authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);

        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_TOKEN);

                if (jwtToken != null) userId = jwtToken.userId;
            } catch (err) {
            }
        }
        return userId;
    },

    /*isExist: function (res, email) {
        User.findOne({
            attributes: ['email'],
            where: {email: email}
        }).then(r => true)
            .catch(error => false);
    },*/

    verifySignup: function (req, res) {
        //regex W3c to validate email
        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //regex to fit minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
        const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

        if (req.body.email == null || req.body.pseudo == null || req.body.password == null) {
            return res.status(400).json({'error': 'Fields email, pseudo and password are required'});
        }
        if (!regexEmail.test(req.body.email)) {
            return res.status(400).json({'error': 'Email do not fit with exemple@mail.test'});
        }
        if (!regexPassword.test(req.body.password)) {
            return res.status(400).json({'error': 'Your password must be 8 characters minimum long with 1 upper, lower, special and number character'});
        }
        return true;
    }
};

// Modifier la fonction pour avoir qu'un seul envoie de message d'erreur