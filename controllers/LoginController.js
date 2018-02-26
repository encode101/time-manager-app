var LoginController = timeManager.controller('LoginController', function($scope, LoginService, $location){	
	$scope.handelLogin = function(){
		if(LoginService.logIn($scope.loginEmailId, $scope.password)){
			$location.path('dashboard');
		} else{
			alert("Invalid user")
		}
	}
});