var app = angular.module('superMario',["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/gridInput.html",
        controller : "getGridInput"
    })
    .when("/playGame",{
    	templateUrl : "partials/gameSpace.html",
        controller : "formGameSpace"	
    });
});