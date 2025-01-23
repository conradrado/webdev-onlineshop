const db = require("../data/database");
const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

class User {
  constructor(email, password, name, address) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.address = address;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 14);

    const result = await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  async getUserWithEmail() {
    const result = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });
    return result;
  }

  static async getUserWithUid(uid) {

    const result = await db
      .getDb()
      .collection("users")
      .findOne(
        {_id: mongodb.ObjectId.createFromHexString(uid) },{projection: {password : 0}}
       // 두번째 매개변수에서는 가져오려 하는 필드를 제한할 수 있다 (-1 => exclude)
      );
    return result;
  }

  async existAlready() {
    const existingUser = await this.getUserWithEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  async checkPassword(hashedPassword) {
    return await bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
