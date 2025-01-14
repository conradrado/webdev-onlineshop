const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart_controller');

router.get('/', cartController.getCart);

router.post('/items', cartController.addCartItem);



module.exports = router;