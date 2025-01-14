class Cart{
    constructor(items = [], totalQuantity = 0, totalPrice = 0){ // items 항목은 비워놔도 상관없음음
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    addItem(product){
        // Cart 객체의 items 항목에 들어갈 cartItem의 초기값.
        const cartItem = {
            product: product, // 해당 상품의 nested된 정보들을 할당.
            quantity: 1, // 해당 상품의 초기 개수 값은 1으로 설정.
            totalPrice : product.price // 해당 상품의 가격
        }

        // product 매개변수로 들어온 상품이 Cart 객체 내에 존재하는지 for문으로 iterate 하면서 체크
        for(let i = 0; i < this.items.length; i++){
            const item = this.items[i];
            if (item.product.id === product.id){ // Cart 객체 내에서 product 매개변수와 동일한 상품이 존재할 경우.
                cartItem.quantity = item.quantity + 1; // cartItem 의 개수 1 증가
                cartItem.totalPrice = item.totalPrice + product.price;  //  cartItem의 totalPrice = totalPrice + product.price
                this.items[i] = cartItem; // 업데이트된 cartItem을 해당 인덱스에 삽입함. 

                this.totalPrice += product.price; // 장바구니 총 가격을 업데이트
                this.totalQuantity++; // 장바구니 총 개수를 업데이트
                return; // 리턴
            }
        }
        // 해당 product가 장바구니 안에 존재하지 않을 경우.
        this.items.push(cartItem); // 초기값으로 설정된 cartItem을 Cart 객체의 items 항목에 push
        // 장바구니의 총 가격과 총 개수를 업데이트.
        this.totalPrice += product.price;
        this.totalQuantity++;
    }


}

module.exports = Cart;
