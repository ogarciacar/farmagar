var express = require('express');
var	cookieParser = require('cookie-parser');
var	session	= require('express-session');
var favicon = require('serve-favicon');

var app = express();
var bodyParser = require('body-parser');	
var parseUrlencoded = bodyParser.urlencoded({ extended: true }); // for parsing       application/x-www-form-urlencoded
var sha1 = require('./sha1sum');
var db = require('./db');
var products = require('./models/product');
var sales = require('./models/sale');

var auth = require('./middleware/authentication');


app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(bodyParser.json()); // for parsing application/json

app.use(cookieParser('cool secret session'));
app.use(session({
        secret: '1234567890QWERTY',
        cookie: { httpOnly: false }
    }));

app.use(auth.authenticated);

app.use(express.static('public'));

app.get('/products/:start/:stop', function(request, response) {
    var start = request.params.start;
    var stop = request.params.stop;
    products.all(start, stop, function (err, items) {
        response.json(items);
    });
});

app.get('/search/:phraseToSearch', function(request, response) {
    
    var phraseToSearch = request.params.phraseToSearch;
    
    products.search(phraseToSearch, function (err, items) {
        response.json(items);
    });
});

app.get('/suppliers', function(request, response) {
    
    var phraseToSearch = request.query.term;
    products.searchOnSuppliers(phraseToSearch, function (err, items) {
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
    
    var months = {0:"Enero", 1:"Febrero", 2:"Marzo", 3:"Abril", 4:"Mayo", 5:"Junio", 
                              6:"Julio", 7:"Agosto", 8:"Septiembre", 9:"Octubre", 10:"Noviembre", 11:"Diciembre"};
    
    sales.salesReport(since, until, function (err, salesReport) {
        
        var currentMonth = null;
        var sales = [];
        for (i = 0; i < salesReport.length; i++) {
            var d = new Date(salesReport[i].date);
            var m = months[d.getMonth()] + ' ' + d.getFullYear();
            if (currentMonth != m) {
                currentMonth = m;
                sales.push({isBreak:true, amount:0, month:currentMonth, date: new Date(d.getFullYear(), d.getMonth(), d.getDate())});
            }
            
            sales.push(salesReport[i]);
        }
        
        
        response.json(sales);
    });
});

app.post('/sale', parseUrlencoded, function(request, response) {
    
    var sale = request.body;
    
    sales.saveSale(sale, request.session.user.username);
    
    response.status(201).json("OK");
});

app.post('/update', parseUrlencoded, function(request, response) {
    
    var update = request.body;
    
    var newName = update.newName;
    
    var product = update.product;
    
    response.status(200).json(products.updateProductName(product, newName));
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
    
    /*var pur= {supplierName: 'FARMAGAR', invoiceDate: 1444626000000, invoiceNumber: '1', products: []};

    for (i = 0; i < 3000; i++) {
        pur.products.unshift({name: 'Product '+i, cost: 1, qty: 1, price: 1.72, expirationDate: '', purchases: []});
        };

    products.savePurchase(pur, 'ogarciacar');*/
});