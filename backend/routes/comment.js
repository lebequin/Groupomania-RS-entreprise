const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

// Create a comment ✅
router.post('/:memeId', auth, commentCtrl.createComment);
// Update a comment by pk ✅
router.put('/:commentId', auth, commentCtrl.updateComment);
// Delete a meme by pk ✅
router.delete('/:commentId', auth, commentCtrl.deleteComment);

module.exports = router;