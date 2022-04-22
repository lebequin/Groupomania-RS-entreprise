const express = require('express');
const router = express.Router();


const memeCtrl = require('../controllers/meme');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

// Create a meme ❌
router.post('/', multer, memeCtrl.createMeme);
// Find a meme by pk ❌
router.get('/:id', memeCtrl.findMemeById);
// Update a meme by pk ❌
router.put('/:id', multer, memeCtrl.updateMeme);
// Delete a meme by pk ❌
router.delete('/:id', memeCtrl.deleteMeme);
// Get all memes from a user ✅
router.get('/', memeCtrl.getAllMeme);

module.exports = router