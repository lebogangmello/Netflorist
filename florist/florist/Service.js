var Service = angular.module('Service', []);

Service.factory('webapi', function ($http) {
    var url = "http://localhost:54698/api/"
    var webapi = {};
    //get all the customers
    webapi.GetCustomer = function () {
        return $http.get(url + 'Customers');
    }
    //customer login
    webapi.GetUser = function (custEmail, Password) {
        return $http.get(url + 'Customers?custEmail=' + custEmail + '&Password=' + Password);
    }
    //admin login
    webapi.GetAdmins = function (adminEmail, Password) {
        return $http.get(url + 'Admins?adminEmail=' + adminEmail + '&Password=' + Password);
    }
    //driver login
    webapi.GetDriver = function (drvEmail, drv_Password) {
        return $http.get(url + 'tblDrivers?drvEmail=' + drvEmail + '&drv_Password=' + drv_Password);
    }
    //supplier login
    webapi.Getsupplierinfoes =  function(suppEmail,password)
    {
        return $http.get(url + 'supplierinfoes?suppEmail =' + suppEmail + '&password = ' +password)

    }
    //get product
    webapi.Getproducts = function () {
        return $http.get(url + 'products');
    }

    webapi.getProduct = function () {
        return $http.get(url + 'Products');
    }
    //get all drivers
    webapi.GetDrivers =  function()
    {
        return $http.get(url + 'tblDrivers');
    }
    //get all the suppliers
    webapi.Getsupplierinfo = function()
    {
        return $http.get(url + 'supplierInfoes')
    }
   
    //get images
    webapi.GetProductImage = function(){
        return $http.get(url + 'GetProductImage');

    }

    webapi.GetImages = function () {
        return $http.get(url + 'tblProImages/');
    }
    //update Driver details
    webapi.UpdateDriver = function(DriverToEdit){
        return $http.put(url + 'tblDrivers/' + DriverToEdit.drvId, DriverToEdit);
    }
    //update customers details
    webapi.PutCustomer = function (UserToEdit) {
        return $http.put(url + 'Customers/' + UserToEdit.custID, UserToEdit);
    }
    //update adimin details
    webapi.UpdateAdmin = function (AdminToEdit) {
        return $http.put(url + 'Admins/' + AdminToEdit.adId,AdminToEdit)

    }
    //update product
    webapi.UpdateProduct =  function(ProToUpdate)
    {
        var UpdateProInfo = $http({
            method: 'PUT',
            url: url + 'products/' + ProToUpdate.prodId,
            data: ProToUpdate

        });
        return UpdateProInfo;
    }
    //update status
    webapi.UpdateStatus = function(statusDelivered)
    {
        return $http.put(url + 'tblOrders/' + statusDelivered.orderId, statusDelivered);
        //var updateStatus = $http(
        //    {
        //        method: 'PUT',
        //        url: url + 'tblOrders/' + statusDelivered.id,
        //        data: statusDelivered
        //    });
        //return
    }
    //delete product
    webapi.Deleteproduct = function (prodId) {
        
    return $http.delete(url + 'products/' + prodId);
    } 
    //delete image
    webapi.DeletetblProImage = function (img_Id) {
        return $http.delete(url + 'tblProImages/' + img_Id);
    };
    //delete driver
    webapi.DeletetblDriver = function (drvId) {
        return $http.delete(url + 'tblDrivers/' + drvId);
    };
    //delete supplier
    webapi.Deletesupplierinfo =  function(id)
    {
        return $http.delete(url + 'supplierinfoes')
    }

    //  Add payment
    webapi.AddPayment = function (payment) {
        return $http.post(urlBase + 'Payments', payment);
    };
    //to get all the users

    webapi.getAdmin = function () {
        return $http.get(url + 'Admin');
    }
    //  Add to order table
    webapi.AddOrders = function (Order) {
        return $http.post(url + 'tblOrders', Order);
    }
    //  Retreive all the orders
    webapi.RetreiveOrders = function () {
        return $http.get(url + 'tblOrders');
    }

    //  Retreive all the orders
    webapi.RetrieverDriverOrder = function () {
        return $http.get(url + '/GetDriverOrders');
    }
    //retrieve supp ideas
    webapi.retrieveSuppOrders = function()
    {
        return $http.get(url + '/suppliers');
    }


    //  Retreive all the orders
    webapi.RetrieveDriverOrders = function () {
        return $http.get(url + 'DriverOrderss');
    }
    //Updating quantity
    webapi.Putproduct = function (quantityToUpdate) {
        var UpdateProQuantity = $http({
            method: 'PUT',
            url: url + 'products/' + quantityToUpdate.prodId,
            data: quantityToUpdate

        });
        return UpdateProQuantity;
    }

    return webapi;
}
)
;





