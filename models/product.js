var db = require('../db');
var sha1 = require('../sha1sum');

exports.all = function (done) {
    
    db.get().sort('inventory:products', "alpha", function (err, items) {
        
        done(err, items.map( function (item) {
            var product = JSON.parse(item);
            if (product.expirationDate === '') {
                product.expirationDate = 'No expira';
            }
            return product;
        }));
    });
};



exports.search = function (prhaseToSearch, done) {
    
    var matchCriteria = '*' + prhaseToSearch.toUpperCase() + '*';
    
    var stream = db.get().hscanStream('inventory:search', { match: matchCriteria});
    
    stream.on('data', function (resultKeys) {
        
        if (resultKeys.length === 0) done (null, resultKeys);
        
        var indexes = [];
        
        for (var i = 1; i < resultKeys.length; i = i+2) {
            indexes.push(resultKeys[i]);
        }
        
        function loadProduct(index, cb) {
            db.get().lindex('inventory:products', index, function (err, res) {
                var product = JSON.parse(res);
                if (product.expirationDate === '') {
                    product.expirationDate = 'No expira';
                }
                cb(null, product);
            });
        }
        
        var products = [];
        
        function productLoaded(err, product) {
            products.push(product);
            if (products.length === indexes.length) {
                done(null, products);
            }
        }

        
        indexes.map(function (index) {
            
            loadProduct(index, productLoaded);
        });  
    });
};

exports.savePurchase = function ( purchase, username ) {
    
    purchase.products.map(function (product) {
        
        product.purchases = [{
            supplier: purchase.supplierName,
            invoiceNumber: purchase.invoiceNumber,
            invoiceDate: purchase.invoiceDate,
            qty: product.qty,
            register: username,
            registrationDate: Date.now()
        }];
        
        db.get().multi();
        
        db.get().hget('inventory:search', product.name, function (err, index) {
    
            if (index) { // exists
                db.get().lindex('inventory:products', index, function (err, p) {
                    var toUpdate = JSON.parse(p);
                    toUpdate.qty += product.qty;
                    if (product.expirationDate === '' || toUpdate.expirationDate === '' || 
                        toUpdate.expirationDate > product.expirationDate) toUpdate.expirationDate = product.expirationDate;
                    if (toUpdate.cost < product.cost) toUpdate.cost = product.cost;
                    if (toUpdate.price < product.price) toUpdate.price = product.price;
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

exports.updateProductName = function ( product, newName ) {
    
    db.get().hget('inventory:search', product.name, function (err, index) {
    
        db.get().lindex('inventory:products', index, function (err, p) {
            
            var toUpdate = JSON.parse(p);
            
            toUpdate.name = newName;
            
            db.get().lset('inventory:products', index, JSON.stringify(toUpdate));
            
            db.get().hdel('inventory:search', product.name);
            
            db.get().hset('inventory:search', newName, index);
        });       
    });
    
    return { 
        changedName : product.name,
        newName : newName
    };    
};