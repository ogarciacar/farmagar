( function () {
    
    var app = angular.module('sales', []);
    
    app.directive('salesReport', function () {
        return {
            restrict: 'E',
            templateUrl: 'sales-report.html',
            controller: [ '$http', function($http) {
                
            function rep () {
                report.totalSales = 0;
                var str = report.since.split("/");
                var d1 = new Date(str[2], str[1]-1, str[0]);
                d1.setHours(0, 0, 0, 0);
                
                str = report.until.split("/");
                var d2 = new Date(str[2], str[1]-1, str[0]);
                d2.setHours(23, 59, 59, 999);
                
                $http.get('/sales/'+d1.valueOf()+'/'+d2.valueOf()).success( function ( data ) {
                    report.sales = data;
                });
            
            }
                
            $( "#since" ).datepicker({  dateFormat: "dd/mm/yy", 
                                                        showOtherMonths: true,
                                                        selectOtherMonths: true, 
                                                        changeMonth: true,
                                                        changeYear: true,
                                                        minDate: new Date(2015, 9, 1),
                                                        maxDate: 0,
                                                        monthNamesShort: [  "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
                                                                            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
                                                        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
                                                        onSelect: function(selectedDate, dpObject) {
                                                            report.since = selectedDate;
                                                            rep();
                                                        },
                                                        onClose: function( selectedDate ) {
                                                            $( "#until" ).datepicker( "option", "minDate", selectedDate );
                                                        }
                                                     });
            var start = new Date();
            start.setHours(0,0,0,0);
            $( "#since" ).datepicker("setDate", start);
            $( "#until" ).datepicker({   dateFormat: "dd/mm/yy", 
                                                            showOtherMonths: true,
                                                            selectOtherMonths: true, 
                                                            changeMonth: true,
                                                            changeYear: true,
                                                            minDate: new Date(2015, 9, 1),
                                                            maxDate: 0,
                                                            monthNamesShort: [  "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
                                                                            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
                                                            dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
                                                            onSelect: function(selectedDate, dpObject) {
                                                                report.until = selectedDate;
                                                                rep();                                                            
                                                            },
                                                            onClose: function( selectedDate ) {
                                                                $( "#since" ).datepicker( "option", "maxDate", selectedDate );
                                                            }
                                                        });
        
                
                $( "#until" ).datepicker("setDate", new Date());
                
                var report = this;
                
                report.sales = [ ];
        
                report.totalSales = 0;
        
                
                report.since = $("#since").val();
                
                report.until = $("#until").val();
                
                this.addToTotal = function (sale) {
                    report.totalSales += sale.amount;
                    return sale.date;
                };
        
                this.salesReport = function () {
                    rep();
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