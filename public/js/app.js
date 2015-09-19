( function () {
    
    var app = angular.module('farmagar', [ 'stock', 'purchase', 'sales' ]);
    
    app.controller("PageController", function() {
        
        this.view = 1;
        
        this.selectView = function (setView) {
            this.view = setView;
        };
        
        this.isSelected = function (checkView) {
            return this.view === checkView;
        };
    });
    
})();