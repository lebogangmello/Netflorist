
var myApp = angular.module('myApp', ['ngRoute','Service']);
myApp.service('CommonProp', function () {
    var itemss = '';
    var total ;

    return {
        getItems: function () {
            return itemss;
        },
        setItems: function (value) {
            itemss = value;
        },
        getTotal: function () {
            return total;
        },
        setTotal: function (tot) {
            total = tot;
        },
    }
});
//customerLogin
myApp.controller('loginController', function ($scope, $http, webapi, $window, $location) {
    $scope.access = function () {
        webapi.GetUser($scope.custEmail, $scope.Password).then(function (response) {
            if (response.data === null) {
                window.alert("error");
            }
            else {
                console.log(response.data.FirstName);
                var loggedInUser = {
                    id: response.data.custId,
                    name: response.data.FirstName,
                    lastname: response.data.LastName,
                    email: response.data.custEmail,
                    contact: response.data.Contact
                };
                localStorage.setItem("LoggedUser", JSON.stringify(loggedInUser));
                window.alert("successful");
                window.location = '../custViews/ProductDashBoard.html';
            }
        }),
        function (response) {
            window.alert("register");
        }

    };
});
//loginsuppliers
myApp.controller('suppController', function ($scope, $http, webapi, $window) {
    $scope.suppaccess = function () {
        webapi.Getsupplierinfoes($scope.suppEmail, $scope.password).then(function (response) {
            if (response.data === null) {
                window.alert("something went wrong");
            }
            else {
                window.alert("succussful");
                window.location = ' ProductMonitor.html'
            }
        })
    }
});
//admin Login
myApp.controller('AdminsController', function ($scope, $http, webapi, $window, $location) {
    $scope.accessadmin = function () {
        webapi. GetAdmins($scope.adminEmail, $scope.Password).then(function (response) {
            if (response.data === null) {
                window.alert("error");
            }
            else {
                window.alert("successful");
                window.location = '../adminView/adminHome.html';
            }
        }),
        function (response) {
            window.alert("register");
        }

    };
});
//updating customers users
myApp.controller("CProfileController", function ($scope, webapi, $rootScope, $location) {
    GetUsers();
    function GetUsers() {
        webapi.GetUser().then(function (response) {
            $scope.user = response.data;
        }), function () {
            aler("Unable to load users info");
        }
    }
    $scope.UpdateCust = function () {

        $scope.custId = user.id;
        var UserToEdit = {
            'custId': $scope.custId,
            'LastName': $scope.LastName,
            'FirstName': $scope.FirstName,
            'Contacts': $scope.Contacts,
            'custEmail': $scope.custEmail,
            'Password': $scope.Password
        };

        webapi.UpdateCust(UserToEdit).then(function (response) {
            alert("User is successfully edited")
            $scope.Lastname = undefined;
            $scope.FirstName = undefined;
            $scope.Contacts = undefined;
            $scope.custEmail = undefined;
            $scope.Password = undefined
            GetUsers();
            $location.path('/custViews/productdashboard.html');
        }),
        function (response) {
            alert("unable to edit user");
        }
    }
});


