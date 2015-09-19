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
        
        this.today = function () {
            var today = new Date();
            today = today.getFullYear() + '-' 
                + ( (today.getMonth()+1 >= 10) ? (today.getMonth()+1) : ('0'+(today.getMonth()+1))) 
                + '-' + today.getDate();
            return today;
        };
    });
    
})();