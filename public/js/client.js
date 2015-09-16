( function () {
    
    var app = angular.module('store', [ ]);
    
    app.controller('StoreController', [ '$http', function($http) {
        
        var store = this;
        
        store.products = [ ];
        
        $http.get('/products').success( function ( data ) {
            store.products = data;
        });
    }]);
    
    app.controller('SellController', [ '$http', function($http) {
        
        var sell = this;
        
        this.total = function (price) {
            
            if (sell.qty > 0 && !sell.discount) { // there is qty and there is not discount
                return price*sell.qty;
            } else if (sell.qty > 0 && sell.discount > 0) {
                var t = price*sell.qty;
                return t - ((t*sell.discount)/100.0);
            } else {
                return 0.0;
            }
        };
        
        this.isSafeSell = function (qty) {
            return sell.qty > 0 && sell.qty <= qty ;
        };
        
        this.saveSell = function (product) {
            var tx = {
                productSold: product.name,
                qtySold: sell.qty,
                seller: 'orlando.garcia@gmail.com',
                sellDate: Date.now(),
                total: sell.total(product.price),
                discount: sell.discount
            };
            
            $http({
                method: 'POST',
                url: '/sell',
                data: tx
            }).then(function(response) {
                sell.feedback = "Venta registrada exitosamente!";
                product.qty -= sell.qty;
                sell.qty = undefined;
                sell.discount = undefined;
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