angular.module('bedController', [])

	// inject the Bed service factory into controller
	.controller('bedController', ['$scope','$http','Beds', function($scope, $http, Beds) {
		$scope.formData = {};
		$scope.selectedPlants = [];
		$scope.loading = true;

		// when landing on the page, get all beds and show them
		// use the service to get all the beds
		Beds.get()
			.success(function(data) {
				$scope.beds = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createBed = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			//if ($scope.formData.text != undefined) {
				$scope.savingBed = true;

				$scope.formData.plants = $scope.selectedPlants;
				// call the create function from the service (returns a promise object)
				Beds.create($scope.formData)

					// if successful creation, call the get function to get all of the new beds
					.success(function(data) {
						$scope.savingBed = false;
						$scope.formData = {};
						$scope.selectedPlants = [];
						$('.form-plants').find('input[type=checkbox]:checked').removeAttr('checked');
						console.log("Beds.create.success: " + JSON.stringify(data));
						$scope.beds = data; // assign the new list of beds
					})
					.error(function(data) {
						$scope.savingBed = false;
						//console.log("Beds.create.error: " + JSON.stringify(data));
					});
		};

		// DELETE ==================================================================
		// delete a bed after checking it
		$scope.deleteBed = function(id) {
			$scope.loading = true;

			Beds.delete(id)
				// if successful deletion, call the get function to get all the new beds
				.success(function(data) {
					$scope.loading = false;
					$scope.beds = data; // assign the new list of beds
					console.log("Beds.delete.success: " + JSON.stringify(data));
				});
		};
		$scope.setSelectedPlants = function(id) {
			$scope.selectedPlants.push(id);
		};
	}]);
//Not in use for now and needs to be completed, but might be used later to shrink the plant images to fit the bed
function setPlantImageSize() {
	$(".beds").each(function() {
		console.log("Bed image count: " + $(this).children("img").length);
	});
}
