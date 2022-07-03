const db = require("../models");
const Comment = db.comment;
const User = db.user;

//Création d'un commentaire
exports.createComment = (req, res) => {
    const memeId = req.params.memeId;
    const comment = {
        message: req.body.message,
        memeId: memeId,
        userId: req.auth.userId,
    };
    Comment.create({...comment})
        .then(() => res.status(201).json(comment))
        .catch((err) => res.status(400).json(err));
};

// Mise à jour du commentaire
exports.updateComment = (req, res) => {
    Comment.findOne({
        where: {id: req.params.memeId,},
    }).then((comment) => {
        if (!comment)
            return res.status(404).json({message: "Comment not found"});
        if (req.auth.userId !== comment.userId)
            return res.status(401).json({message: "You do not have permission to update comment"});
        comment
            .update({content: req.body.content})
            .then(() => res.status(200).json(req.body.content));
    });
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