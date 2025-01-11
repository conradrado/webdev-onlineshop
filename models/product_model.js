const mongodb = require("mongodb");
const db = require("../data/database");

// 상품 클래스
class Product {
  // 생성자 
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; // 앞에 +를 붙임으로써 숫자 전환.
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData(); // image값을 받아서, imagePath와 imageUrl을 설정.
    if (productData._id) { // 요청에 _id값이 있다면, 즉. 이미 DB에 존재한다면.
      this.id = productData._id.toString();
    } else {
      this.id = null;
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  static async findById(productId) {
    let prodId;
    try{
      prodId = mongodb.ObjectId.createFromHexString(productId);
    }
    catch (error){
      error.code = 404;
      throw error;
    }

    const product = await db.getDb().collection('products').findOne({_id: prodId});
    
    if(!product){
      const error = new Error('This product is not in our database!');
      throw error;
    }

    return new Product(product);
  }

  updateImageData() {
    this.imagePath = `product/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    // this.id가 존재 = 이미 DB에 존재.
    if (this.id) {
     
      const prodId = new mongodb.ObjectId(this.id);

      if (!this.image){ // req로 들어오는 image가 존재하지 않음. 즉 이미지를 덮어쓰지 않음.
        delete productData.image; // image 키 쌍 자체를 delete하여 덮어쓰기를 미연에 방지
      }

      await db.getDb().collection('products').updateOne({_id: prodId}, {$set : productData});
    }
    else{
      await db.getDb().collection('products').insertOne(productData);
    }
  }


  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }
}

module.exports = Product;
