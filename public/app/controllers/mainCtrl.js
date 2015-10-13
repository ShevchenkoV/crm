angular.module('mainCtrl', [])
	.controller('mainController', function($rootScope, $location, Auth,$http,$q){

		var vm = this;

		vm.loggedIn = Auth.isLoggedIn();

		$rootScope.$on('$routeChangeStart', function(){
			Auth.getUser()
			.then(function(data){
				vm.user = data;
			});
		});

		vm.doLogin = function() {
			vm.processing = true;
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {
					vm.processing = false;

					if (data.success)
						$location.path('/users');
					else
						vm.error = data.message;
				});
		};

		vm.doLogout = function(){
			Auth.logout();

			vm.user = {};
			$location.path('/login');
		};
	});