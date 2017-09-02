(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state("public.signUp", {
      url: '/customer/signup',
      templateUrl: 'src/public/customer/signup.html',
      controller: 'SignUpController',
      controllerAs: 'signUpCtrl'
    })
    .state("public.custInfo", {
      url: '/customer/custinfo',
      templateUrl: 'src/public/customer/custinfo.html',
      controller: 'CustInfoController',
      controllerAs: 'custInfoCtrl',
      resolve: {
        UserInfo : ["MenuService", function(MenuService) {
          return MenuService.GetUserInfo();
        }]
      }
    });
}
})();
