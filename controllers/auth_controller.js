const userModel = require("../models/user_model");
const authUtil = require("../util/auth_util");
const validUtil = require("../util/valid_util");
const sessionFlash = require("../util/errorflash_util");
const session = require("express-session");

function getSignup(req, res) {
  let inputData = sessionFlash.getSessionInput(req);

  if (!inputData) {
    inputData = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      address: "",
    };
  }
  res.render("customer/auth/signup", { inputData: inputData });
}

async function signup(req, res) {
  const inputData = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    name: req.body.name,
    address: req.body.address,
  };

  const user = new userModel(
    req.body.email,
    req.body.password,
    req.body.confirmPassword,
    req.body.name,
    req.body.address
  );

  if (
    !validUtil(
      req.body.email,
      req.body.confirmPassword,
      req.body.password,
      req.body.name,
      req.body.address
    )
  ) {
    sessionFlash.errorFlash(
      req,
      {
        errorMessage: "check your values!",
        ...inputData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  if (await user.existAlready()) {
    sessionFlash.errorFlash(
      req,
      {
        errorMessage: "user is already existing!",
        ...inputData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  await user.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
  let inputData = sessionFlash.getSessionInput(req);
  if (!inputData) {
    inputData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: inputData });
}

async function login(req, res) {
  const sessionInputData = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = new userModel(req.body.email, req.body.password);

  let existingUser;
  try {
    existingUser = await user.getUserWithEmail();
  } catch (error) {
    next(error);
  }

  if (!existingUser) {
    sessionFlash.errorFlash(
      req,
      {
        errorMessage: "User not found!",
        ...sessionInputData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  const passwordCorrect = await user.checkPassword(existingUser.password);
  if (!passwordCorrect) {
    sessionFlash.errorFlash(
      req,
      {
        errorMessage: "Check yo password",
        ...sessionInputData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/products");
  });
}

function logout(req, res) {
  authUtil.destroyAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  logout: logout,
};
