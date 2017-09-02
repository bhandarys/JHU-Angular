(function(){
"use strict";

angular.module("public")
.component("custInfoComponent", {
  templateUrl: 'src/public/customer/custinfocomponent.html',
  bindings: {
    userinfo: '<'
  },
  controller: CustInfoComponentController
});

CustInfoComponentController.$inject = ['ApiPath'];
function CustInfoComponentController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
}

})();
