const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart');

router.get('/cart', cartController.getIndex);
router.post('/cart-del', cartController.postDeleteProductInCart);

module.exports = router;