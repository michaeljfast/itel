'use strict';

angular.module('myApp', [])
	.controller('WeatherController', function($scope, $http) {
		$scope.$watch('city', function() {
			fetch();
		});
	
	$scope.city = 'Kamloops';
	
	function fetch() {
		$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $scope.city + ",CA&cnt=16&mode=json&units=metric&APPID=1ae28c1aff5030e36f9e541fd6c02940")
		.then(function(response) { $scope.days = response.data; });
	}
	
	$scope.select = function(){
		this.setSelectionRange(0, this.value.length);
	}
})
	.component('daysComponent', {
		bindings: {
			data: '=',
		},
		controller: function () {
			this.daysDisplayed = 5;
			this.daysStartIndex = 0;
			this.paginate = function(direction) {
				this.daysStartIndex += parseInt(direction, 10);
				this.daysStartIndex = (this.daysStartIndex <= 0 ? 0 : this.daysStartIndex);
				this.daysStartIndex = (this.daysStartIndex >= (this.data.list.length -1) ? (this.data.list.length -5) : this.daysStartIndex);
			}
		},
		templateUrl: 'partials/daysComponent.html'
	});