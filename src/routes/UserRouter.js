const express = require("express")
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authMiddleware } = require("../middleware/authMiddleware")

router.post('/signup', UserController.createUser)
router.post('/signin', UserController.signinUser)
router.put('/updateUser/:id', UserController.updateUser)
router.delete('/deleteUser/:id', authMiddleware, UserController.deleteUser)
router.get('/getAllUsers', authMiddleware, UserController.getAllUsers)

module.exports = router