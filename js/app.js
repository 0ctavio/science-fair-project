//Declaración de la aplicación

var app = angular.module('scienceFair', ['ngRoute', 'ngStorage']);

//Rutas
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl:'views/home.html',
		controller: 'HomeViewController'
	})
	.when('/map',{
		templateUrl:'views/fair-map.html',
		controller: 'MapViewController'
	})
	.when('/login', {
		templateUrl:'views/login.html',
		controller: 'LoginViewController'
	})
	.when('/register', {
		templateUrl:'views/register.html',
		controller: 'RegisterViewController'
	})
	.when('/stand', {
		templateUrl:'views/stand.html',
		controller: "StandViewController"
	})
	.when('/stand/:name',{
		templateUrl:'views/stand.html',
		controller:'StandViewController'
	})
	.when('/contact',{
		templateUrl:'views/formPage.html',
		controller:'standViewController'
	})
	.otherwise({ 
		redirectTo: '/'
	})
}]);

app.controller('HomeViewController', ['$scope', function ($scope) {

	$scope.appTitle = 'Science Fair';
}]);


app.controller('MapViewController', ['$http', '$scope', function ($http, $scope) {
	$http.get("js/enterprises.json").success (function (data){
		$scope.stands = data;
		console.log($scope.stands);
	});
}]);

app.controller('StandViewController', ['$scope','$http','$routeParams', function ($scope,$http,$routeParams) {
	$scope.name = $routeParams.name;
	$http.get("js/enterprises.json").success(function(data){
		$scope.stands = data;
	})
}]);

// app.controller('LoginViewController', [function ($scope, $localStorage) {
// 	$scope.save = function() {
// 		$localStorage.message = "Hello World";
// 	}

// 	$scope.load = function() {
// 		$scope.data = $localStorage.message;
// 	}
// }]);

app.controller('LoginViewController', ["$scope", "$localStorage","$sessionStorage", "$location", function ($scope, $localStorage,$sessionStorage, $location) {
	if ($sessionStorage.currentUser) {
			$location.path("/map");
		}

	$scope.error =  false;
	$scope.check = function () {

		$scope.stand = $localStorage.stand;
		if($scope.stand){
			if($scope.stand[$scope.standName]){
				if ($scope.stand[$scope.standName].username == $scope.username 
					&& $scope.stand[$scope.standName].password==$scope.password) {

					$sessionStorage.currentUser = $scope.stand[$scope.standName].username;
					$location.path("/map");
			}else{
				$scope.message = "¡Ups! Usuario o password incorrectos";
				$scope.error = true;
			}
		}
		else {
			$scope.message = "Stand no existe.";
			$scope.error = true;
		}
	}
}
}]);

app.controller('RegisterViewController', ["$scope", "$localStorage", "$location", "$sessionStorage", function ($scope, $localStorage, $location, $sessionStorage) {
	if ($sessionStorage.currentUser) {
		$location.path("/map");
	}

	$scope.save = function() {
		$scope.error =  false;

		var stands = $localStorage.stand || {};
		var obj = {};
		obj["username"] = $scope.stand.username;
		obj["password"] = $scope.stand.password;
		obj["standNumber"]= $scope.stand.standNumber;
		obj["standName"]= $scope.stand.standName;
		obj["standImage"]= $scope.stand.standImage;
		obj["standWho"]= $scope.stand.standWho;
		obj["standWhat"]= $scope.stand.standWhat;
		obj["standWeb"]= $scope.stand.standWeb;
		obj["standEmail"]= $scope.stand.standEmail;

		if (!stands [obj.standName]) {
			stands[obj.standName] = obj;
			$localStorage.stand = stands;
			$location.path("/login");
		}else {
			$scope.message = "¡Ups! El stand ya existe, por favor, inténtalo de nuevo con otro nombre. ";
			$scope.error = true;
		}

	}

}]);


//directiva para controlar botones de navegación
app.directive( 'goClick', function ( $location ) {
	return function ( scope, element, attrs ) {
		var path;

		attrs.$observe( 'goClick', function (val) {
			path = val;
		});

		element.bind( 'click', function () {
			scope.$apply( function () {
				$location.path( path );
			});
		});
	};
});


//cambiar imagen de fondo
app.directive('backImg', function(){
	return function(scope, element, attrs){
		var url = attrs.backImg;
		element.css({
			'background-image': 'url(' + url +')',
			'background-size' : 'inherit',
			'background-repeat' : 'no-repeat'
		});
	};
});



//app.controller('LoginViewController', [function ($location, AuthenticationService, FlashService) {
	// var vm = this;
	// vm.login = login;
	// (function initController() {
 //            // reset login status
 //            AuthenticationService.ClearCredentials();
 //    })();

 //    function login() {
 //    	vm.dataLoading = true;
 //    	AuthenticationService.Login(vm.username, vm.password, function (response) {
 //    		if (response.success) {
 //    			AuthenticationService.SetCredentials(vm.username, vm.password);
 //    			$location.path('/');
 //    		} else {
 //    			FlashService.Error(response.message);
 //    			vm.dataLoading = false;
 //    		}
 //    	});
 //    };
//}]);