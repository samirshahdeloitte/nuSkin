(function() {
	'use strict';

	angular
		.module('nuSkinApp')
		.factory('MemoryCache', function($cacheFactory) {
			return $cacheFactory('memoryCache');
		})
});