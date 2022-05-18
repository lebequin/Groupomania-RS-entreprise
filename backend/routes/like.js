const express = require('express');
const router = express.Router();


const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

// like a meme ✅
router.post('/', auth, likeCtrl.likeMeme);
// get list of most liked meme ✅
router.get('/', auth, likeCtrl.getNumberLikeOnMeme);


module.exports = router