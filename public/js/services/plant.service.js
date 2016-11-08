angular.module('plantService', [])

	.factory('Plants', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/plants');
			}
		};
	}]);
