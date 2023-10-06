const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authAdminMiddleware } = require("../middleware/authMiddleware");

router.post('/createProduct', ProductController.createProduct);
router.delete('/deleteProduct/:id', ProductController.deleteProduct);
router.put('/updateProduct/:id', ProductController.updateProduct);
router.get('/getActiveProductDetails/:id', ProductController.getActiveProductDetails);
router.get('/getProductDetails/:id', ProductController.getProductDetails);
router.get('/getAllProducts', ProductController.getAllProducts);
router.put('/updateActiveMultipleProducts/', ProductController.updateActiveMultipleProducts);
router.get('/getAllProductTypes', ProductController.getAllProductTypes);

module.exports = router;