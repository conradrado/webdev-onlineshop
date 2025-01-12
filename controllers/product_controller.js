const db = require("../data/database");
const Product = require("../models/product_model");

async function getAllProducts(req, res) {
  try {
      const products = await Product.findAll();
      res.render("customer/products/all-products", {products : products});
  } catch (error) {
    next(error);
  }

}


module.exports = {
    getAllProducts: getAllProducts,
}