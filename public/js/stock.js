( function () {
    
    var app = angular.module('stock', [ ]);
    
    app.directive('stock', function () {
        return {
            restrict: 'E',
            templateUrl: 'stock.html'
        };
    });
    
    
    app.directive('productStock', function () {
        return {
            restrict: 'E',
            templateUrl: 'products.html',
            controller: [ '$http', function($http) {
            
                var stock = this;
                stock.products = [ ];
                stock.totalToSell = 0;
                stock.totalExpenses = 0;
        
                this.showProducts = function() {
                    $http.get('/products').success( function ( data ) {
                        stock.totalToSell = 0;
                        stock.totalExpenses = 0;
                        stock.products = data;
                    });    
                };
        
                this.addToTotal = function (product) {
                    stock.totalToSell += product.qty * product.price;
                    stock.totalExpenses += product.qty * product.cost;
                    return product.name;
                };
            }],
            controllerAs: 'stock'
        };
    });
    
    app.directive('productItem', function () {
        return {
            restrict: 'A',
            templateUrl: 'product-item.html',
            controller: function () {
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
            },
            controllerAs: 'item'
        };
    });
    
})();