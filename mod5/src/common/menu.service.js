(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getDishAvailability = function (short_name) {
    // var config = {};
    // if (category) {
    //   config.params = {'category': category};
    // }

    return $http.get(ApiPath + '/menu_items/' + short_name + '.json').then(function (response) {
      console.log("Sucess");
      console.log(response);
      console.log(response.status);
      return true;
    },
    function (response) {
      console.log("Error");
      console.log(response);
      console.log(response.status);
      return false;
    });
  };

  service.getDishDetails = function (short_name) {
    console.log("Getting details for " + short_name);
    return $http.get(ApiPath + '/menu_items/' + short_name + '.json').then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  service.SaveUserInfo = function(user){
    console.log("In service save info" + user.firstname);
    service.user = user;
  };

  service.GetUserInfo = function(){
    console.log("In service get info");
    // if (service.user == undefined){
    //   return null;
    // }
    // console.log("In service get info" + service.user.firstname);
    return service.user;
  };

}



})();
