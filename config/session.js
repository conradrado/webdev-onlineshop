const expressSession = require('express-session'); // 세션 제공자 모듈
const mongoDbStore = require('connect-mongodb-session'); // MongoDB에 세션 스토어를 사용하기 위해 모듈 require

// 세션 스토어를 생성하는 함수
function createSessionStore(){
    const MongoDBStore = mongoDbStore(expressSession); // 세션을 매개변수로 받아 세션 스토어 생성 및 MongoDBStore 함수에 할당.

    const store = new MongoDBStore({
        uri: "mongodb://localhost:27017",
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store;
}

function createSessionConfig(){
    return {
        secret : "axhacZCf",
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000
        }
    };
}

module.exports = {
    createSessionConfig: createSessionConfig,
}