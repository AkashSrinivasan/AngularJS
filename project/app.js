/* global $scope */

var app = angular.module('myapp',['ngRoute']);

app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/home',{
            templateUrl:"views/home.html",
            controller:"mycontroller"
        }).when('/content',{
            templateUrl:"views/content.html",
            // controller:"mycontroller"
        })
        .when('/directory',{
            templateUrl:"views/directory.html",
            controller:"mycontroller"
        }).otherwise({
            redirectTo:'/home'
        });
}]);

app.directive('randomNames',[function(){


    return {
        restrict: 'E',
        scope: {
            names:'=',
            title:'='
        },
        templateUrl:"views/random.html",
        transclude:true,
        controller:function($scope){
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}]);

app.controller('mycontroller', function($scope,$http){
    $scope.removestudent = function(student){
        var removestudent = $scope.names.indexOf(student);
        $scope.names.splice(removestudent,1);
    };

    $scope.addStudent = function(){
         $scope.names.push({
            name:$scope.newStudent.name,
            rollnum: parseInt($scope.newStudent.rollnum),
            color: $scope.newStudent.color,
             image: "image/img.png"
         });


         $scope.newStudent.name="";
         $scope.newStudent.rollnum="";
         $scope.newStudent.color="";
    };
        
    $http.get("data/names.json")
        .then(function(main){
            $scope.names = main.data;
        });
    
       
    
});
