const stripe = require("stripe")(
  "my API KEY"
)
const Order = require("../models/order_model");
const User = require("../models/user_model");

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", { orders: orders });
  } catch (error) {
    return next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userData;
  console.log(res.locals.uid);
  try {
    userData = await User.getUserWithUid(res.locals.uid);
  } catch (error) {
    return next(error);
  }
  console.log(userData);

  const order = new Order(cart, userData);
  try {
    await order.saveOrder();
  } catch (error) {
    return next(error);
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price,
        },
        quantity: +item.quantity,
      }
    }),
    mode: "payment",
    success_url: "http://localhost:3000/orders/success",
    cancel_url: `http://localhost:3000/orders/canscel`,
  });

  res.redirect(303, session.url);
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}

function getCanceled(req, res) {
  res.render("customer/orders/cancel");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getCanceled: getCanceled,
};
