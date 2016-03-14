angular.module('angularApp', []);

function mainController($scope, $http){
	$scope.formData = {};

	// load index.html ask for all registers
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data)
		})
		.error(function(data){
			console.log('Error: '+data);
		});

	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
		.success(function(data){
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: '+ data);
		});
	};

	// Erase register
	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: '+ data);
			});
	};
}

