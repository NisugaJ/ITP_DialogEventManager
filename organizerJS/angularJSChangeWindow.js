var angularJSChangeWindow = angular.module('angularJSChangeWindow',['ngRoute']);

angularJSChangeWindow.controller('MainCtrl',function($scope){
	
})

.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/',{
		template:'',
		controller:'MainCtrl'
}).
when('/questions',{
	templateUrl:'../HTML/Questions.html',
	controller:'MainCtrl'
}).
when('/polls',{
	templateUrl:'../HTML/Polls.html',
	controller:'MainCtrl'
}).
when('/reports',{
	templateUrl:'../HTML/Reports.html',
	controller:'MainCtrl'
}).
otherwise({
	redirectTo : '/questions'
});
}]);