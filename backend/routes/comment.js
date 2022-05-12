const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

// Create a comment ❌
router.post('/:memeId/comment', auth, commentCtrl.createComment);
// Update a comment by pk ❌
router.put('/:memeId/comment/:id', auth, commentCtrl.updateComment);
// Delete a meme by pk ❌
router.delete('/:memeId/comment/:id', auth, commentCtrl.deleteComment);
// Get all memes from a user ✅
router.get('/:memeId/', auth, commentCtrl.getAllCommentsOfMeme);

module.exports = router;