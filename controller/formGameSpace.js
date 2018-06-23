app.controller('formGameSpace', function($scope,$rootScope, $location, $timeout){

	//calculating width of the table
	$scope.width = 100/$rootScope.grid_columns.length;

	//Random food count
	var randomFoodCount = Math.floor(($rootScope.grid_rows.length + $rootScope.grid_columns.length) / 2);
	$scope.randomFood = [];


	//Forming food positiong
	for(var i = 0; i < randomFoodCount; i++) {
		var rowIndex = "row"+ Math.floor((Math.random() * $rootScope.grid_rows.length));
		var columnIndex = "column"+ Math.floor((Math.random() * $rootScope.grid_columns.length));
		$scope.randomFood.push(rowIndex + ":" + columnIndex);
	}
	
	//keydown event handling
	$scope.key = function($event){
		if ($event.keyCode == 38)
		    $scope.marioMove("up");
		else if ($event.keyCode == 39)
		    $scope.marioMove("right");	
		else if ($event.keyCode == 40)
		    $scope.marioMove("down");
		else if ($event.keyCode == 37)
		    $scope.marioMove("left");
	}

	
	//Moving Mario in the grid
	$scope.marioMove = function(direction){
		if(direction == 'up'){
			$scope.rowColumn =$scope.MarioPosition.split(":");
			//checking reached the border
			if($scope.rowColumn[0].substring(3) == 0){
				direction = "down";
			}else{
				//Moving mario to adjacent 
				$scope.MarioPosition = "row" + (parseInt($scope.rowColumn[0].substring(3)) - 1) + ":" + $scope.rowColumn[1];
				
				//Eat the food if it is present in that cell
				if($scope.randomFood.indexOf($scope.MarioPosition) > -1){
					$scope.randomFood.splice($scope.randomFood.indexOf($scope.MarioPosition), 1);
				}
				$scope.totalMoved += 1;
			}	
		}else if(direction == 'down'){
			$scope.rowColumn =$scope.MarioPosition.split(":");
			//checking reached the border
			if($scope.rowColumn[0].substring(3) == $rootScope.grid_rows.length - 1){
				direction = "up";
			}else{
				//Moving mario to adjacent
				$scope.MarioPosition = "row" + (parseInt($scope.rowColumn[0].substring(3)) + 1) + ":" + $scope.rowColumn[1];

				//Eat the food if it is present in that cell
				if($scope.randomFood.indexOf($scope.MarioPosition) > -1){
					$scope.randomFood.splice($scope.randomFood.indexOf($scope.MarioPosition), 1);
				}
				$scope.totalMoved += 1;
			}
		}else if(direction == 'left'){
			$scope.rowColumn =$scope.MarioPosition.split(":");
			//checking reached the border
			if($scope.rowColumn[1].substring(6) == 0){
				direction = "right";
			}else{
				//Moving mario to adjacent
				$scope.MarioPosition = $scope.rowColumn[0] + ":" + "column" + (parseInt($scope.rowColumn[1].substring(6)) - 1);

				//Eat the food if it is present in that cell
				if($scope.randomFood.indexOf($scope.MarioPosition) > -1){
					$scope.randomFood.splice($scope.randomFood.indexOf($scope.MarioPosition), 1);
				}
				$scope.totalMoved += 1;
			}		
		}else if(direction == 'right'){
			$scope.rowColumn =$scope.MarioPosition.split(":");
			//checking reached the border
			if($scope.rowColumn[1].substring(6) == $rootScope.grid_columns.length - 1){
				direction = "left";
			}else{
				//Moving mario to adjacent
				$scope.MarioPosition = $scope.rowColumn[0] + ":" + "column" + (parseInt($scope.rowColumn[1].substring(6)) + 1);

				//Eat the food if it is present in that cell
				if($scope.randomFood.indexOf($scope.MarioPosition) > -1){
					$scope.randomFood.splice($scope.randomFood.indexOf($scope.MarioPosition), 1);
				}
				$scope.totalMoved += 1;
			}		
		}
		//Checking Is Game Over
		$scope.checkGameOver(direction);
	}


	//Checking Is Game Over
	$scope.checkGameOver = function(direction){
		$timeout.cancel($scope.promise);
		if($scope.randomFood.length <= 0){
			$scope.gameOver = true;
		}else{
			$scope.promise = $timeout(function () {
				$scope.marioMove(direction);
		    },1500);
		}
	}

	$scope.init = function() {
    	$(".marioInitialFocus").focus();
    	$scope.gameOver = false;
    	$scope.marioPositionCheck();
    	$scope.totalMoved = 0;
	}

	//Calculating Mario's initial position
	$scope.marioPositionCheck = function(){
		var marioRowIndex = "row"+ Math.floor((Math.random() * $rootScope.grid_rows.length));
		var marioColumnIndex = "column"+ Math.floor((Math.random() * $rootScope.grid_columns.length));
		$scope.MarioPositionCheck = marioRowIndex + ":" + marioColumnIndex;
		if($scope.randomFood.indexOf($scope.MarioPositionCheck) > -1){
			$scope.marioPositionCheck();
		}else{
			$scope.MarioPosition = $scope.MarioPositionCheck;
		}
	};

	//Play Again
	$scope.playAgain = function(){
		$location.path('/');
	};
});
