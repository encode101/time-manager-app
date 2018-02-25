var ClientController = timeManager.controller('ClientController', function($scope, ClientService){
	$scope.addClient = {};
	
	$scope.createClient = function(){
		ClientService.createClient($scope.addClient)
		.then(function(data){
			$scope.getClient();
		}, function(err){
			console.log(err);
		});
	}

	$scope.getClient = function(){
		ClientService.getClient()
		.then(function(data){
			$scope.clientList = data.data;
		}, function(err){
			console.log(err);
		});
	}

	$scope.getClient();

});