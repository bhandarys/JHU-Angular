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

  function SaveUserInfo(){
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
