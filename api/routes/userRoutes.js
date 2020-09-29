const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');


router.post('/signUp', UserController.signUp);
// router.get('/Userid', UserController.getId);
router.get('/getAllUsers', UserController.getAllUsers);
router.post('/deleteUser', UserController.deleteUser);
module.exports = router;