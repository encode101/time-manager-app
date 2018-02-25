var UtilityService = timeManager.factory('UtilityService', function($http, $q){
	
	let utility = {};

	/* Get Default Client List */

	utility.getClientList = function(){
		 return $q(function(resolve, reject){
			$http.get('http://localhost:3000/clients').then(function(clientList){
				resolve(clientList);
			})
		})
	}

	/* Get Default Project List */

	utility.getProjectList = function(clientId){
		 return $q(function(resolve, reject){
			$http.get('http://localhost:3000/projects?clientId='+clientId).then(function(projectList){
				resolve(projectList);
			})
		})
	}

	return utility;
})