//products
myApp.controller('productController', function ($scope, webapi) {
    getProducts();

    function getProducts(){
        webapi.Getproducts().then (function(response){
            $scope.products = response.data;
        }), function(){
            window.alert("Error")
        }
    }
});

   
//});
//adding To Cart
myApp.controller("ShoppingCartController", function ($scope, $location, CommonProp, $rootScope, webapi, $http) {
    getProductWithImage();
    function getProductWithImage() {
        webapi.GetProductImage().then(function (response) {
            $scope.productImage = response.data;
        }), function () {
            window.alert("ERROR!!!!!");
        }
    }
    // DEFINING SHOPPING CART ARRAY THAT WILL WILL STORE THE ITEMS
    $scope.myItems = [];
    $scope.cartTotal = 0;
    var totalPrice = 0;
    $scope.total = 0;
    // ADD TO SHOPPING CART  DONE!!!!!!!!!!!!

    $scope.addItem = function (newItem) {
        if ($scope.myItems.length == 0) {
            newItem.count = 1;
            $scope.myItems.push(newItem);
            console.log(newItem.prodPrice);
            CommonProp.setItems($scope.myItems);
        }
        else {
            var repeat = false;
            for (var i = 0; i < $scope.myItems.length; i++) {
                if ($scope.myItems[i].prodId == newItem.prodId) {
                    $scope.myItems[i].count++;
                    repeat = true;
                }
            }
            if (!repeat) {
                newItem.count = 1;
                $scope.myItems.push(newItem);
            }
        }
        localStorage.setItem('cart', JSON.stringify($scope.myItems));
            localStorage.setItem("total", newItem.prodPrice);
    };


    // REMOVING ALL THE ITEMS IN CART AT ONES
    $scope.removeBasket = function () {
        $scope.myItems.splice(0, $scope.myItems.length);
        updatePrice();
    };

    $scope.totalPrice = function () {
        var totalPrice = 0;
        for (var i = 0; i < $scope.myItems.length; i++) {
            totalPrice += $scope.myItems[i].count * $scope.myItems[i].prodPrice;
        }
        return totalPrice;
        localStorage.setItem("total", totalPrice);
        CommonProp.setTotal(totalPrice);
    }

    // REMOVE JUST ONE ITEM
    $scope.remove = function (index) {
        $scope.myItems.splice(index, 1);
        updatePrice();
    };

    // TO GET ITEMS SELECTED IN CART AND VIEW THEM IN NEW PAGE
    $scope.$watch('myItems', function () {
        CommonProp.setItems($scope.myItems);
    });

    //Updating the price for the next page ??
    $scope.$watch(function () {
        CommonProp.setTotal($scope.totalPrice);
    })
});
//put add to on a local storage//checkout
myApp.controller('BasketController', function ($scope, $location, CommonProp, $rootScope, webapi, $http) {
    $scope.Items = JSON.parse(localStorage.getItem('cart'));
    $scope.quantity = 1;
    console.log("Hello")
    for (var i = 0; i < $scope.Items.length; i++) {
        $scope.total = function () {
            var total = $scope.quantity * $scope.Items[i];
            return total;
            console.log(total);
        }
    }


    $scope.removeItem = function () {
        $scope.Items.splice(0, $rootScope.Items.length);
        $rootScope.updatePrice();
    }


});
//load Images
myApp.controller("productController", function ($scope, $location, webapi, $http) {

    function getProductWithImage() {
        webapi.GetProductImage().then(function (response) {
            $scope.productImage = response.data;
        }), function () {
            window.alert("ERROR!!!!!");
}
}
    var formdata = new FormData();

    $scope.GetImages = function ($files) {
        $scope.imagesrc = [];

        for (var i = 0; i < $files.length; i++) {
            var reader = new FileReader();
            reader.Filename = $files[i].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.Filename;
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = event.target.result;
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[i]);
        };
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        })
    };
    $scope.loadup = function () {
        var reqs = {
            method: 'POST',
            url: 'http://localhost:54698/api/tblProImages',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        }

        $http(reqs).then(function (mg) {
            alert("Image saved successfully" + mg);
            $scope.reset();
        }), function () {
            alert("Failed to upload image");
            $scope.reset();
        }
    }

    $scope.reset = function () {
        angular.forEach(
            angular.element("Input [Type = 'file']"),
        function (inElem) {
            angular.element(inElem).val(null);
        }
            );
        $scope.imagesrc = [];
        formdata = new FormData();
    }
});

