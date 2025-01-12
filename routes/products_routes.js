const express = require('express');
const productController = require('../controllers/product_controller');
const router = express.Router();

router.get('/products', productController.getAllProducts);

router.get('/products/:id', productController.getProductDetail);

module.exports = router;