var db = require('../db');

exports.saveSale = function (sale, username) {
    
    db.get().multi();
    
    db.get().hget('inventory:search', sale.product, function (err, index) {
        if (index) { // exists
            
            db.get().lindex('inventory:products', index, function (err, p) {
                var toUpdate = JSON.parse(p);
                toUpdate.qty -= sale.qty;
                db.get().lset('inventory:products', index, JSON.stringify(toUpdate));
                
                sale.date = Date.now();
                sale.seller = username;
                var toStore = JSON.stringify(sale);
                db.get().zadd('product:sales', sale.date, toStore);
            });
            
        } else {
            console.log("it should send and error");
        }
    });
    
    db.get().exec(function (err, result) {
        //console.log(result);
    });
};

exports.salesReport = function (since, until, done) {
    db.get().zrevrangebyscore('product:sales', until, since, function(err, sales) {
        done (err, sales.map( function (sale) {
            return JSON.parse(sale);
        }));
    });
};