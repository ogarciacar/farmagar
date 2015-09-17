( function () {
    
    var app = angular.module('sales', [ ]);
    
    app.controller('SalesReportController', [ '$http', function($http) {
        
        var store = this;
        
        store.sales = [ ];
        
        store.totalSales = 0;
        
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();
    
        
        store.since = new Date(yyyy, mm, dd);
    
        store.until = new Date();//Date.now();
        
        
        
        this.addToTotal = function (sell) {
            store.totalSales += sell.total;
            return sell.sellDate;
        };
        
        this.report = function () {
            store.totalSales = 0;
            $http.get('/sales/'+store.since.valueOf()+'/'+store.until.valueOf()).success( function ( data ) {
                store.sales = data;
            });    
        };
        
        this.report();
    }]);
    
})();