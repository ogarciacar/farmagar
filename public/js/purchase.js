( function () {
    
    var app = angular.module('purchase', [ ]);
    
    app.directive('purchaseForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'purchase-form.html',
            controller: [ '$http', function($http) {
            
            $( "#productAutocomplete" ).autocomplete({
                source: '/search/',
                minLength: 2,
                select: function( event, ui ) {
                    localScope.product.name = ui.item.value;
                }
            });
            
            $( "#datepickerInvoiceDate" ).datepicker({  dateFormat: "dd/mm/yy", 
                                                        showOtherMonths: true,
                                                        selectOtherMonths: true, 
                                                        changeMonth: true,
                                                        changeYear: true,
                                                        maxDate: 0,
                                                        monthNamesShort: [  "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
                                                                            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
                                                        onSelect: function(selectedDate, dpObject) {
                                                            localScope.purchase.invoiceDate = selectedDate;    
                                                        }
                                                     });
            
            $( "#datepickerExpirationDate" ).datepicker({   dateFormat: "dd/mm/yy", 
                                                            showOtherMonths: true,
                                                            selectOtherMonths: true, 
                                                            changeMonth: true,
                                                            changeYear: true,
                                                            minDate: +30,
                                                            monthNames: [   "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
                                                                            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
                                                            onSelect: function(selectedDate, dpObject) {
                                                                localScope.product.expirationDate = selectedDate;    
                                                            }
                                                        });
        
            
            
                
                
        
        var localScope = this;
                
        localScope.feedback = '';
        
        localScope.purchase = {
            
            products: []
        };
        
        localScope.product = {};
                
        this.initForm = function () {
            localScope.feedback = '';
            localScope.product = {};
            localScope.purchase = {
                products: []
            };

            
        };        
        
        this.addProduct = function ( product ) {
            if (localScope.product.expirationDate) {
                var date = product.expirationDate.split("/");
                product.expirationDate = new Date(date[2], date[1]-1, date[0]).valueOf();
            } else {
                product.expirationDate = '';
            }
            
            product.name = product.name.toUpperCase();
            localScope.purchase.products.unshift(product);
            localScope.product = {};
            $( "#datepickerExpirationDate" ).val('');
        };
        
        this.removeProduct = function ( productIndex ) {
            localScope.purchase.products.splice(productIndex, 1);
        };

        this.isValid = function ( p ) {
            return p.name && p.qty > 0 && p.cost > 0 && p.price > 0;
        };
        
        this.isValidInvoice = function () {
            return localScope.purchase.supplierName && localScope.purchase.invoiceNumber && localScope.purchase.invoiceDate;
        };
        
        this.savePurchase = function () {
            
            if (localScope.purchase.products.length > 0) {
                var date = localScope.purchase.invoiceDate.split("/");
                localScope.purchase.invoiceDate = new Date(date[2], date[1]-1, date[0]).valueOf();
                localScope.purchase.supplierName = localScope.purchase.supplierName.toUpperCase();
                localScope.purchase.invoiceNumber = localScope.purchase.invoiceNumber.toUpperCase();
            
                $http({
                    method: 'POST',
                    url: '/purchases',
                    data: localScope.purchase
                }).then(function(response) {
                    localScope.feedback = "La compra a " + response.data['supplierName'] 
                        + " con factura # " + response.data['invoiceNumber']  + " ha sido guardada exitósamente!";
                    
                    localScope.product = {};
                    localScope.purchase = {
                        products: []
                    };  
                }, function(response) {
                   localScope.error = 'No se pudo completar la operación debido a que no hay conexión con el sistema.'
                   + ' Por favor verifique su conexión  e intente de nuevo.';
                });
            }
            
        }; 
        
    } ] ,            
            controllerAs: 'purchaseCtrl'
        };
    });
    
    
})();