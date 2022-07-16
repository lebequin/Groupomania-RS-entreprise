const db = require("../models");
const Like = db.like;

// Like d'un meme par default un meme est neutre
exports.likeMeme = (req, res) => {
    Like.findOne({
        where: {userId: req.auth.userId, memeId: req.params.memeId},
    })
        .then((like) => {
            console.log(like)
            if (like) {
                Like.destroy({
                    where: {userId: req.auth.userId, memeId: req.params.memeId},
                })
                    .then(() =>
                        res.status(200).json({
                            ...req.body,
                            memeId: parseInt(req.params.memeId),
                            userId: req.auth.userId,
                        })
                    )
                    .catch((err) => res.status(400).json(err));
            } else {
                const newLike = {
                    ...req.body,
                    memeId: parseInt(req.params.memeId),
                    userId: req.auth.userId,
                };
                Like.create({
                    ...newLike,
                })
                    .then(() => res.status(201).json(newLike))
                    .catch((err) => res.status(400).json({err}));
            }
        })
        .catch((err) => res.status(500).json({err}));
};

// Récupère le nombre de likes sur un meme
exports.getNumberLikeOnMeme = (req, res) => {
    Like.count({
        where: {memeId: req.params.memeId},
    })
        .then((number) => res.status(200).json({number}))
        .catch((err) => res.status(400).json(err));
};
