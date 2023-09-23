const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const { authAdminMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

// user routes
router.post('/signup', UserController.createUser);
router.post('/signin', UserController.signinUser);
router.post('/signout', UserController.signoutUser);
router.put('/updateUser/:id', authUserMiddleware, UserController.updateUser);
router.delete('/deleteUser/:id', authAdminMiddleware, UserController.deleteUser);
router.get('/getAllUsers', authAdminMiddleware, UserController.getAllUsers);
router.get('/getUserDetails/:id', authUserMiddleware, UserController.getUserDetails);

// product routes
router.get('/getAllProducts', authAdminMiddleware, ProductController.getAllProducts);

// token routes
router.post('/refreshToken', UserController.refreshToken);

module.exports = router