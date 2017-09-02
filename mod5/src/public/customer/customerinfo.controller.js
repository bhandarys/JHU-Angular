(function(){
"use strict";

angular.module("public")
.controller("CustInfoController", CustInfoController);

CustInfoController.$inject = ["MenuService", "UserInfo"];
function CustInfoController(MenuService, UserInfo){
  var cust = this;
  if(UserInfo == undefined){
    cust.registered = false;
    // cust.user = {};
    // cust.user.firstname = "Sudhir";
    // cust.user.lastname = "Bhandary";
    // cust.user.email = "Sudhir@Sudhir";
    // cust.user.phone = "777-777-7777";
    // cust.user.favdish = "A1"
  }
  else{
    cust.registered = true;
    cust.user = UserInfo;
    MenuService.getDishDetails(cust.user.favdish)
    .then(function(response){
          console.log("Inside Customer Info Controller ");
          console.log(response);
          cust.user.dishdetails = response;
    });
  }

  // console.log(cust.user.firstname);
}

})();
