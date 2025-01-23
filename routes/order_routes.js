const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orders_controller');

router.get('/', orderController.getOrders);

router.post('/', orderController.addOrder);

router.get('/success', orderController.getSuccess);

router.get('/cancel', orderController.getCanceled);


module.exports = router;