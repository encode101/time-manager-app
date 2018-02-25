var LoginController = timeManager.controller('LoginController', function($scope, LoginService, $location){
	$scope.loginEmailId = 'admin@admin.com';
	$scope.password = 'admin';
	
	$scope.handelLogin = function(){
		if(LoginService.logIn($scope.loginEmailId, $scope.password)){
			$location.path('dashboard');
		} else{
			alert("Invalid user")
		}
	}
});