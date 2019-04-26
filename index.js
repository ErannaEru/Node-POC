var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope){
	$scope.chapters = demoSerivces.getPersonList();

});

demoApp.factory('demoSerivces', ['$http', function ($http) {
var demoSerivces = {};
var url = "http://localhost:8044";
 
// Service to fetch all the persons detail
demoSerivces.getPersonList = function () {
    return $http.get(url + '/person/all');
}; 
