const db = require("../data/database");
const bcrypt = require("bcryptjs");

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
