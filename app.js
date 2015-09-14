var express = require('express');
var app = express();

app.use(express.static('public'));


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
                    qty: 42
                },
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "335490",
                    invoiceDate: 1432270800000,
                    qty: 8
                },
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "300190",
                    invoiceDate: 1423890000000,
                    qty: 50
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
                    qty: 2
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
                    qty: 1
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
                    qty: 10
                },
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "335490",
                    invoiceDate: 1432270800000,
                    qty: 14
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
                    qty: 1
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
                    qty: 3
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
                    qty: 10
                },
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "335490",
                    invoiceDate: 1432270800000,
                    qty: 5
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
                    qty: 10
                },
                {
                    supplier: "SERVICIO NACIONAL DE VENTAS, S.A (SENAVEN)",
                    invoiceNumber: "335490",
                    invoiceDate: 1432270800000,
                    qty: 14
                },
                {
                    supplier: "IMPORTADORA UNIVERSAL, S.A",
                    invoiceNumber: "300190",
                    invoiceDate: 1423890000000,
                    qty: 26
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

app.get('/products', function(request, response) {
    response.json(products);
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});