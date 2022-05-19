const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


// Create a new User
router.post("/signup",multer, userCtrl.signup);
// Login a user ✅
router.post("/login", userCtrl.login);
// Retrieve all Users ✅
router.get("/", auth, userCtrl.findAll);
// Retrieve all Users with theirs memes
router.get("/", auth, userCtrl.findAllWithMeme);
// Retrieve all admin's User ✅
router.get("/admin", auth, userCtrl.findAllAdmin);
// Retrieve a single User with id ✅
router.get("/:id", auth, userCtrl.getOneUser);
// Update a user ✅
router.put("/:id", auth, userCtrl.update);
// Delete a User with id ✅
router.delete("/:id", auth, userCtrl.delete);
module.exports = router;