//  customer payment controller
myApp.controller("PaymentController", function ($scope, webapi, $rootScope, $location, $http,$http, $window) {    //Get user details first
    function GetUsers() {
        webapi.GetUser().then(function (response) {
            $scope.user = response.data;
        }), function () {
            aler("Unable to load users info");
        }
    }
    var user1 = JSON.parse(localStorage.getItem("LoggedUser"));
    $scope.email = user1.email;
    console.log();

  //$scope.custEmail = $rootScope.currentUser.custEmail;
    $scope.Pay = function () {

        var addingPayment = $http({
            method: "post", //Post data to the api
            url: "/api/Payments/",
            datatype: "json",

            data: {
                cardName: $scope.cardName,
                cardCCV: $scope.cardCCV,
                cardType:$scope.cardType, 
                cardExpMonth: $scope.cardExpMonth,
                cardExpYear: $scope.cardExpYear,
                paymentDate: $scope.paymentDate,
                custEmail: user1.email
            },

           // headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Done");
            $location.path('/order.html');
            location.href = "order.html";

        }, function (error) {
            $window.alert('something is wrong');
        });
    }
});
//  customer order controller
myApp.controller("OrderController", function ($scope, webapi, $rootScope, $location, $http, CommonProp) {
    getCustomer();     //  Get users
    function getCustomer() {
        webapi.GetCustomer().then(function (response) {
            $scope.customer = response.data;
        }), function () {
            aler("Unable to load users info");
        }
    }

    getProd();  //  Get products
    function getProd() {
        webapi.getProduct().then(function (response) {
            $scope.Product = response.data;
        }), function () {
            alert('No products Found');
        }
    }

    $scope.totalPrice = localStorage.getItem("total");
    $scope.prodDesc = localStorage.getItem("prodCat")
    var user = JSON.parse(localStorage.getItem("LoggedUser"));
    console.log(user.name);
    $scope.contact = user.contact;
    $scope.name = user.name;
    $scope.email = user.email;
    $scope.orderDeliveryAddress = $scope.orderDeliveryAddress;


    $scope.AdOrder = function ()    //button
    {
        var OrderToAdd =
        {
            'totalPrice': $scope.totalPrice,
            'orderDeliveryAddress': $scope.orderDeliveryAddress,
            'custEmail': $scope.email,
        };


        webapi.AddOrders(OrderToAdd).then(function (response) {
            $scope.tblOrder = response.data;
            alert("Order has been placed successfully");
            $scope.totalPrice = undefined;
            $scope.orderDeliveryAddress = undefined;
            window.location = '../Index.html';
            
        }),
        function (response) {
            alert("Unable to add order");
        };
    };

});
//  admin view all orders controller
myApp.controller("ViewOrdersController",function ($scope, webapi, $location, $rootScope,$http) {
    getOrders();
    function getOrders() {
        webapi.RetreiveOrders().then(function (response) {
            $scope.tblOrder = response.data;
        }),
        function () {
            alert('Couldnt load data.');
        }
    }
});
//admin view all customers
myApp.controller("viewCustomerController",function ($scope,webapi,$http,$location,$rootScope)
{
    getcustomers();
    function getcustomers()
    {
        webapi.GetCustomer().then(function(response)
        {
            $scope.Customer = response.data;
        }),
        function()
        {
            alert('no customer found');
        }
    }
})
myApp.controller("ViewproductsController", function ($scope, webapi, $location, $rootScope, $http) {
    getProduct();
    function getProduct() {
        webapi.Getproducts().then(function (response) {
            $scope.product = response.data;
        }),
        function () {
            alert('Couldnt load data.');
        }
    }
});
//  supplier view all orders controller
myApp.controller("ViewSuppOrdersController", function ($scope, webapi, $location, $rootScope, $http) {
    getsupOrders();
    function getsupOrders() {
        webapi.retrieveSuppOrders().then(function (response) {
            $scope.supplier = response.data;
        }),
        function () {
            alert('Couldnt load data.');
        }
    }
});

