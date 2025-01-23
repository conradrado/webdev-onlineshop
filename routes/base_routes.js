const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.redirect('/products');
});

router.get('/401', function(req, res){
    res.render('shared/401');
});

router.get('/403', function(req, res){
    res.render('shared/403');
});

router.get('/404', function(req, res){
    res.render('shared/404');
});

router.get('/success', function(req, res){
    res.render('shared/success');
});

router.get('/cancel', function(req, res){
    res.render('shared/cancel');
})


module.exports = router;