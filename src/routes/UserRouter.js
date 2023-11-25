const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const { authAdminMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

// user routes
router.post('/signup', UserController.createUser);
router.post('/signin', UserController.signinUser);
router.post('/signinAdmin', UserController.signinAdminUser);
router.post('/signout', UserController.signoutUser);
router.put('/updateUser/:id', UserController.updateUser);
router.put('/updateActiveMultipleUsers/', UserController.updateActiveMultipleUsers);
router.delete('/deleteUser/:id', UserController.deleteUser);
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUserDetails/:id', UserController.getUserDetails);

// token routes
router.post('/refreshToken', UserController.refreshToken);

module.exports = router