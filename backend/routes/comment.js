const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

// Create a comment ✅
router.post('/', auth, commentCtrl.createComment);
// Update a comment by pk ✅
router.put('/:id', auth, commentCtrl.updateComment);
// Delete a meme by pk ✅
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;