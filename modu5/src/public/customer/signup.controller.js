(function(){
"use strict";

angular.module("public")
.controller("SignUpController", SignUpController);


SignUpController.$inject = ['MenuService']
function SignUpController(MenuService){
  var signUpCtrl = this;

  signUpCtrl.valid = true;
  signUpCtrl.infosaved = false;

  signUpCtrl.user = {};
  signUpCtrl.user.firstname = "Sudhir";
  signUpCtrl.user.lastname = "Bhandary";
  signUpCtrl.user.email = "Sudhir@Sudhir";
  signUpCtrl.user.phone = "777-777-7777";
  signUpCtrl.user.favdish = "A1"

  function SaveUserInfo(){
    console.log("Inside SaveUserInfo " + signUpCtrl.user.firstname);
      MenuService.SaveUserInfo(signUpCtrl.user);
      signUpCtrl.infosaved = true;
  };

  signUpCtrl.submit = function () {
    signUpCtrl.valid = true;
    signUpCtrl.infosaved = false;
    MenuService.getDishAvailability(signUpCtrl.user.favdish)
    .then(function(status){
      if (status){
        signUpCtrl.valid = true;
        SaveUserInfo();
      }
      else {
        signUpCtrl.valid = false;
        signUpCtrl.infosaved = false;
      }
    });
  };
};



})();
