const db = require("../models");
const utils = require("../utils");
const Comment = db.comment;
const User = db.user;

//Création d'un commentaire
exports.createComment = (req, res) => {
    const memeId = req.params.id;
    const headerAuth = req.headers["authorization"];
    const userId = utils.getUserId(headerAuth);

    const comment = {
        content : req.body.content,
        memeId : memeId,
        userId : userId,
    };
    Comment.create({ ...comment })
        .then(() => res.status(201).json(comment))
        .catch((err) => res.status(400).json(err));
};

// Mise à jour du commentaire
exports.updateComment = (req, res) => {
    Comment.findOne({
        where: {id: req.params.id,},
    }).then((comment) => {
        if (!comment)
            return res.status(404).json({ message: "Comment not found" });
        if (req.auth.userId !== comment.userId)
            return res.status(401).json({ message: "You do not have permission to update comment" });
        comment
            .update({ content: req.body.content })
            .then(() => res.status(200).json(req.body.content));
    });
};

// Obtenir tous les commentaire d'un meme
exports.getAllCommentsOfMeme = (req, res) => {
    Comment.findAll({
        where: {memeId: req.params.memeId,},
        include: [{model: User,},],
    })
        .then((comments) => res.status(200).json(comments))
        .catch((error) => res.status(400).json({ error }));
};

//Supprimer un commentaire
exports.deleteComment = (req, res) => {
    Comment.findOne({
        where: { id: req.params.id },
    })
        .then((comment) => {
            if (!comment) {
                return res.status(400).json({ message: "Comment not found" });
            }
            //Vérifie si c'est le créateur du commentaire ou l'admin qui effectue la requête
            if (comment.userId !== req.auth.userId && req.admin.isAdmin === false) {
                return res.status(401).json({ message: "You do not have permission to delete this Comment" });
            }
            comment.destroy()
                .then(() => res.status(200).json({ message: "Comment deleted" }))
                .catch((err) => res.status(400).json({ err }));
        })
        .catch((err) => res.status(500).json(err));
};