const fs = require('fs');

const db = require("../models");
const utils = require("../utils");
const Meme = db.memes;

exports.createMeme = (req, res, next) => {
    const id = req.params.id;
    const headerAuth = req.headers["authorization"];
    const userId = utils.getUserId(headerAuth);

    if( userId === id ) {
        return Meme.create({
            title: req.body.title,
            fileUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
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

exports.findMemeById = (id) => {
    return Meme.findByPk(id, { include: ["user"] })
        .then((meme) => {
            return meme;
        })
        .catch((err) => {
            console.log("Erreur recherche du meme: ", err);
        });
};

exports.updateMeme = (req, res) => {
    const id = req.params.id;
    const headerAuth = req.headers["authorization"];
    const userId = utils.getUserId(headerAuth);

    if( userId === id ) {
        if (req.file) {
            Meme.findOne({id: req.params.id}).then(meme => {
                const filename = meme.fileUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const memeObject = {
                        ...JSON.parse(req.body.memes),
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

exports.deleteMeme = (req, res, next) => {
    const id = req.params.id;
    const fileUrl = req.body.fileUrl;

    const headerAuth = req.headers["authorization"];
    const userId = utils.getUserId(headerAuth);

    if( userId === req.params.id ) {
        Meme.destroy({
            where: {id: id}
        })
            .then(num => {
                if (num === 1) {
                    const filename = fileUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Meme.delete({_id: req.params.id})
                            .then(() => res.status(200).json({message: 'Meme supprimé !'}))
                            .catch(error => res.status(400).json({error}));
                    });
                    res.send({
                        message: "Meme was deleted successfully!"
                    });
                } else {
                    res.send({
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

exports.getAllMeme = (req, res, next) => {
    Meme.findAll({order: [
            ['createdAt', 'DESC'],
        ]})
        .then(memes => {
            console.log(memes);
            res.status(200).json({data: memes});
        })
        .catch(error => res.status(400).json({ error }));
};
