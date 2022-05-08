const express = require('express');
const router = express.Router();


const memeCtrl = require('../controllers/meme');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

// Create a meme ❌
router.post('/', auth, multer, memeCtrl.createMeme);
// Find a meme by pk ❌
router.get('/:id', auth, memeCtrl.findMemeById);
// Update a meme by pk ❌
router.put('/:id', auth, multer, memeCtrl.updateMeme);
// Delete a meme by pk ❌
router.delete('/:id', auth, memeCtrl.deleteMeme);
// Get all memes from a user ✅
router.get('/', auth, memeCtrl.getAllMeme);

module.exports = router