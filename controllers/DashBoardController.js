var DashBoardController = timeManager.controller('DashBoardController', function($scope, $filter, LoginService, $location, UtilityService, TaskService){

	$scope.task = {
		taskDate: new Date()
		/*startDate: null;
		endDate:  new Date(),
		taskDate: new Date()*/
	}

	$scope.hours = [];
	$scope.endHours  =[];
	$scope.minutes = [];


	$scope.dateObj = {
		hours: "",
		minutes: "",
		seconds: ""
	}

	var _loopDate = function(hours){
		let hourName = hours+ " AM"
			if(hours >= 12){
				hourName = hours-12+ " PM";
				if(hours == 12){
					hourName = hours+ " PM";
				}
			}
			else if(hours == 0){
				hourName = "00 AM";
			}
			return hourName
		}

	var _populateDateFields = function(){
		for(var hours = 0; hours <= 23; hours++){
			var hourName = _loopDate(hours)
			$scope.hours.push({'hourName': hourName, 'hourValue': hours});
		}			
	}


	$scope.updateEndTime = function(){
		$scope.endHours = [];
		for(var hours = $scope.task.startDate; hours <= 24; hours++){
			if(hours == 24){
				return $scope.endHours.push({'hourName': "00 AM", 'hourValue': 24});
			};
			var hourName = _loopDate(hours)

			$scope.endHours.push({'hourName': hourName, 'hourValue': hours});
		}
	}

	_populateDateFields();

	$scope.clientId = "";

	UtilityService.getClientList()
	.then(function(data){
		$scope.clientList = data.data;
		if($scope.clientList.length == 0){
				return;
			}
		$scope.task.clientId = $scope.clientList[0].id;
		$scope.task.clientName = $scope.clientList[0].name;
		$scope.updateProjectList();
	}, function(err){
		console.log(err)
	});
	
	var getUTCDate = function(selectedDate, moment){		
		return Date.parse(selectedDate, moment);
	}
	
	$scope.updateDateObj = function(moment){
		/*let momentDate = $scope.task[moment];
		$scope.task[moment] = getUTCDate(momentDate, moment);*/
	}

	$scope.updateProjectList = function(){
		UtilityService.getProjectList($scope.task.clientId)
		.then(function(data){
			$scope.projectList = data.data;
			if($scope.projectList.length == 0){
				return;
			}
			/*$scope.task.projectName = $scope.projectList[0].id;
			$scope.task.selectedProjectName = $scope.projectList[0].projectName;*/

			/* Check client Name From Client List */
			$scope.clientList.map(item =>{
				if(item.id == $scope.task.clientId){
					$scope.task.clientName = item.name;
				}
			})
		}, function(err){
			console.log(err);
		});
	}

	$scope.updateSelectedProject = function(){
		$scope.projectList.map(item => {
			if(item.id == $scope.task.projectName){
				$scope.task.selectedProjectName = item.projectName;
				$scope.task.projectId = item.id;
				$scope.task.clientName = item.clientName;
			}
		})
	}

	$scope.createTask = function(){
		TaskService.getTimeLogged($scope.task.projectId)
			.then(function(timeLogged){
				alert($scope.task.timeTaken)
				if($scope.task.timeTaken !== undefined || $scope.task.timeTaken !== null){
					$scope.task.timeTaken = ($scope.task.endDate-$scope.task.startDate) + $scope.task.billableTime;	
				} else{
					$scope.task.timeTaken = 0;
				}
				
				TaskService.createTask($scope.task).
				then(function(data){
					$scope.getTaskList();
					return false;
				}, function(err){
					console.log("err");
			})
		});	
	}

	$scope.getTaskList = function(){
		TaskService.getTaskList().
		then(function(data){
			$scope.taskList = data.data;
		}, function(err){
			console.log("err");
		})
	}
	$scope.getTaskList()
})
.directive('sayHello', function(){
	return {
		template: "sddsd"
	}
})