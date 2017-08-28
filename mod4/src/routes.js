(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/home.template.html'
  })

  .state('category', {
    url: '/category',
    templateUrl: 'src/menu/categories.template.html',
    controller: 'CategoriesListController as categories',
    resolve: {
      menu: ['MenuDataService',
            function (MenuDataService) {
              return MenuDataService.getAllCategories()
                    .then(function(response){
                      console.log(response.data);
                      return response.data;
                    },
                    function(response){
                      console.log("Error");
                    });
              }]
    }
  })

  .state('categoryItems', {
    url: '/category/{categoryShortName}',
    templateUrl: 'src/menu/items.template.html',
    controller: 'ItemsListController as categoryItems',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                    .then(function(response){
                      return response.data;
                    },
                    function(response){
                      console.log("Error");
                    });
              }]
    }});
}

})();
