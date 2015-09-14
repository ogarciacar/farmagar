( function () {
    
    var app = angular.module('store', [ ]);
    
    app.controller('StoreController', [ '$http', function($http) {
        
        var store = this;
        
        store.products = [ ];
        
        $http.get('/products').success( function ( data ) {
            store.products = data;
        });
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