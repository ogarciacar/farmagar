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
                stock.phraseToSearch = '';
                
                stock.more = false;
                
                this.showProducts = function() {
                    stock.lowerLimit = 0;
                    stock.upperLimit = 25;
                    
                    var urlToLoad = '/products/'+stock.lowerLimit+'/'+ stock.upperLimit; 
                    
                    $http.get(urlToLoad).success( function ( data ) {
                        stock.totalToSell = 0;
                        stock.totalExpenses = 0;
                        stock.products = data;
                        if (data.length < 25) stock.more = false;
                        else stock.more = true;
                    });    
                };
                
                this.showMore = function () {
                    
                    stock.lowerLimit += 25;
                    stock.upperLimit += 25;
                    
                    var urlToLoad = '/products/'+stock.lowerLimit+'/'+ stock.upperLimit; 
                    
                    $http.get(urlToLoad).success( function ( data ) {
                        stock.totalToSell = 0;
                        stock.totalExpenses = 0;
                        
                        if (data.length > 0)
                        stock.products = stock.products.concat(data);
                        
                        if (data.length < 25) stock.more = false;
                        else stock.more = true;
                    });
                };
                
                this.addToTotal = function (product) {
                    stock.totalToSell += product.qty * product.price;
                    stock.totalExpenses += product.qty * product.cost;
                    return product.name;
                };
                
                this.search = function (text) {
                    if (text.length > 1) {
                        stock.more = false;
                        $http.get('/search/'+text).success( function ( data ) {
                            stock.totalToSell = 0;
                            stock.totalExpenses = 0;
                            stock.products = data;
                        });
                    } else {
                        this.showProducts();                        
                    }
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
    
    app.directive('updateName', function () {
        return {
            restrict: 'E',
            templateUrl: 'update-name.html',
            controller: [ '$http', function($http) {
                
                var update = this;
                update.mustClose = false;
                
                this.isSafeUpdate = function (currentName, newName) {
                    return newName && currentName != newName.toUpperCase() && newName.length > 0 && !update.mustClose;
                };
                
                this.updateName = function (product, newName, reloadProductsCallback, listener) {
                    var updateRequest = { newName: newName.toUpperCase(), product: product};
                    $http({
                        method: 'POST',
                        url: '/update',
                        data: updateRequest
                    }).then( function(response) {
                        
                        update.newName = '';
                        
                        update.feedback = 'El producto con nombre ' 
                            + response.data['changedName'] + ' fue cambiado exitosamente a ' + response.data['newName'];
                        
                        product.name = newName.toUpperCase();
                        update.mustClose = true;
                        var modalId = '#updateName'+listener; 
                        $(modalId).on('hidden.bs.modal', function (e) {
                            reloadProductsCallback();    
                        })
                        
                    }, function(response) {
                        console.log("ERR");
                    });
                };
            }],
            controllerAs: 'updateNameCtrl'
        };
    });
    
})();