'use strict';

angular.module('myApp', ['ngAnimate'])
	.controller('WeatherController', function($scope, $http) {
		$scope.$watch('city', function() {
			fetch();
			addToRecent($scope.city);
		});
			
	$scope.city = 'Kamloops';
	
	$scope.presets = ["Vancouver", "Calgary", "Edmonton", "Regina", "Winnipeg", "Toronto", "Victoria", "Montreal", "Quebec City"];
	
	$scope.recentSearches = [];
		
	function addToRecent(city) {
		if ($scope.recentSearches.indexOf(city) === -1 && $scope.city != '' && $scope.city !== null) {
			$scope.recentSearches.push(city);
			if ($scope.recentSearches.length > 5) {
				$scope.recentSearches.splice(0, 1);
			}
		}
	}
		
	function fetch() {
		$scope.error = false;
		if ($scope.city == '' || $scope.city === null) {
			$scope.error = true;
		}
		$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $scope.city + ",CA&cnt=16&mode=json&units=metric&APPID=1ae28c1aff5030e36f9e541fd6c02940")
		.then(function(response) { $scope.days = response.data; },
		function() { $scope.error = true }
	)};
	
	$scope.fetch = fetch;
	
	$scope.select = function(){
		this.setSelectionRange(0, this.value.length);
	}	
})
	.component('daysComponent', {
		bindings: {
			data: '='
		},
		controller: function ($scope) {
			this.daysDisplayed = 5;
			this.daysStartIndex = 0;
			this.showMore = null;
			this.paginate = function(direction) {
				this.daysStartIndex += parseInt(direction, 10);
				this.daysStartIndex = (this.daysStartIndex <= 0 ? 0 : this.daysStartIndex);
				this.daysStartIndex = (this.daysStartIndex >= (this.data.list.length -1) ? (this.data.list.length -5) : this.daysStartIndex);
			}
		},
		templateUrl: 'partials/daysComponent.html'
	});