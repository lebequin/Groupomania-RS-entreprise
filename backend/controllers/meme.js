const Meme = require('../models/meme');
const fs = require('fs');

exports.createMeme = (req, res, next) => {
    const memeObject = JSON.parse(req.body.meme);
    delete memeObject._id;
    const meme = new Meme({
        ...memeObject,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    meme.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};


exports.getOneMeme = (req, res, next) => {
    Meme.findOne({
        _id: req.params.id
    }).then(
        (meme) => {
            res.status(200).json(meme);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyMeme = (req, res, next) => {
    if(req.file){
        Meme.findOne({ _id: req.params.id }).then(meme => {
            const filename = meme.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const memeObject = {
                    ...JSON.parse(req.body.meme),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                Meme.updateOne({_id: req.params.id}, {...memeObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet modifié !'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
            .catch(error => res.status(500).json({ error }));
    }
    else {
        Meme.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.deleteMeme = (req, res, next) => {
    Meme.findOne({ _id: req.params.id })
        .then(meme => {
            const filename = meme.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Meme.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllMeme = (req, res, next) => {
    Meme.find().then(
        (memes) => {
            res.status(200).json(memes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
