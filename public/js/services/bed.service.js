angular.module('bedService', [])
	// each function returns a promise object 
	.factory('Beds', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/beds');
			},
			create : function(bedData) {
				return $http.post('/api/beds', bedData);
			},
			delete : function(id) {
				return $http.delete('/api/beds/' + id);
			}
		};
	}]);
