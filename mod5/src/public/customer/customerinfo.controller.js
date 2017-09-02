(function(){
"use strict";

angular.module("public")
.controller("CustInfoController", CustInfoController);

CustInfoController.$inject = ["MenuService", "UserInfo"];
function CustInfoController(MenuService, UserInfo){
  var cust = this;
  if(UserInfo == undefined){
    cust.registered = false;
  }
  else{
    cust.registered = true;
    cust.user = UserInfo;
    MenuService.getDishDetails(cust.user.favdish)
    .then(function(response){
          cust.user.dishdetails = response;
    });
  }
}

})();
