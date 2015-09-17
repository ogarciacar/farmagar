( function () {
    
    var app = angular.module('sales', [ ]);
    
    app.controller('SalesReportController', [ '$http', function($http) {
        
        var report = this;
        
        report.sales = [ ];
        
        report.totalSales = 0;
        
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();
    
        
        report.since = new Date(yyyy, mm, dd);
    
        report.until = new Date();//Date.now();
        
        
        
        this.addToTotal = function (sale) {
            report.totalSales += sale.amount;
            return sale.date;
        };
        
        this.salesReport = function () {
            report.totalSales = 0;
            $http.get('/sales/'+report.since.valueOf()+'/'+report.until.valueOf()).success( function ( data ) {
                report.sales = data;
            });    
        };
        
        this.salesReport();
    }]);
    
})();