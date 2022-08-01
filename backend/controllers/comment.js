const db = require("../models");
const {request} = require("express");
const Comment = db.comment;
const User = db.user;

//Création d'un commentaire
exports.createComment = (req, res) => {
    const memeId = req.params.memeId;
    const comment = {
        message: req.body.message,
        memeId: memeId,
        userId: req.auth.userId,
        pseudo: req.body.pseudo,
    };
    Comment.create({...comment})
        .then(() => res.status(201).json(comment))
        .catch((err) => res.status(400).json(err));
};

// Récupérer un commentaire
exports.getOneComment = (req, res) => {
    const id = req.params.commentId;
    Comment.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find comment with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving comment with id=" + id
            });
        });
};

// Mise à jour du commentaire
exports.updateComment = (req, res) => {
    Comment.findOne({
        where: {id: req.params.commentId,},
    }).then((comment) => {
        if (!comment)
            return res.status(404).json({message: "Comment not found"});
        if (req.auth.userId !== comment.userId)
            return res.status(401).json({message: "You do not have permission to update comment"});
        console.log(req.body)
        comment
            .update({message: req.body.message})
            .then(() => res.status(200).json(req.body.content));

    }).catch((error) => res.status(500).json({message: "error updating comment : ", error}));
};

//Supprimer un commentaire
exports.deleteComment = (req, res) => {
    Comment.findOne({
        where: {id: req.params.commentId},
    })
        .then((comment) => {
            if (!comment) {
                return res.status(400).json({message: "Comment not found"});
            }
            //Vérifie si c'est le créateur du commentaire ou l'admin qui effectue la requête
            if (comment.userId !== req.auth.userId && req.admin.isAdmin === false) {
                return res.status(401).json({message: "You do not have permission to delete this Comment"});
            }
            comment.destroy()
                .then(() => res.status(200).json({message: "Comment deleted"}))
                .catch((err) => res.status(400).json({err}));
        })
        .catch((err) => res.status(500).json(err));
};