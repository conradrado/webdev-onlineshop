function isEmpty(value) {
  return !value || value.trim() === "";
}

function passwordMatch(password, confirmPassword) {
  return password === confirmPassword;
}

function userValidation(email, password, confirmPassword, name, address) {
  return (
    !isEmpty(email) &&
    email.includes("@") &&
    !isEmpty(password) &&
    !isEmpty(confirmPassword) &&
    !isEmpty(name) &&
    !isEmpty(address) &&
    passwordMatch(password, confirmPassword)
  );
}
module.exports = userValidation;
