const fs = require('fs');

const db = require("../models");
const utils = require("../utils");
const Meme = db.meme;

// Création d'un meme par un utilisateur connecté
exports.createMeme = (req, res, next) => {
    const id = req.params.id;
    const headerAuth = req.headers["authorization"];
    const userId = utils.getUserId(headerAuth);

    if( userId === id ) {
        return Meme.create({
            title: req.body.title,
            fileUrl: `${req.protocol}://${req.get('host')}/images/${req.body.fileUrl}`,
            userID: userId,
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
    }
    else {
        res.status(401).send('You do not have permission to create a Meme')
    }
};

// recherche d'un meme par pk
exports.findMemeById = (id) => {
    return Meme.findByPk(id, { include: ["user"] })
        .then((meme) => {
            return meme;
        })
        .catch((err) => {
            console.log("Erreur recherche du meme: ", err);
        });
};

// Mise un jour d'un meme et suppression de l'image en base si l'image envoyée est différente
exports.updateMeme = (req, res) => {
    const id = req.params.id;
    const headerAuth = req.headers["authorization"];
    const userId = utils.getUserId(headerAuth);

    if( userId === id ) {
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
                                res.send({ message: `Cannot update Meme with id=${id}. Maybe meme was not found or req.body is empty!`});
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
                    if (num === 1) {
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
    }
    else {
        res.status(401).send('You do not have permission to update')
    }
};

// Suppression du meme par id et suppression de l'image en base
exports.deleteMeme = (req, res, next) => {
    const id = req.params.id;
    const fileUrl = req.body.fileUrl;

    const headerAuth = req.headers["authorization"];
    const userId = utils.getUserId(headerAuth);

    // Vérification que c'est bien l'utilisateur connecté ou un admin pour supprimer le meme
    if( userId === req.params.id || req.admin.isAdmin === true) {
        Meme.destroy({
            where: {id: id}
        })
            .then(num => {
                // Si la suppression s'est bien passé on supprime l'image de la base
                if (num === 1) {
                    const filename = fileUrl.split('/images/')[1];
                    fs.unlinkSync(`images/${filename}`);
                    res.status(200).send({
                        message: "Meme was deleted successfully!"
                    });
                } else {
                    res.status(400).send({
                        message: `Cannot delete Meme with id=${id}. Maybe Meme was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Meme with id=" + id
                });
            });
    }
    else {
        res.status(401).send('You do not have permission to delete')
    }
};

// Récupération de tous les memes par date de création descendante
exports.getAllMeme = (req, res, next) => {
    Meme.findAll({order: [
            ['createdAt', 'DESC'],
        ]})
        .then(meme => {
            console.log(meme);
            res.status(200).json({data: meme});
        })
        .catch(error => res.status(400).json({ error }));
};
