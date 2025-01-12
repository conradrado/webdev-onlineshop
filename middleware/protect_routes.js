function protectRoutes(req, res, next){
    if(!res.locals.isAuth){
        return res.redirect('/401'); //401 에러는 인증이 안되었을떄 쓰이는 코드
    }

    // 요청의 주소가 /admin으로 시작할 경우에는
    if(req.path.startsWith('/admin') && !res.locals.isAdmin){
        return res.redirect('/403'); //사용자나 브라우저에게 권한이 없음을 나타내는 코드
    }

    next();
}

module.exports = protectRoutes;