//registerDriver
myApp.controller("RegisterController", function ($scope, webapi, $location) {
    $scope.RegisterDriver = function () {
        var DriverToAdd = {
            'drvFirstname': $scope.drvFirstname,
            'drvLastname': $scope.drvLastname,
            'drvContact': $scope.drvContact,
            'drvEmail': $scope.drvEmail,
            'drvPassword': $scope.drvPassword
        };
        webapi.AddDriver(DriverToAdd).then(function (reponse) {
            alert("You are successfully registered");
            $scope.drvFirstname = undefined;
            $scope.drvLastname = undefined;
            $scope.drvContact = undefined;
            $scope.drvEmail = undefined;
            $scope.drvPassword = undefined;
            $location.path('/DHome');
        }),
        function (response) {
            alert("Unable to register driver");
        }
    }
});
//driver logins
myApp.controller('dloginController', function ($scope, $http, webapi, $window, $location) {
    $scope.daccess = function () {
        webapi.GetDriver($scope.drvEmail, $scope.drv_Password).then(function (response) {
            if (response.data === null) {
                window.alert("error");
            }
            else
            {
            var loggedInUser = {
                name: response.data.drvFirstname,
                lastname: response.data.drvLastname,
                email: response.data.drvEmail,
                contact: response.data.drvContact,
                password: response.data.drv_Password

            };
            localStorage.setItem("LoggedUser", JSON.stringify(loggedInUser));
            window.alert("successful");
            window.location = '../driverView/driverDash.html';
        }
        }),
        function (response) {
            window.alert("register");
        }

    };
});

