var express = require('express');
var app = express();
var bodyParser = require('body-parser');	
var parseUrlencoded = bodyParser.urlencoded({ extended: true }); // for parsing       application/x-www-form-urlencoded
var sha1 = require('./sha1sum');
var db = require('./db');
var products = require('./models/product')


app.use(bodyParser.json()); // for parsing application/json

app.use(express.static('public'));

var sells = {};

app.get('/products', function(request, response) {

    products.all(function (err, items) {
        response.json(items);
    });
});

app.get('/sales/:since/:until', function(request, response) {
    
    var since = request.params.since;
    
    var until = request.params.until;
    
    //console.log(since + " - " + until);
    
    var salesReport = [];
    
    for (var key in sells) {
        if (key >= since && key <= until) {
            salesReport.unshift(sells[key]);
        }
    }

    response.json(salesReport);
});

app.post('/sale', parseUrlencoded, function(request, response) {
    
    var sale = request.body;
    var listProd = products.all();
    for (var i = 0; i < listProd.length; i++) { // applies inventory discounts to the product amount
        var product = listProd[i];
        if (sale.product == product.name) {
            product.qty -= sale.qty;
            break;
        }
    }
    
    sells[sale.date] = sale;
    
    response.status(201).json("OK");
});

app.post('/purchases', parseUrlencoded, function(request, response) {
    
    var purchase = request.body;
    
    var messageData = products.savePurchase(purchase);
    
    response.status(201).json(messageData);
});

db.connect();

app.listen(3000, function () {
    console.log('Listening on port 3000');
});