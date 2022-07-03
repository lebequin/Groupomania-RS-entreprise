const fs = require('fs');

const db = require("../models");
const utils = require("../utils");
const Meme = db.meme;

// Création d'un meme par un utilisateur connecté
exports.createMeme = (req, res, next) => {
    const userId = req.auth.userId
    if (userId) {
        return Meme.create({
            title: req.body.title,
            fileUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            userId: userId,
        })
            .then(meme => {
                console.log("Création du meme: " + meme.title);
                res.status(201).send(meme);
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error creating Meme with title=" + req.body.title
                });
            });
    } else {
        res.status(401).send('You do not have permission to create a Meme')
    }
};

exports.getOneMeme = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Meme.findByPk(id, {include: ['likes', 'comments', 'user']})
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Meme with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Meme with id=" + id
            });
        });
};

// Mise un jour d'un meme et suppression de l'image en base si l'image envoyée est différente
exports.updateMeme = (req, res) => {
    const userId = req.auth.userId;
    const id = req.params.id;

    if (userId) {
        // Si un fichier est envoyé on supprime l'ancien pour ajouter le nouveau en base
        if (req.file) {
            Meme.findOne({id: req.params.id}).then(meme => {
                const filename = meme.fileUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const memeObject = {
                        ...JSON.parse(req.body.meme),
                        fileUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Meme.update(...memeObject, {
                        where: {id: id}
                    })
                        .then(num => {
                            if (num === 1) {
                                res.send({message: "Meme was updated successfully."});
                            } else {
                                res.send({message: `Cannot update Meme with id=${id}. Maybe meme was not found or req.body is empty!`});
                            }
                        })
                        .catch(err => {
                            res.status(500).send({message: "Error updating Meme with id=" + id});
                        });
                });
            })
                .catch(error => res.status(500).json({error}));
        } else {
            // Sinon on modifie juste le meme
            Meme.update(req.body, {
                where: {id: id}
            })
                .then(num => {
                    if (num == 1) {
                        res.send({message: "Meme was updated successfully."});
                    } else {
                        res.send({message: `Cannot update Meme with id=${id}. Maybe Meme was not found or req.body is empty!`});
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating Meme with id=" + id
                    });
                });
        }
    } else {
        res.status(401).send('You do not have permission to update')
    }
};

exports.deleteMeme = (req, res, next) => {
    Meme.findOne({where: {id: req.params.id}})
        .then(meme => {
            if (meme.userId === req.auth.userId || req.auth.isAdmin) {
                if (meme.fileUrl === null) { //Suppression du meme sans image
                    Meme.destroy({where: {id: req.params.id}})
                        .then(() => res.status(201).json({message: 'Meme supprimé !'}))
                        .catch(error => res.status(400).json({error, message: error.message}));
                } else { //Suppression du meme avec image
                    const filename = meme.fileUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () =>
                        Meme.destroy({where: {id: req.params.id}})
                            .then(() => res.status(200).json({message: 'Meme supprimé !'}))
                            .catch(error => res.status(400).json({error, message: error.message}))
                    );
                }
            } else {
                res.status(401).json({message: 'Vous n\'êtes pas autorisé à supprimer ce meme !'});
            }
        })
        .catch(error => res.status(500).json({error, message: error.message}));
};

// Récupération de tous les memes par date de création descendante
exports.getAllMeme = (req, res, next) => {
    Meme.findAll({
        order: [
            ['createdAt', 'DESC'],

        ],
        include: ['likes', 'comments', 'user']
    })
        .then(meme => {
            console.log(meme);
            res.status(200).json({data: meme});
        })
        .catch(error => res.status(400).json({error}));
};
