const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    likes: { type: Number, required: false },
    dislikes : { type: Number, required: false },
});

module.exports = mongoose.model('Meme', memeSchema);