myApp.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {

        var Change = $parse(attrs.ngFiles);

        element.on('change', function (event) {
            Change(scope, { $files: event.target.files });
        })
    }
    return {
        link: fn_link
    }
}])
//  user edit driver profile
myApp.controller("DProfileController", function ($scope, webapi, $rootScope, $location) {
    GetDriver();
    function GetDriver() {
        webapi.GetDriver().then(function (response) {
            $scope.user = response.data;
        }), function () {
            aler("Unable to load users info");
        }
    }

    var user = JSON.parse(localStorage.getItem("LoggedUser"));
    console.log(user);
    $scope.drvContact = user.contact;
    $scope.drvFirstname = user.name;
    $scope.drvLastname = user.lastname;
    $scope.drv_Password = user.password;
    $scope.drvEmail = user.email;


    $scope.modifyDriver = function () {
        var DriverToEdit = {
            drvId: $scope.drvId,
            drvFirstname: $scope.drvFirstname,
            drvLastname: $scope.drvLastname,
            drvContact: $scope.drvContact,
            drvEmail: $scope.drvEmail,
            drv_Password: $scope.drv_Password
        }

        webapi.UpdateDriver(DriverToEdit).then(function (response) {
            $scope.drvId = undefined;
            $scope.drvFirstname = undefined;
            $scope.drvLastname = undefined;
            $scope.drvContact = undefined;
            $scope.drvEmail = undefined;
            $scope.drv_Password = undefined
            alert("Driver is successfully edited");
            $location.path('/DHome');
            
        }),
        function (response) {
            alert("unable to edit driver");
        }
    }
});
//update customer
myApp.controller("CProfileController", function ($scope, webapi, $rootScope, $location) {
    GetUser();
    function GetUser() {
        webapi.GetUser().then(function (response) {
            $scope.user = response.data;
        }), function () {
            aler("Unable to load users info");
        }
    }

    var user = JSON.parse(localStorage.getItem("LoggedUser"));
    console.log(user);

    $scope.Contact = user.contact;
    $scope.FirstName = user.name;
    $scope.LastName = user.lastname;
    $scope.Password = user.Password;
    $scope.custEmail = user.email;
    $scope.custId = user.id;
    $scope.modifycust = function () {
        var UserToEdit = {
            custID: $scope.custId,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            Contact: $scope.Contact,
            custEmail: $scope.custEmail,
            Password: $scope.Password
        }
        console.log(UserToEdit);
        webapi.PutCustomer(UserToEdit).then(function (response) {
            //$scope.custID = undefined;
            //$scope.FirstName = undefined;
            //$scope.LastName = undefined;
            //$scope.Contact = undefined;
            //$scope.custEmail = undefined;
            //$scope.Password = undefined
            alert("customer is successfully edited");
            $location.path('/DHome');

        }),
        function (response) {
            alert("unable to edit customer");
        }
    }
});
//update admin
myApp.controller("AProfileController", function ($scope, webapi, $rootScope, $location) {
    GetAdmin();
    function GetAdmin() {
        webapi.GetAdmin().then(function (response) {
            $scope.user = response.data;
        }), function () {
            aler("Unable to load users info");
        }
    }

    var user = JSON.parse(localStorage.getItem("LoggedUser"));
    console.log(user);
    
    $scope.Contact = user.contact;
    $scope.FirstName = user.name;
    $scope.LastName = user.lastname;
    $scope.Password = user.Password;
    $scope.adminEmail = user.email;

    $scope.modifyadmin = function () {
        var AdminToEdit = {
            adminID: user.id,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            Contact: $scope.Contact,
            adminEmail: $scope.adminEmail,
            Password: $scope.Password
        }

        webapi.UpdateAdmin(AdminToEdit).then(function (response) {
            $scope.adminID = undefined;
            $scope.FirstName = undefined;
            $scope.LastName = undefined;
            $scope.Contact = undefined;
            $scope.adminEmail = undefined;
            $scope.Password = undefined
            alert("admin is successfully edited");
            $location.path('/DHome');

        }),
        function (response) {
            alert("unable to edit customer");
        }
    }
}

);
//update product
myApp.controller("UpdateProductController", function ($scope, $rootScope, $location, webapi) {
    console.log("SDSDSDSD");

    $scope.selectedItem = "Select Product";
    $scope.isDeleteItemVisible = false;

    //code to get all the data from the database

    getProduct();
    function getProduct() {

        webapi.Getproducts().then(function (response) {
            $scope.product = response.data;
        }),
            function (response) {
                alert("Unable to get all products details");
            }
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.prodName;
        $scope.prodId = item.prodId;
        $scope.prodName = item.prodName;
        $scope.prodCat = item.prodCat;
        $scope.prodDesc = item.prodDesc;
        $scope.prodPrice = item.prodPrice;
    };

    //code to update the product

    $scope.UpdateProd = function () {
        var ProToUpdate = {
            'prodId': $scope.prodId,
            'prodName': $scope.prodName,
            'prodCat': $scope.prodCat,
            'prodDesc': $scope.prodDesc,
            'prodPrice': $scope.prodPrice,
        };

        webapi.UpdateProduct(ProToUpdate).then(function (response) {
            alert("Product successfully updated");
            $scope.prodId = undefined;
            $scope.prodName = undefined;
            $scope.prodCat = undefined;
            $scope.prodDesc = undefined;
            $scope.prodPrice = undefined;
            $scope.selectedItem = "Select Product";
            $scope.isDeleteItemVisible = false;
            getProduct();
            $location.path("/Dashboard")
        }),
            function (response) {
                alert("Error while updating");
            };
    }
});
//update product QUANTITY
myApp.controller("UpdateProductQuantityController", function ($scope, $rootScope, $location, webapi) {
    console.log("SDSDSDSD");


    getProduct();
    function getProduct() {

        webapi.Getproducts().then(function (response) {
            $scope.product = response.data;

        }),
            function (response) {
                alert("Unable to get all products details");
            }
    };



    $scope.Updatequant = function (product) {
        var ProToUpdate = {
            'prodId': product.prodId,
            'prodName': product.prodName,
            'prodCat': product.prodCat,
            'prodDesc': product.prodDesc,
            'quantity': product.quantity,
        };

        webapi.UpdateProduct(ProToUpdate).then(function (response) {
            alert("Product successfully updated");
            $scope.prodId = undefined;
            $scope.prodName = undefined;
            $scope.prodCat = undefined;
            $scope.prodDesc = undefined;
            $scope.quantity = undefined;
            $scope.selectedItem = "Select Product";
            $scope.isDeleteItemVisible = false;
            getProduct();
            $location.path("/Dashboard")
        }),
            function (response) {
                alert("Error while updating");
            };
    }
});
// update status
myApp.controller("ViewOrdersController", function ($scope, $rootScope, $location, webapi) {
    console.log("test");
    $scope.deliveryStatus = null;

    $scope.selectedItem = "Select Product";
    $scope.isDeleteItemVisible = false;
    
    getOrders();
    function getOrders() {

        webapi.RetreiveOrders().then(function (response) {
            $scope.tblOrder = response.data;
        }),
            function (response) {
                alert("Unable to get all orders details");
            }

    };
    $scope.UpdateStatus = function(ord) {
        console.log("test")
        var statusDelivered = {
            orderId:ord.orderId,
            custEmail: ord.custEmail,
            totalPrice: ord.totalPrice,
            orderStatus:ord.orderStatus,
            orderDeliveryAddress: ord.orderDeliveryAddress
        };
        console.log(statusDelivered);
        webapi.UpdateStatus(statusDelivered).then(function (response)
        {
            alert("status successfully updated");
            $scope.orderStatus = undefined;

            $scope.selectedItem = "Select orders";
            $scope.isDeleteItemVisible = false;
            getOrders();
        }),
    function (response) {
        alert("Error while updating");
    }
    }
});

