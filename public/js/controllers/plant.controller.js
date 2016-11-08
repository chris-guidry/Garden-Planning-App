angular.module('plantController', [])

	.controller('plantController', ['$scope','$http','Plants', function($scope, $http, Plants) {
		$scope.formData = {};
		$scope.loading = true;

		Plants.get()
			.success(function(data) {
				$scope.plants = data;
				$scope.loading = false;
			});
	}]);