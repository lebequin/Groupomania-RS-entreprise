const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utils');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const fs = require("fs");
const logger = require("../middleware/logger");
const TOKEN = process.env.TOKEN;

// Création et enregistrement d'un utilisateur
exports.signup = (req, res) => {
    let file = null;
    if (!utils.verifySignup(req, res)) {
        return
    }

    if (req.file) {
        file = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    // Chiffrage du mot de passe avec bcrypt et un salage de 10
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                email: req.body.email,
                pseudo: req.body.pseudo,
                avatarUrl: file,
                password: hash,
                isAdmin: req.body.isAdmin,
            }
            User.create(user)
                .then(() => res.status(201).json({message: 'Utilisateur créé avec succès !'}))
                .catch(error => res.status(400).json({message: 'Impossible de créer l\'utilisateur', error}));
        });

};
// Connexion de l'utilisateur
exports.login = (req, res, next) => {
    User.findOne({
        where: {email: req.body.email}
    }).then(user => {
        if (!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    isAdmin: user.isAdmin,
                    userId: user.id,
                    token: jwt.sign(
                        {id: user.id},
                        `${TOKEN}`,
                        {expiresIn: '24h'}
                    )
                });
            }).catch(error => res.status(500).json({error}));
    }).catch(error => res.status(500).json({error}));
};


// Récupère un utilisateur par sa pk
exports.getOneUser = (req, res) => {
    const id = req.params.id;
    console.log(id)
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Mettre à jour un utilisateur par sa pk
exports.update = (req, res) => {
    if (req.auth.userId === parseInt(req.params.id) || req.admin.isAdmin) {
        console.log(req.params.id)
        const userObject = req.file ?
            {
                ...req.body.user,
                avatarUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {...req.body};
        console.log(req.body)
        User.update({...userObject, id: req.params.id}, {where: {id: req.params.id}})
            .then(() => res.status(200).json({message: 'User updated successfully!'}))
            .catch(error => res.status(400).json({error}));

    } else {
        res.status(401).send('You do not have permission to update this user')
    }
};

// Supprimer l'utilisateur par sa pk
exports.delete = (req, res) => {
    User.findOne({where: {id: req.params.id}})
        .then((user) => {
            if (user.id === req.auth.userId || req.token.isAdmin) {
                const filename = user.avatarUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    User.destroy({where: {id: req.params.id}})
                        .then(() => res.status(201).json({message: 'Utilisateur supprimé !'}))
                        .catch(error => res.status(400).json({error, message: error.message}));
                });
            } else {
                res.status(403).json({message: 'You do not have permission to delete this user'});
            }
        })
        .catch(error => res.status(500).json({error, message: error.message}));
};

// Récupère tous les admins de la base
exports.findAllAdmin = (req, res) => {
    User.findAll({where: {isAdmin: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving admins."
            });
        });
};

// récupère tous les utilisateurs par pseudo
exports.findAll = (req, res) => {
    const pseudo = req.query.pseudo;
    var condition = pseudo ? {pseudo: {[Op.like]: `%${pseudo}%`}} : null;
    User.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};
