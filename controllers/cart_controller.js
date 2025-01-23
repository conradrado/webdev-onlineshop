const Cart = require('../models/cart_model');
const Product = require('../models/product_model');

async function addCartItem(req, res, next){
    let product;
    try{
        product = await Product.findById(req.body.productId); // addCart 버튼을 누르면 POST 요청 -> 수신 값은 params이 아닌 body(본문)에 포함됨.
    }
    catch (error){
        next(error);
        return;
    }

    const cart = res.locals.cart; // locals cart 변수 할당.
    cart.addItem(product); // 해당 product를 바탕으로 locals 변수 업데이트
    req.session.cart = cart; // locals cart 변수를 세션 스토어 cart 변수에 할당(업데이트) 

    res.status(201).json({
        message:'Cart updated',
        newTotalItems: cart.totalQuantity
    });
}

function getCart(req, res){
    res.render('customer/cart/cart');
}

function updateCartItem(req, res){
    const cart =  res.locals.cart;
    const updatedItemData = cart.updateItem(req.body.productId, +req.body.quantity);
    req.session.cart = cart;

    res.json({
        updatedQuantity: cart.totalQuantity,
        updatedPrice : cart.totalPrice,
        updatedItemPrice : updatedItemData.updatedItemPrice
    });
}

module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCart: updateCartItem
}