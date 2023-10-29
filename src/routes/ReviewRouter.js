const express = require("express");
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.post('/createReview', ReviewController.createReview);
router.get('/getReview/:orderId&:productId&:userId', ReviewController.getReview);
router.get('/getReviewByProduct/:id', ReviewController.getReviewByProduct);

module.exports = router;