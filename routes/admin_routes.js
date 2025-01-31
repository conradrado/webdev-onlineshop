const express = require('express');
const fileUploadMiddleware = require('../middleware/image-upload');
const adminController = require('../controllers/admin_controller');


const router = express.Router();

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', fileUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getOneProduct);

router.post('/products/:id', fileUploadMiddleware, adminController.postProduct);

router.delete('/products/:id', adminController.deleteProduct);

router.get('/orders', adminController.getOrders);

//router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;