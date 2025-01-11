const mongodb = require('mongodb') // 몽고 DB 모듈

const MongoClient = mongodb.MongoClient; // MongoClient -> MongoDB와 상호작용하는 도구구

let database;

// 로컬호스트 URI로 로컬호스트 DB에 접속. 해당 DB를 database에 할당.
async function connectToDatabase(){
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('online-shop');
}

// 해당 데이터베이스를 리턴, 오류 발생 시 오류 throw
function getDb(){
    if(!database){
        throw new Error('You must connect first!');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb,
}