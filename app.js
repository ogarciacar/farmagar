var express = require('express');
var	cookieParser = require('cookie-parser');
var	session	= require('express-session');
var app = express();
var bodyParser = require('body-parser');	
var parseUrlencoded = bodyParser.urlencoded({ extended: true }); // for parsing       application/x-www-form-urlencoded
var sha1 = require('./sha1sum');
var db = require('./db');
var products = require('./models/product');
var sales = require('./models/sale');

var auth = require('./middleware/authentication');


app.use(bodyParser.json()); // for parsing application/json

app.use(cookieParser('cool secret session'));
app.use(session({
        secret: '1234567890QWERTY',
        cookie: { httpOnly: false }
    }));

app.use(auth.authenticated);

app.use(express.static('public'));

app.get('/products', function(request, response) {
    products.all(function (err, items) {
        response.json(items);
    });
});

app.get('/search/:phraseToSearch', function(request, response) {
    
    var phraseToSearch = request.params.phraseToSearch;
    
    if (!phraseToSearch) phraseToSearch = request.query.term;
    
    products.search(phraseToSearch, function (err, items) {
        response.json(items);
    });
});

app.get('/search', function(request, response) {
    
    var phraseToSearch = request.query.term;
    
    products.search(phraseToSearch, function (err, items) {
        response.json(items.map(function (product) {
            return product.name;
        }));
    });
});


app.get('/sales/:since/:until', function(request, response) {
    
    var since = request.params.since;
    
    var until = request.params.until;
    
    sales.salesReport(since, until, function (err, salesReport) {
        response.json(salesReport);
    });
});

app.post('/sale', parseUrlencoded, function(request, response) {
    
    var sale = request.body;
    
    sales.saveSale(sale, request.session.user.username);
    
    response.status(201).json("OK");
});

app.post('/purchases', parseUrlencoded, function(request, response) {
    
    var purchase = request.body;
    
    var messageData = products.savePurchase(purchase, request.session.user.username);
    
    response.status(201).json(messageData);
});

app.post('/login', parseUrlencoded, function(request, response) {
    
    var tryToLogin = request.body;
    
    if (auth.auth(tryToLogin.username, tryToLogin.password, request.session)) {
        response.json(request.session.user);
    } else {
        response.status(401).json("Usuario/contraseña inválido");
    }
});

app.get('/whoami', function(request, response) {
    response.json(request.session.user);
});

app.get('/logout', function(request, response) {
    request.session.user = null;
    response.json(request.session.user);
});

db.connect();

app.listen(3000, function () {
    console.log('Listening on port 3000');
});