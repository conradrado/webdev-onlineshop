function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.isAdmin = user.isAdmin;
  req.session.save(action); // 세션에 정보를 저장한 후, 매개변수로 들어오는 action 함수를 실행
}

function destroyAuthSession(req) {
  req.session.uid = null;
}
module.exports = {
  createUserSession: createUserSession,
  destroyAuthSession: destroyAuthSession,
};
