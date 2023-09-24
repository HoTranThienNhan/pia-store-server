const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authAdminMiddleware } = require("../middleware/authMiddleware");

router.post('/createProduct', ProductController.createProduct);
router.delete('/deleteProduct/:id', authAdminMiddleware, ProductController.deleteProduct);
router.put('/updateProduct/:id', authAdminMiddleware, ProductController.updateProduct);
router.get('/getProductDetails/:id', ProductController.getProductDetails);
router.get('/getAllProducts', ProductController.getAllProducts);

module.exports = router;