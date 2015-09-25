var db = require('../db')
var sha1 = require('../sha1sum');

var products = [ ]; /*
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
            price: 25.71,
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
            price: 18.4,
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
            price: 12.9,
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
        },
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
        }
    ];
*/
exports.all = function (done) {
    
    db.get().sort('inventory:products', "alpha", function (err, items) {
        
        done(err, items.map( function (item) {
            var product = JSON.parse(item);    
            return product;
        }));
    });
};

exports.saveProduct = function (product) {
    
    
};

exports.savePurchase = function ( purchase ) {
    
    /*var purchaseDetails = {
        supplier: purchase.supplierName,
        invoiceNumber: purchase.invoiceNumber,
        invoiceDate: purchase.invoiceDate,
        register: purchase.register,
        registrationDate: Date.now()
    };*/
        
    
    purchase.products.map(function (product) {
        
        product.purchases = [{
            supplier: purchase.supplierName,
            invoiceNumber: purchase.invoiceNumber,
            invoiceDate: purchase.invoiceDate,
            qty: product.qty,
            register: purchase.register,
            registrationDate: Date.now()
        }];
        
        
        product.serialNumber = sha1.sha1sum(product.name);
    
        db.get().hget('inventory:search', product.name, function (err, index) {
    
            if (index) { // exists
                db.get().lindex('inventory:products', index, function (err, p) {
                    var toUpdate = JSON.parse(p);
                    toUpdate.qty += product.qty;
                    toUpdate.expirationDate = product.expirationDate;
                    toUpdate.purchases = product.purchases.concat(toUpdate.purchases);
                    db.get().lset('inventory:products', index, JSON.stringify(toUpdate));
                });
            } else {
                db.get().rpush('inventory:products', JSON.stringify(product));
                db.get().llen('inventory:products', function(err, length) {
                    db.get().hset('inventory:search', product.name, (length-1));
                });        
            }        
        });
        
    });
    
    var messageData = { 
        invoiceNumber: purchase.invoiceNumber, 
        supplierName: purchase.supplierName
    };
    
    return messageData; 
};