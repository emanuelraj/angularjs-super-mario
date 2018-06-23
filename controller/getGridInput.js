app.controller('getGridInput', function($scope,$rootScope, $location) {
    //Get Grid Rows and Column
    $scope.formGrid = function(){
    	$rootScope.grid_rows = [];
    	$rootScope.grid_columns = [];
    	for(i = 0; i < $scope.grid_row; i++){
    		$rootScope.grid_rows.push(i);
    		sessionStorage.setItem('grid_rows', $rootScope.grid_rows);
    	}
    	for(j = 0; j < $scope.grid_column; j++){
    		$rootScope.grid_columns.push(j);
    		sessionStorage.setItem('grid_columns', $rootScope.grid_columns);
    	}
		$location.path('/playGame');
    }
});
