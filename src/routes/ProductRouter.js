const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authAdminMiddleware } = require("../middleware/authMiddleware");

router.post('/createProduct', authAdminMiddleware, ProductController.createProduct);
router.delete('/deleteProduct/:id', authAdminMiddleware, ProductController.deleteProduct);
router.put('/updateProduct/:id', authAdminMiddleware, ProductController.updateProduct);
router.get('/getActiveProductDetails/:id', ProductController.getActiveProductDetails);
router.get('/getProductDetails/:id', ProductController.getProductDetails);
router.get('/getAllProducts', ProductController.getAllProducts);
router.put('/updateActiveMultipleProducts/', authAdminMiddleware, ProductController.updateActiveMultipleProducts);
router.get('/getAllProductTypes', ProductController.getAllProductTypes);

module.exports = router;