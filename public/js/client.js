( function () {
    
    var app = angular.module('store', [ ]);
    
    app.controller('StoreController', [ '$http', function($http) {
        
        var store = this;
        
        store.products = [ ];
        
        store.totalToSell = 0;
        
        store.totalExpenses = 0;
        
        $http.get('/products').success( function ( data ) {
            store.products = data;
        });
        
        this.addToTotal = function (product) {
            store.totalToSell += product.qty * product.price;
            store.totalExpenses += product.qty * product.cost;
            return product.name;
        };
    }]);
    
    app.controller('SaleController', [ '$http', function($http) {
        
        var sale = this;
        
        this.total = function (price) {
            
            if (sale.qty > 0 && !sale.discount) { // there is qty and there is not discount
                return price*sale.qty;
            } else if (sale.qty > 0 && sale.discount > 0) {
                var t = price*sale.qty;
                return t - ((t*sale.discount)/100.0);
            } else {
                return 0.0;
            }
        };
        
        this.isSafeSell = function (qty) {
            return sale.qty > 0 && sale.qty <= qty ;
        };
        
        this.saveSale = function (product) {
            var tx = {
                product: product.name,
                qty: sale.qty,
                seller: 'orlando.garcia@gmail.com',
                date: Date.now(),
                amount: sale.total(product.price),
                discount: sale.discount
            };
            
            $http({
                method: 'POST',
                url: '/sale',
                data: tx
            }).then(function(response) {
                sale.feedback = "Venta registrada exitosamente!";
                product.qty -= sale.qty;
                sale.qty = undefined;
                sale.discount = undefined;
            }, function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    }]);
    
    app.controller('ProductRowController', function () {
        
        this.isSoldOut = function (quantity) { // a product is saleable if it is notsold out
            return quantity <= 0;
        };
        
        this.isExpired = function (expirationDate) { // a product is saleable if it is not expired
            return (expirationDate > 0) && (expirationDate < Date.now());
        };
        
        this.daysToExpire = function (expirationDate) { // it says how many days are between two days
            
            var diff = expirationDate - Date.now();
            var aDay = 1000 * 3600 * 24;
            return Math.ceil(diff/aDay);
        };
        
        this.isNearToExpire = function (expirationDate) { // a product is near to expire if its expiration date is less or equal to 90 days
            
            var daysToExpire = this.daysToExpire(expirationDate);
            
            return daysToExpire > 0 && daysToExpire <= 90;
        };
    });    
})();