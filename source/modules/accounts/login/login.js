(function() {

	'use strict';

	angular
		.module('app.login')
		.controller('Login', Login);

	/* @ngInject */
	function Login (
		$scope,
		$rootScope,
		MemoryCache,
		$http,
		$location,
		SharedDataSvc,
		$timeout,
		$cookieStore
	) {
		/*jshint validthis: true */
		var login = this;

		///////////

    	login.showLoginError = false;
    	login.showReset = false;
		login.loginError = '';
		login.viewLoading = false;
		login.globalmessage = SharedDataSvc.globalmessage;
		login.globalmessageShow = SharedDataSvc.globalmessageShow;
		login.enter = enter;

		/**
		 * TODO:
		 * - Hook up to actual authentication service
		 */
		function enter () {
			if (!login.passphrase) {
		        console.log("[Login.enter] No user or pass entered. passphrase: " + login.passphrase);
		        login.showLoginError = true;
		        return;
      		}
      		login.showLoginError = false;
			$scope.viewLoading = true;
      		authentication.loginUser(login.passphrase).then(
        
	        	function success(data) {
	          		console.log("[Login.enter] success: ", data);
			  		MemoryCache.removeAll();

					getStoreInfoFactory.getData()
					.then(function(data) {
						SharedDataSvc.globalVars.storeSetup = data;
						console.log("[Login.enter] store setup: ", data);
						$cookieStore.put('auth_timeout', null);
						modalService.lock(false);
						$scope.viewLoading = false;
						$location.path('/dashboard');
					}, function(data) {
						$scope.showenterstoreError = true;
						angular.forEach(data.processingErrors, function(value, key) {
							this.push(key + ': ' + value);
						}, SharedDataSvc.globalmessage);
						$scope.viewLoading = false;
						//this.globalmessageShow = true;
						login.passphrase = '';
						MemoryCache.removeAll();
					});
	        	},

	        	function fail(data) {
		          	console.log("[Login.enter.fail] ", data);
		          	$scope.viewLoading = false;
		          	login.showLoginError = true;
			      	login.passphrase = '';
				  	MemoryCache.removeAll();
	        	});
		};
	}
})();