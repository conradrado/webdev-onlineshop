function errorHandle(error, req, res, next){ // error 매개변수가 전달되지 않으면, 이 에러 핸들링 미들웨어는 실행되지 않음.
    console.log(error);
    if(error.code = 404){
        return res.status(404).render('shared/404');
    }
    return res.status(500).render('shared/500');
}

module.exports = errorHandle;