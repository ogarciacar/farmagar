var db = require('../db');
var sha1 = require('../sha1sum');

exports.all = function (done) {
    
    db.get().sort('inventory:products', "alpha", function (err, items) {
        
        done(err, items.map( function (item) {
            var product = JSON.parse(item);    
            return product;
        }));
    });
};

exports.savePurchase = function ( purchase ) {
    
    purchase.products.map(function (product) {
        
        product.purchases = [{
            supplier: purchase.supplierName,
            invoiceNumber: purchase.invoiceNumber,
            invoiceDate: purchase.invoiceDate,
            qty: product.qty,
            register: purchase.register,
            registrationDate: Date.now()
        }];
        
        db.get().multi();
        
        db.get().hget('inventory:search', product.name, function (err, index) {
    
            if (index) { // exists
                db.get().lindex('inventory:products', index, function (err, p) {
                    var toUpdate = JSON.parse(p);
                    toUpdate.qty += product.qty;
                    toUpdate.expirationDate = product.expirationDate;
                    toUpdate.cost = product.cost;
                    toUpdate.price = product.price;
                    toUpdate.purchases = product.purchases.concat(toUpdate.purchases);
                    db.get().lset('inventory:products', index, JSON.stringify(toUpdate));
                });
            } else {
                product.serialNumber = sha1.sha1sum(product.name);
                db.get().rpush('inventory:products', JSON.stringify(product));
                db.get().llen('inventory:products', function(err, length) {
                    db.get().hset('inventory:search', product.name, (length-1));
                });        
            }        
        });
        
        db.get().exec(function (err, result) {
            //console.log(result);
        });
        
    });
    
    var messageData = { 
        invoiceNumber: purchase.invoiceNumber, 
        supplierName: purchase.supplierName
    };
    
    return messageData; 
};