'use strict';
var app = angular.module('nuSkinApp', ['ui.router'])
//Declare all your project constants here
.constant('CUSTOMER_CARE_NUMBER', '1-999-999-9999')
//Declare all your project configurations here
app.config(function($stateProvider, $urlRouterProvider){
$stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'modules/accounts/login/login.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'modules/accounts/signup/signup.html'
        });

    $urlRouterProvider.otherwise('/login');
});

//Run method
app.run(function(){

});