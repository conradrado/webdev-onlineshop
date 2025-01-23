const db = require("../data/database");
const mongodb = require("mongodb");

class Order {
  // status의 세가지 형태 (pending, fulfilled, cancelled)
  constructor(productData, userData, status = "pending", date, id) {
    this.productData = productData;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
   this.id = id;
  }

// 하나의 order Document를 Order 객체로 생성시켜주는 메소드
  static transformIntoObject(orderDoc) {
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  // order document array를 order object array로 바꾸어주는 메소드 
  static transformIntoObjectArray(orderDocs) {
    return orderDocs.map(this.transformIntoObject);
  }

  static async findAll() {
    const orders = await db.getDb().collection("orders").find().toArray();
    return this.transformIntoObjectArray(orders);
  }

  static async findAllForUser(uid) {
    const userId = mongodb.ObjectId.createFromHexString(uid);

    const userOrders = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": userId })
      .sort({ _id: -1 })
      .toArray();

      return this.transformIntoObjectArray(userOrders);
  }

  static async findById(oid){
    const order = db.getDb().collection('orders').find({_id : mongodb.ObjectId.createFromHexString(oid)});
    return this.transformIntoObject(order); // 단일 order document를 단일 order Object로 변환
}

  async saveOrder() {
    if (this.id) {
        return await db.getDb().collection('orders').update({_id : mongodb.ObjectId.createFromHexString(this.id)},
    {$set: {status : this.status}});
    

    } else {
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(), // 해당 날짜를 생성
        status: this.status, //pending으로 초기화
      };

      return await db.getDb().collection("orders").insertOne(orderDocument);
    }
  }
}

module.exports = Order;
