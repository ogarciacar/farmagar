( function () {
    
    var app = angular.module('sales', []);
    
    app.directive('salesReport', function () {
        return {
            restrict: 'E',
            templateUrl: 'sales-report.html',
            controller: [ '$http', function($http) {
                
                var report = this;
                
                report.sales = [ ];
        
                report.totalSales = 0;
        
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth();
                var yyyy = today.getFullYear();
    
                report.since = new Date(yyyy, mm, dd);
                report.until = new Date();
        
                this.addToTotal = function (sale) {
                    report.totalSales += sale.amount;
                    return sale.date;
                };
        
                this.salesReport = function (s, u) {
                    
                    if (!s) report.since = new Date(yyyy, mm, dd);
                    
                    if (!u) report.until = new Date();
                    
                    report.totalSales = 0;
                    $http.get('/sales/'+report.since.valueOf()+'/'+report.until.valueOf()).success( function ( data ) {
                        report.sales = data;
                    });
                };
            }],
            
            controllerAs: 'salesCtrl'
        };
    });
    
    app.directive('saleForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'sale-form.html',
            controller: [ '$http', function($http) {
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
                };
            }],
            controllerAs: 'saleCtrl'
        };
    });
    
})();