const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const JWT_TOKEN = process.env.TOKEN;


module.exports = {
    verifySignup: function (req, res) {
        //regex W3c to validate email
        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //regex to fit minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
        const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

        if (req.body.email == null || req.body.pseudo == null || req.body.password == null) {
            res.status(400).json({'error': 'Les champs email, pseudo et mot de passe sont obligatoire'});
            return false;
        }
        if (!regexEmail.test(req.body.email)) {
            res.status(400).json({'error': 'L\'email doit ressembler au format exemple@mail.test'});
            return false;
        }
        if (!regexPassword.test(req.body.password)) {
            res.status(400).json({'error': 'Votre mot de passe doit avoir minimum 8 caractères avec 1 majuscule, minuscule, nombre et caractère spécial'});
            return false;
        }
        return true;
    }
};

// Modifier la fonction pour avoir qu'un seul envoie de message d'erreur