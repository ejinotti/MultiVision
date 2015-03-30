angular.module('app').controller('mvMainCtrl', function ($scope) {
  $scope.courses =  [
    { name: "fCourse1", featured: true, published: new Date() },
    { name: "fCourse2", featured: true, published: new Date() },
    { name: "Course3", featured: false, published: new Date() },
    { name: "Course4", featured: false, published: new Date() },
    { name: "Course5", featured: false, published: new Date() },
  ]
});
