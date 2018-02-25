var ClientService = timeManager.factory('ClientService', function($q, $http){
	
	let client = {};

	var _createProject = function(projectObj){
		return $q(function(resolve, reject){
			$http.post('http://localhost:3000/projects', projectObj ).then(function(project){
				resolve(project);
			})
		})
	}

	client.createClient = function(clientObj){	
		 return $q(function(resolve, reject){
			$http.post('http://localhost:3000/clients', clientObj).then(function(clientList){
				var projectObj = {
					clientId: clientList.data.id,
					clientName: clientList.data.clientName,
					projectName: clientList.data.projectName,
					billableTime: 0
				}
				_createProject(projectObj).then(function(){
					resolve(clientList);
				})
			})
		})
	}

	client.getClient = function(){
		 return $q(function(resolve, reject){
			$http.get('http://localhost:3000/clients')
			.then(function(clientList){
				resolve(clientList);
			})
		})
	}

	return client;
})