const express = require('express');
const router = express.Router();


const memeCtrl = require('../controllers/meme');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/', auth, memeCtrl.getAllMeme);
router.post('/',auth, multer, memeCtrl.createMeme);
router.get('/:id', auth, memeCtrl.getOneMeme);
router.put('/:id', auth, multer, memeCtrl.modifyMeme);
router.delete('/:id', auth, memeCtrl.deleteMeme);

module.exports = router