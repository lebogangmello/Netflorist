/// <reference path="C:\Users\User\Documents\Visual Studio 2015\Projects\florist\florist\adminView/uploadImage.html" />
var angularApp = angular.module('angularApp', []);
angularApp.controller('registerController', function ($http, $scope, $window)
{
    $scope.Register = function () {
        var postUser = $http({
            method: "post", //Post data to the api
            url: "/api/Customers",
            datatype: "json",
            data: { custEmail: $scope.CustEmail, FirstName: $scope.FirstName, LastName: $scope.LastName, Contact: $scope.Contact, Password: $scope.Password },
            headers: {'Content-Type': 'application/json' }
        }).then(function (success){
            $window.alert("Done");
        },function (error) { 
            $window.alert(error);
        });
    }
});

angularApp.controller('dregisterController', function ($http, $scope, $window) {
    $scope.RegisterDriver = function () {
        var postUser = $http({
            method: "post",
            url: "/api/tblDrivers",
            datatype: "json",
            data: {
                drvEmail: $scope.drvEmail, drvFirstname: $scope.drvFirstname,
                drvLastname: $scope.drvLastname, drvContact: $scope.drvContact,
                drv_Password: $scope.drv_Password
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Done");
        }, function (error) {
            $window.alert(error);
        });
    }
});

angularApp.controller('productController', function ($http, $scope, $window) {

    $scope.loadInfo = function () {
        var postUser = $http({
            method: "post", //Post data to the api
            url: "/api/products/",
            datatype: "json",
            data: { prodId:$scope.prodId, prodDesc: $scope.prodDesc,prodThreshold:$scope.prodThreshold, prodCat: $scope.prodCat, prodPrice: $scope.prodPrice, suppId: $scope.suppId },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Done");
        }, function (error) {
            $window.alert(error);
        });
    }
});
angularApp.controller('productController', function ($http, $scope, $window) {

    $scope.loadInfo = function () {
        var postUser = $http({
            method: "post", //Post data to the api
            url: "/api/products/",
            datatype: "json",
            data: { prodId: $scope.prodId, prodDesc: $scope.prodDesc,ProdName: $scope.ProdName, prodCat: $scope.prodCat, prodPrice: $scope.prodPrice, suppId: $scope.suppId },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Done");
            window.location = 'uploadImage.html'
        }, function (error) {
            $window.alert(error);
        });
    }
});
angularApp.controller('AddsuppController', function ($http, $scope, $window) {

    $scope.suppInfo = function () {
        var postsupplierInfo = $http({
            method: "post", //Post data to the api
            url: "/api/supplierinfoes/",
            datatype: "json",
            data: { supplierName: $scope.supplierName, suppEmail: $scope.suppEmail, password: $scope.password },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("supplier registered made");
        }, function (error) {
            $window.alert(JSON.stringify(error));
        });
    }
});
angularApp.controller('suppController', function ($http, $scope, $window) {

    $scope.prodInfo = function () {
        var postsupplier = $http({
            method: "post", //Post data to the api
            url: "/api/suppliers/",
            datatype: "json",
            data: { suppId: $scope.suppId, name: $scope.name, quantity: $scope.quantity, description: $scope.description, serviceDate: $scope.serviceDate, category: $scope.category, $batch: $scope.batch, threshold: $scope.threshold },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("order made");
        }, function (error) {
            $window.alert(error);
        });
    }
});








    

    


