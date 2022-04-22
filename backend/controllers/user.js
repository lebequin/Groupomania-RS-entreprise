const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utils');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const fs = require("fs");
const logger = require("../middleware/logger");
const TOKEN = process.env.TOKEN;

// Create and Save a new User
exports.signup = (req, res) => {
    let avatarUrl = null;
    utils.verifySignup(req, res)
    logger.info('Enter signup function');

    if (req.file) {
        avatarUrl = `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
        logger.log('avatar file: ' + avatarUrl)
    }

    // Save User in the database
    const user = {
        email: req.body.email,
        pseudo: req.body.pseudo,
        avatarUrl: avatarUrl,
        password: utils.hashPassword(req.body.password),
        isAdmin: req.body.isAdmin,
    }
    User.create(user)
        .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !'}))
        .catch(error => res.status(400).json({ message: 'Impossible de créer l\'utilisateur', error}));
};

exports.login = (req, res, next) => {
    User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    id: User._id,
                    token: jwt.sign(
                        { id: User._id },
                        `${TOKEN}`,
                        { expiresIn: '24h' }
                    )
                });
            }).catch(error => res.status(500).json({ error }));
    }).catch(error => res.status(500).json({ error }));
};


// Find a single User with an id
exports.getOneUser = (req, res) => {
    const id = req.params.id;
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

// Update a User identified by the email in the request
exports.update = (req, res) => {
    const headerAuth = req.headers["authorization"];
    const userId = utils.getUserId(headerAuth);

    if (userId === req.params.id) {
        const userObject = req.file ?
            {
                ...req.body.user,
                avatarUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ... req.body};

        User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
            .then(() => res.status(200).json({ message: 'User updated successfully!'}))
            .catch(error => res.status(400).json({ error }));

    }
    else {
        res.status(401).send('You do not have permission to update this user')
    }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    const imageUrl = req.body.avatarUrl;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            console.log(num)
            if (num == 1) {
                const filename = imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    User.delete({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
                });
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};

// Retrieve all Users from the database (with condition).
exports.findAllAdmin = (req, res) => {
    User.findAll({ where: { isAdmin: true } })
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

exports.findAll = (req, res) => {
    const pseudo = req.query.pseudo;
    var condition = pseudo ? { pseudo: { [Op.like]: `%${pseudo}%` } } : null;
    User.findAll({ where: condition })
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

exports.findAllWithMeme = () => {
    return User.findAll({
        include: ["memes"],
    }).then((user) => {
        return user;
    });
};
