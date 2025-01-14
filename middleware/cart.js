const Cart = require('../models/cart_model'); //장바구니 모델 임포트

function initializeCart(req, res, next){
    let cart;

    // 세션에 카트가 존재하지 않음 ==> 유저가 장바구니 담기를 하지 않음
    if(!req.session.cart){
        cart = new Cart(); // 모델에서 매개볁수 default 값을 빈 배열으로 설정. 빈 값으로 세션 카트를 초기화화
    }
    else{ // 세션에 카트가 존재 
        const sessionCart = req.session.cart;
        cart = new Cart(sessionCart.items, sessionCart.totalQuantity, sessionCart.totalPrice); // 해당 세션의 장바구니 정보를 바탕으로 Cart 객체 생성
    }

    res.locals.cart = cart; // 해당 객체를 모든 템플릿에서 사용할 수 있도록 locals 변수로 할당.

    next(); // 다음 미들웨어로 이동.
}

module.exports = initializeCart;