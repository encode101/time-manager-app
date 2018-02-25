timeManager.config(function config($locationProvider, $routeProvider, $httpProvider){
	//$locationProvider.hashPrefix('!');
	$httpProvider.defaults.headers.patch = {
    	'Content-Type': 'application/json;charset=utf-8'
	}
	$routeProvider.when('/', {
		controller: 'LoginController',
		templateUrl:'views/loginScreen.html'
	})
	.when('/dashboard', {
		controller: 'DashBoardController',
		templateUrl:'views/dashBoard.html'
	})
	.when('/client', {
		controller: 'ClientController',
		templateUrl:'views/addClient.html'
	})
	.otherwise('views/notFound.html');
});