//delete product
myApp.controller("DeleteProductController", function ($scope, $rootScope, $location, webapi) {


    $scope.selectedItem = "Select Product";
    $scope.isDeleteItemVisible = false;

    getProduct();
    function getProduct() {

        webapi.Getproducts().then(function (response) {
            $scope.product = response.data;
        }), function (error) {
            alert('No Products Available');
            //$scope.status = 'Unable to load products: ' + error.message;
        }
    }


        $scope.delete = function (item) {
            webapi.Deleteproduct(item).then(function () {
                removebyid(item.prodId);
                window.alert("product removed")
            });
        };

    console.log($scope.prodId);

    //var removebyid = function (prodId) {
    //    for (var i = 0; i < $scope.prodId; i++) {
    //        if ($scope.prodId[i].prodId = prodId) {
    //            $scope.product.splice(i, 1);
    //            break;
    //        }
    //    };

    //};

});


//delete image
myApp.controller("DeleteImagesController", function ($scope, $rootScope, $location, webapi) {


    $scope.selectedItem = "Select image";
    $scope.isDeleteItemVisible = false;

    getimage();
    function getimage() {

        webapi.GetImages().then(function (response) {
            $scope.tblProImage = response.data;
        }), function (error) {
            alert('No Products Available');
            //$scope.status = 'Unable to load products: ' + error.message;
        }
    }

        $scope.del = function (product) {
            webapi.DeletetblProImage(product).then(function () {
                removebyid(product.img_Id);
                window.alert("driver removed")
            });
        };
    console.log($scope.img_Id);

    //var removebyid = function (img_Id) {
    //    for (var i = 0; i < $scope.img_Id.length; i++) {
    //        if ($scope.pro[i].img_Id == img_Id) {
    //            $scope.pro.splice(i, 1);
    //            break;
    //        }
    //    };

    //};

});
//delete driver
myApp.controller("DeleteDriverController", function ($scope, $rootScope, $location, webapi) {

    getDriver();
    function getDriver() {

        webapi.GetDrivers().then(function (response) {
            $scope.tblDriver = response.data;
        }), function (error) {
            alert('No drivers Available');

        }
    }

    $scope.deleteDriver = function (tblDriver) {
        webapi.DeletetblDriver(tblDriver).then(function () {
            removebyid(tblDriver.drvId);
        });
    };
    console.log($scope.drvId);


});
//delete supplier
myApp.controller("DeletesupplierController", function ($scope, $rootScope, $location, webapi) {

    getsupplier();
    function getsupplier() {

        webapi.Getsupplierinfo().then(function (response) {
            $scope.supplierinfo = response.data;
        }), function (error) {
            alert('No supplier Available');

        }
    }

    $scope.deleteSupp = function (supplierinfo) {
        webapi.Deletesupplierinfo(supplierinfo).then(function () {
            removebyid(supplierinfo.Id);
        });
    };
    console.log($scope.Id);


});
myApp.controller("trackOrderController" , function($scope,$rootScope, $location,webapi,)
{
    getOrders();
    function getOrders()
    {
        webapi.RetreiveOrders().then(function(response){
            $scope.tblOrder = response.data;
        }), function(error)
        {
            alert('no orders found');
        }

    }

})





