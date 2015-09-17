( function () {
    
    var app = angular.module('sells', [ ]);
    
    app.controller('SellsController', [ '$http', function($http) {
        
        var store = this;
        
        store.sells = [ ];
        
        store.totalSold = 0;
        
        $http.get('/sells').success( function ( data ) {
            store.sells = data;
        });
        
        this.addToTotal = function (sell) {
            store.totalSold += sell.total;
            return sell.sellDate;
        };
    }]);
    
})();