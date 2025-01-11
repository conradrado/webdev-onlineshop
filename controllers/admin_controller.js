const Product = require('../models/product_model');

// DB에 저장된 모든 상품들을 fetch 하는 컨트롤러 메소드
async function getProducts(req, res){
    const products = await Product.findAll();
    res.render('admin/products/all-products', {products: products});

}

// 상품을 새로 생성하기 위해 생성 페이지를 렌더링 하는 컨트롤러 함수
function getNewProduct(req, res){
    res.render('admin/products/new-product');
}

// 상품 생성 페이로부터 새 상품을 생성 할 때 해당 상품을 DB에 저장하는 컨트롤러 메소드
async function createNewProduct(req, res, next){
    const product = new Product({
        ...req.body,
        image: req.file.filename // 여기서 이미지는 요청의 파일 객체의 filename임.
    }); 
    
    try{
        await product.save(); // 객체의 속성들을 DB에 저장
    }
    catch(error){
        next(error); // 저장 실패 시, 에러 핸들링 미들웨어로 에러 전송후 리턴.
        return;
    }

    res.redirect('/admin/products');
}

// 이미 생성되어 DB에 존재하는 상품을 조회할 때 사용하는 컨트롤러 메소드.
async function getOneProduct(req, res, next){
    try{
        const product = await Product.findById(req.params.id); // 요청의 ID를 통해 DB에 존재하는 해당 상품에 접근.
        res.render('admin/products/update-product', {product: product}); 
    }
    catch(error){
        next(error);
        return;
    }
}

async function postProduct(req, res, next){
    const product = new Product({
        ...req.body,
        _id: req.params.id
    });


    if(req.file){
        product.replaceImage(req.file.filename);
    }
    try{
        
        await product.save();
    }
    catch(error){
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

async function deleteProduct(req, res, next){
    try{
        const product = await Product.findById(req.params.id);
        await product.remove();
    }
    catch (error){
        next(error);
        return;
    }

    //res.redirect('/admin/products'); <-- 기본적으로 프론트엔드에서는 리다이렉션을 지원하지 않음. 그 대신 res.json객체를 반환
    res.json();
}

module.exports = {
    getProducts: getProducts,
    getNewProduct:getNewProduct,
    createNewProduct, createNewProduct,
    getOneProduct: getOneProduct,
    postProduct: postProduct,
    deleteProduct: deleteProduct
}