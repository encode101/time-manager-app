var TaskService = timeManager.factory('TaskService', function($http, $q){
	
	let task = {};

	task.createTask = function(taskObj){
		 return $q(function(resolve, reject){
			$http.post('http://localhost:3000/tasks', taskObj).then(function(taskList){
				$http.patch('http://localhost:3000/projects/'+taskObj.projectName, 
					{'billableTime': taskObj.timeTaken || 0}).then(function(projectObj){
					resolve(projectObj);
					resolve(taskList);
				})
				
			})
		})
	}

	task.getTimeLogged = function(id){
		return $q(function(resolve, reject){
			$http.get('http://localhost:3000/projects/'+id).then(function(timeLogged){
				resolve(timeLogged.data);				
			})
		})
	}

	task.getTaskList = function(){
		 return $q(function(resolve, reject){
			$http.get('http://localhost:3000/tasks?_sort=taskDate&_order=desc')
			.then(function(taskList){
				resolve(taskList);
			})
		})
	}

	return task;
})