const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authAdminMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post('/signup', UserController.createUser);
router.post('/signin', UserController.signinUser);
router.post('/signout', UserController.signoutUser);
router.put('/updateUser/:id', UserController.updateUser);
router.delete('/deleteUser/:id', authAdminMiddleware, UserController.deleteUser);
router.get('/getAllUsers', authAdminMiddleware, UserController.getAllUsers);
router.get('/getUserDetails/:id', authUserMiddleware, UserController.getUserDetails);

router.post('/refreshToken', UserController.refreshToken);

module.exports = router