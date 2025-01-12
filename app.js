const path = require('path'); 
const express = require('express'); // 익스프레스 모듈
const csrf = require('csurf'); // csrf 토큰 모듈
const addCsrfTokenMiddleware = require('./middleware/csrf-token'); // csrf 토큰 모듈을 이용한 사용자 지정 미들웨어
const errorHandler = require('./middleware/error-handler'); // 에러 핸들링을 위한 사용자 지정 미들웨어어
const checkAuthStatus = require('./middleware/authenticate'); // 인증 관련 미들웨어
const protectRoutes = require('./middleware/protect_routes');

const expressSession = require('express-session'); // 세션 사용을 위한 모듈
const app = express(); // 익스프레스 선언

const createSessionConfig = require('./config/session'); // 세션 관리 모듈
const database = require('./data/database'); // 데이터베이스 모듈
const authRoute = require('./routes/auth.routes'); // 권한 라우팅 모듈
const productRoute = require('./routes/products_routes');
const baseRoute = require('./routes/base_routes');
const adminRoute = require('./routes/admin_routes')

app.set('view engine', 'ejs'); // 템플릿(뷰) 렌더링시 ejs를 사용하도록 설정
app.set('views', path.join(__dirname, 'views')); // 템플릿(뷰)의 경로를 설정. __dirname = 프로젝트 폴더

app.use(express.static('public')) // 정적 css,자바스크립트 설정
app.use('/products/assets', express.static('product-data')); // 이미지 파일을 정적으로 제공하기 위함.

app.use(express.urlencoded({extended: false})); // url 데이터를 파싱하는 미들웨어 사용.

const sessionConfig = createSessionConfig.createSessionConfig(); // 세션 관리 모듈에서 세션 관련 설정을 한 뒤, sessionConfig에 할당.

app.use(expressSession(sessionConfig)); // 세션 설정을 바탕으로 세션 미들웨어 사용.
app.use(csrf()); // 세션 미들웨어 다음으로 csrf 토큰 미들웨어 사용.
app.use(addCsrfTokenMiddleware); // 요건 그냥 템플릿에서 csrf토큰을 좀 더 쉽게 접근하기 위해 사용하는 사용자 지정 미들웨어어
app.use(checkAuthStatus);

app.use(baseRoute);
app.use(authRoute); // 권한 라우팅 모듈을 미들웨어로 사용
app.use(productRoute);

app.use(protectRoutes);
app.use('/admin', adminRoute);


app.use(errorHandler); // 에러 핸들링 사용자 지정 미들웨어어

database.connectToDatabase().then(function(){
   app.listen('3000'); // DB에 성공적으로 연결 시, 서버 가동.
}).catch(function(error){
    console.log(error); // DB에 접근 실패시 에러메시지 출력.
});
