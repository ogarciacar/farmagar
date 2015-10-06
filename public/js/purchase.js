( function () {
    
    var app = angular.module('purchase', [ ]);
    
    app.directive('purchaseForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'purchase-form.html',
            controller: [ '$http', function($http) {
        
        var message = this;
        message.feedback = '';
        
        this.purchase = {
            
            products: []
        };
        
        this.product = {};
                
        this.initForm = function () {
            message.feedback = '';
            this.product = {};
            this.purchase = {
                products: []
            };
        };        
        
        this.addProduct = function ( product ) {
            product.expirationDate = (this.product.expirationDate) ? this.product.expirationDate.valueOf() : '';
            product.name = product.name.toUpperCase();
            this.purchase.products.unshift(product);
            this.product = {};
        };
        
        this.removeProduct = function ( productIndex ) {
            this.purchase.products.splice(productIndex, 1);
        };

        this.isValid = function ( p ) {
            return p.name && p.qty > 0 && p.cost > 0 && p.price > 0;
        };
        
        this.isValidInvoice = function () {
            return this.purchase.supplierName && this.purchase.invoiceNumber && this.purchase.invoiceDate;
        };
        
        this.savePurchase = function () {
            
            if (this.purchase.products.length > 0) {
                this.purchase.invoiceDate = this.purchase.invoiceDate.valueOf();
                this.purchase.supplierName = this.purchase.supplierName.toUpperCase();
                this.purchase.invoiceNumber = this.purchase.invoiceNumber.toUpperCase();
            
                $http({
                    method: 'POST',
                    url: '/purchases',
                    data: this.purchase
                }).then(function(response) {
                    message.feedback = "La compra a " + response.data['supplierName'] 
                        + " con factura # " + response.data['invoiceNumber']  + " ha sido guardada exitósamente!";
                
                    this.initForm();
                }, function(response) {
                   message.error = 'No se pudo completar la operación debido a que no hay conexión con el sistema.'
                   + ' Por favor verifique su conexión  e intente de nuevo.';
                });
            
                
            }
            
        }; 
        
    } ] ,            
            controllerAs: 'purchaseCtrl'
        };
    });
    
    
})();