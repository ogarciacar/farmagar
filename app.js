var express = require('express');
var app = express();
var bodyParser = require('body-parser');	
var parseUrlencoded = bodyParser.urlencoded({ extended: true }); // for parsing       application/x-www-form-urlencoded

app.use(bodyParser.json()); // for parsing application/json

app.use(express.static('public'));

var sells = [];

var products = [ 
        {
            name: "ANTIFLUDES X 100 CAPS",
            cost: 0.74,
            qty: 0,
            price: 2.94,
            expirationDate: 1451538000000,
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 42,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                },
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "335490",
                    invoiceDate: 1432270800000,
                    qty: 8,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                },
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "300190",
                    invoiceDate: 1423890000000,
                    qty: 50,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                }
            ]
        }, 
        {
            name: "ALIN GOTAS OFTÁLMICAS 5 ML",
            cost: 6.8,
            qty: 2,
            price: 11.7,
            expirationDate: 1447563600000,
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 2,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                }
            ]
        },
        {
            name: "ANARA GOTAS 20 ML",
            cost: 5.35,
            qty: 1,
            price: 9.2,
            expirationDate: 1441903576166,
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 1,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                }
            ]
        },
        {
            name: "GITRASEK X 12 CAPSULAS",
            cost: 1.2,
            qty: 24,
            price: 2.07,
            expirationDate: 1448341200000,
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 10,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                },
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "335490",
                    invoiceDate: 1432270800000,
                    qty: 14,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                }
            ]
        },
        {
            name: "KOPTIN SUSPENSION 22.5 ML",
            cost: 13.95,
            qty: 1,
            price: 23.99,
            expirationDate: 1456290000000,
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 1,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                }
            ]
        },
        {
            name: "KOPTIN X 3 TABLETAS",
            cost: 14.95,
            qty: 3,
            price: 8.57,
            expirationDate: 1450155600000,
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 3,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                }
            ]
        },
        {
            name: "TROFERIT X 15 TABLETAS",
            cost: 10.7,
            qty: 15,
            price: 1.23,
            expirationDate: 1449464400000,
            purchases : [
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 10,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                },
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "335490",
                    invoiceDate: 1432270800000,
                    qty: 5,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                }
            ]
        },
        {
            name: "BICARBONATO DE SODIO X 50",
            cost: 7.5,
            qty: 50,
            price: 0.21,
            expirationDate: "",
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 10,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                },
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "335490",
                    invoiceDate: 1432270800000,
                    qty: 14,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                },
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "300190",
                    invoiceDate: 1423890000000,
                    qty: 26,
                    register: 'orlando.garcia@gmail.com',
                    registrationDate: 1442416429531
                }
            ]
        }/*,
        {
            name: "COLECTOR DE ORINA PEDIATRICO",
            cost: 0.4,
            qty: 12,
            price: 0.52,
            expirationDate: "",
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 12
                }
            ]
        },
        {
            name: "ATERMIN JARABE 120 ML",
            cost: 2.39,
            qty: 3,
            price: 4.11,
            expirationDate: 1485752400000,
            purchases : [
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 3
                }
            ]
        },
        {
            name: "HALCORT CREMA TOPICA X 15 GR",
            cost: 5.45,
            qty: 2,
            price: 9.37,
            expirationDate: "",
            purchases : [
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "355690",
                    invoiceDate: 1438923600000,
                    qty: 2
                }
            ]
        },
        {
            name: "RUIBARBO Y SODIO 240 ML",
            cost: 2.18,
            qty: 3,
            price: 3.74,
            expirationDate: "",
            purchases : [
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "300190",
                    invoiceDate: 1432270800000,
                    qty: 3
                }
            ]
        }*/
    ];

app.get('/products', function(request, response) {
    response.json(products);
});

app.get('/sells', function(request, response) {
    response.json(sells);
});

app.post('/sell', parseUrlencoded, function(request, response) {
    
    var sell = request.body;
    
    for (var i = 0; i < products.length; i++) { // applies inventory discounts to the product amount
        var product = products[i];
        if (sell.productSold == product.name) {
            product.qty -= sell.qtySold;
            break;
        }
    }
    
    sells.unshift(sell); // stores the new sell
    
    response.status(201).json("OK");
});

app.post('/purchases', parseUrlencoded, function(request, response) {
    
    var purchase = request.body;
    
    purchase.products.map(function (p) {
        
        var purchaseDetails = {
                    supplier: purchase.supplierName,
                    invoiceNumber: purchase.invoiceNumber,
                    invoiceDate: purchase.invoiceDate,
                    qty: p.qty,
                    register: purchase.register,
                    registrationDate:purchase.registrationDate
                };
        
        var isNew = true;
        
        for (var i = 0; i < products.length; i++) {
                
            var product = products[i];
            
            if (p.name == product.name) {  // update existing product
                
                product.purchases.unshift(purchaseDetails);
                product.qty += p.qty;
                isNew = false;
                break;
            }
        }
        
        if (isNew) {    // adds a new product
            p.purchases = [purchaseDetails];
            products.push(p);
        }
    });
    
    var messageData = { 
        invoiceNumber: purchase.invoiceNumber, 
        supplierName: purchase.supplierName
    };
    response.status(201).json(messageData);
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});