const multer= require('multer');
const fs = require('fs');
const uuid = require('uuid').v4;

try{
    fs.readdirSync('product-data/images');
}
catch{
    console.log('Make new directory for storage');
    fs.mkdirSync('product-data/images');
}

const upload = multer({
    storage: multer.diskStorage({
        destination: "product-data/images",
        filename: function(req, file, callback){
            callback(null, uuid() + '-' + file.originalname)
        }
    })
});

const configureMulterMiddleware = upload.single('image');

module.exports = configureMulterMiddleware;