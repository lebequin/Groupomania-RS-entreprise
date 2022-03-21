const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const fs = require("fs");
const TOKEN = process.env.TOKEN;

// Create and Save a new User
exports.signup = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Save User in the database
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                email: req.body.email,
                pseudo: req.body.pseudo,
                avatarUrl: req.body.avatarUrl,
                password: hash,
                isAdmin: req.body.isAdmin,
            }
            User.create(user)
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé avec succès !'
                }))
                .catch(error => res.status(400).json({
                    message: 'Impossible de créer l\'utilisateur',
                    error
                }));
        })
        .catch(error => res.status(500).json({ error }));
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
                    id: req.params._id,
                    token: jwt.sign(
                        { id: req.params._id },
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
                res.send(data);
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
    const id = req.params.id;

    if(req.file){
        User.findOne({ _id: req.params.id }).then(user => {
            const filename = user.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const userObject = {
                    ...JSON.parse(req.body.user),
                    avatarUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                User.update(...userObject, {
                    where: { id: id }
                })
                    .then(num => {
                        if (num === 1) {
                            res.send({
                                message: "User was updated successfully."
                            });
                        } else {
                            res.send({
                                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating User with id=" + id
                        });
                    });
            });
        })
            .catch(error => res.status(500).json({ error }));
    }
    else {
        console.log(req.body)
        User.update( req.body, {
            where: { id: req.params.id }
        })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "User was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });
    }

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    const imageUrl = req.body.imageUrl;
    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
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

