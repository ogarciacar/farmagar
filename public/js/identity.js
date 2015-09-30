( function () {
    
    var app = angular.module('identity', []);
    
    app.directive('loginForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'login-form.html',
            controller: [ '$http', function($http) {
                
                var whoami = this;
                
                whoami.user = null;
                whoami.badCredentials = null;
                
                $http({
                    method: 'get',
                    url: '/whoami'
                }).then(function(authUser) {
                    whoami.user = authUser.data;
                }, function(response) {
                    console.log(response.data);
                });
                
                this.login = function (page) {
                    
                    var tryToLogin = { username: this.username, password: this.password};
                    
                    $http({
                        method: 'POST',
                        url: '/login',
                        data: tryToLogin
                    }).then(function(authUser) {
                        whoami.user = authUser.data;
                        page.selectView(1);
                    }, function(response) {
                        whoami.badCredentials = response.data;
                    });
                    
                    whoami.username = null;
                    whoami.password = null;
                };
                
                this.initForm = function () {
                    whoami.username = null;
                    whoami.password = null;
                    whoami.badCredentials = null;
                };
                
                this.logout = function () {
                    
                    whoami.badCredentials = null;
                    
                    $http({
                        method: 'GET',
                        url: '/logout'
                    }).then(function(authUser) {
                        whoami.user = authUser.data;
                        whoami.feedback = null;
                    }, function(response) {
                        console.log(response.data);
                    });
                };
                
                this.isReadyToAuth = function () {
                    return whoami.username != null && this.password != null && (this.username === 'ventas' || this.username === 'supervisor') && this.password.length > 6;
                };
                
                this.isSalesUser = function (profile) {
                    return profile && profile === 'sales';
                };
            }],
            
            controllerAs: 'loginCtrl'
        };
    });
    
})();