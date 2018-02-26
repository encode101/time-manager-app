var DashBoardController = timeManager.controller('DashBoardController', function($scope, $filter, LoginService, $location, UtilityService, TaskService){
	
	/* Initializing scope variables */

	$scope.hours = [];
	$scope.endHours  =[];
	$scope.minutes = [];
	$scope.clientPresent = false;

	/* _Private Utility Function */

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

	var _populateDateFields = (function(){
		$scope.task = {
			taskDate: new Date()
		}	
		for(var hours = 0; hours <= 23; hours++){
			var hourName = _loopDate(hours)
			$scope.hours.push({'hourName': hourName, 'hourValue': hours});
		}			
	})()

	/*	Show Only Remainaing Hours Of The Day Once The Start Time Is Selected */

	$scope.updateEndTime = function(){
		$scope.endHours = [];
		for(var hours = $scope.task.startDate+1; hours <= 24; hours++){
			if(hours == 24){
				return $scope.endHours.push({'hourName': "00 AM", 'hourValue': 24});
			};
			var hourName = _loopDate(hours)
			$scope.endHours.push({'hourName': hourName, 'hourValue': hours});
		}
	}

$("#alert-target").click(function () {
    toastr["info"]("I was launched via jQuery!")
});


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

	/* Update Project List On Each Client Selection */
	
	$scope.updateProjectList = function(){
		UtilityService.getProjectList($scope.task.clientId)
		.then(function(data){
			$scope.projectList = data.data;
			if($scope.projectList.length == 0){
				return;
			}

			$scope.clientPresent = true;

			/* Check client Name From Client List */

			$scope.clientList.map(item =>{
				if(item.id == $scope.task.clientId){
					$scope.task.clientName = item.name;
				}
			});
			$scope.updateSelectedProject();
		}, function(err){
			console.log(err);
		});
	}

	$scope.updateSelectedProject = function(){
		
		/* Avoiding Unnessary Loop, While Loadin The Page*/

		if($scope.projectList.length == 0){
			return;
		}

		/* Set Scope Values Based On Selected Project */

		$scope.projectList.map(item => {
			if(item.id == $scope.task.projectName){
				$scope.task.selectedProjectName = item.projectName;
				$scope.task.projectId = item.id;
				$scope.task.clientName = item.clientName;
				$scope.task.billableTime = item.billableTime;
			}
		})
	}

	/* Service Call for Creating A Task */

	$scope.createTask = function(){
		TaskService.getTimeLogged($scope.task.projectId)
			.then(function(timeLogged){
					if($scope.task.billableTime == undefined)
						$scope.task.billableTime = 0;
					$scope.task.timeTaken = ($scope.task.endDate-$scope.task.startDate) + $scope.task.billableTime;
				TaskService.createTask($scope.task).
				then(function(data){
					$scope.getTaskList();
					$scope.updateProjectList();
					return false;
				}, function(err){
					console.log("err");
			})
		});	
	}

	/* Get The Task List For Display */

	$scope.getTaskList = function(){
		TaskService.getTaskList().
		then(function(data){
			$scope.taskList = data.data;
		}, function(err){
			console.log("err");
		})
	}

	$scope.getTaskList();

})