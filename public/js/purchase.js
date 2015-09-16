( function () {
    
    var app = angular.module('purchase', [ ]);
    
    app.controller('PurchaseController', [ '$http', function($http) {
        
        var message = this;
        message.feedback = '';
        
        this.product = {};
        this.feedback = undefined;
        this.purchase = {
            register: 'orlando.garcia@gmail.com',
            registrationDate: Date.now(),
            products: []
        };
        
        this.addProduct = function ( product ) {
            product.expirationDate = this.product.expirationDate.valueOf();
            this.purchase.products.unshift(product);
            this.product = {};
        };
        
        this.savePurchase = function ( ) {
            
            this.purchase.invoiceDate = this.purchase.invoiceDate.valueOf();
            
            $http({
                method: 'POST',
                url: '/purchases',
                data: this.purchase
            }).then(function(response) {
                message.feedback = response.data;
                
            }, function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
            
            this.purchase = {
                products: []
            };
            
            
        }; 
        
    } ] );
    
})();